/**
 * HYDRATION CHECK
 * ---------------
 * Serves dist/ and loads every page in headless Chrome, failing on any React
 * hydration error or uncaught exception. Prerendered markup that the client
 * cannot reproduce is worse than no prerender at all: React discards the
 * server HTML and the page flashes empty.
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'

const DIST = path.join(process.cwd(), 'dist')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 4319

if (!existsSync(CHROME)) {
  console.log('hydration check skipped — Chrome not found')
  process.exit(0)
}

const NOT_FOUND_ROUTE = '/this-page-does-not-exist'

const PAGES = [
  '/',
  '/about',
  '/features',
  '/how-it-works',
  '/download',
  '/faq',
  '/help',
  '/contact',
  '/privacy',
  '/terms',
  NOT_FOUND_ROUTE,
]

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const candidates = clean.endsWith('/')
    ? [path.join(DIST, clean, 'index.html')]
    : [path.join(DIST, clean), path.join(DIST, clean, 'index.html'), path.join(DIST, clean + '.html')]
  for (const c of candidates) {
    try {
      const s = await stat(c)
      if (s.isFile()) return c
    } catch {
      /* keep looking */
    }
  }
  return null
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url || '/')
  if (!file) {
    const body = await readFile(path.join(DIST, '404.html'))
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
    res.end(body)
    return
  }
  const body = await readFile(file)
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' })
  res.end(body)
})
await new Promise((r) => server.listen(PORT, r))

/* -- drive Chrome over the DevTools protocol -- */
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT + 1}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=/tmp/nightlight-hydration-profile',
  'about:blank',
], { stdio: 'ignore' })

const cleanup = () => {
  try { chrome.kill() } catch { /* already gone */ }
  server.close()
}
process.on('exit', cleanup)

async function cdpTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT + 1}/json/version`)
      return (await res.json()).webSocketDebuggerUrl
    } catch {
      await new Promise((r) => setTimeout(r, 250))
    }
  }
  throw new Error('Chrome did not expose a debugging endpoint')
}

// Node 22+ ships a global WebSocket, so no dependency is needed to speak CDP.
await cdpTarget()

async function withPage(fn) {
  const targets = await (await fetch(`http://127.0.0.1:${PORT + 1}/json/list`)).json()
  const page = targets.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j })

  let id = 0
  const pending = new Map()
  const events = []
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(msg.error.message))
      else resolve(msg.result)
    } else if (msg.method) {
      events.push(msg)
    }
  }
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id
      pending.set(n, { resolve, reject })
      ws.send(JSON.stringify({ id: n, method, params }))
    })

  await send('Runtime.enable')
  await send('Log.enable')
  await send('Page.enable')
  const result = await fn(send, events)
  ws.close()
  return result
}

const failures = []
await withPage(async (send, events) => {
  for (const route of PAGES) {
    events.length = 0
    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}${route}` })
    // Give hydration and the post-mount effects time to run.
    await new Promise((r) => setTimeout(r, 1200))

    const { result } = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        title: document.title,
        text: document.body.innerText.length,
        h1: document.querySelectorAll('h1').length,
        main: document.querySelectorAll('main').length,
        rootEmpty: document.getElementById('root').childElementCount === 0,
        reactMounted: !!document.querySelector('[data-reactroot], #root > *')
      })`,
      returnByValue: true,
    })
    const state = JSON.parse(result.value)

    if (state.rootEmpty) failures.push(`${route}: #root is empty after hydration`)
    if (state.h1 !== 1) failures.push(`${route}: expected 1 <h1>, found ${state.h1}`)
    if (state.main !== 1) failures.push(`${route}: expected 1 <main>, found ${state.main}`)
    if (state.text < 400) failures.push(`${route}: only ${state.text} chars rendered`)

    for (const ev of events) {
      const text =
        ev.params?.entry?.text ??
        ev.params?.exceptionDetails?.exception?.description ??
        ev.params?.args?.map((a) => a.value ?? a.description).join(' ') ??
        ''
      if (ev.method === 'Runtime.consoleAPICalled' && ev.params.type === 'error') {
        failures.push(`${route}: console.error ${String(text).slice(0, 200)}`)
      }
      if (ev.method === 'Runtime.exceptionThrown') {
        failures.push(`${route}: uncaught ${String(text).slice(0, 200)}`)
      }
      if (ev.method === 'Log.entryAdded' && ev.params.entry.level === 'error') {
        // A 404 for the document itself is the point of the 404 route, and the
        // browser logs it as a network error no matter how the page behaves.
        const isExpected404 =
          route === NOT_FOUND_ROUTE && /status of 404/.test(ev.params.entry.text ?? '')
        if (!isExpected404) failures.push(`${route}: ${ev.params.entry.text.slice(0, 200)}`)
      }
    }
  }
})

cleanup()

if (failures.length > 0) {
  console.error(`\nHydration check failed (${failures.length}):`)
  for (const f of [...new Set(failures)]) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`Hydration clean on ${PAGES.length} pages — no errors, no re-render`)
