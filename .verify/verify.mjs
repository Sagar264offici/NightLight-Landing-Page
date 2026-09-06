/**
 * Gallery circulation verifier — drives headless Chrome over CDP.
 * 1. Starts the Vite dev server, finds its port.
 * 2. Launches Chrome with --remote-debugging-port and connects.
 * 3. Navigates, scrolls to #gallery, samples .gal__strip transform + rect
 *    over ~8s, then dispatches a real mouse move over the viewport and
 *    checks animation-play-state flips to 'paused' (hover-hold).
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ROOT = process.cwd()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---- start vite ----
const vite = spawn('npm', ['run', 'dev'], { cwd: ROOT, stdio: 'pipe' })
let port = null
const viteOut = []
vite.stdout.on('data', (d) => {
  viteOut.push(String(d))
  const m = String(d).match(/localhost:(\d+)/)
  if (m && !port) port = m[1]
})
for (let i = 0; i < 40 && !port; i++) await sleep(250)
if (!port) {
  console.error('vite failed to start:', viteOut.join(''))
  process.exit(1)
}
console.log('vite port:', port)

// ---- launch chrome ----
const profile = mkdtempSync(join(tmpdir(), 'chrome-ver-'))
const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9333',
    '--no-first-run',
    `--user-data-dir=${profile}`,
    '--window-size=1440,900',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

// ---- connect CDP ----
let ws = null
for (let i = 0; i < 40 && !ws; i++) {
  await sleep(250)
  try {
    const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
    const page = list.find((t) => t.type === 'page')
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl)
  } catch {}
}
if (!ws) {
  console.error('could not connect to chrome')
  process.exit(1)
}
await new Promise((r) => (ws.onopen = r))

let msgId = 0
const pending = new Map()
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg)
    pending.delete(msg.id)
  }
}
function send(method, params = {}) {
  const id = ++msgId
  ws.send(JSON.stringify({ id, method, params }))
  return new Promise((res) => pending.set(id, res))
}
async function evaluate(expr) {
  const r = await send('Runtime.evaluate', {
    expression: expr,
    awaitPromise: true,
    returnByValue: true,
  })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails))
  return r.result?.result?.value
}

await send('Page.enable')
await send('Runtime.enable')

// ---- navigate ----
await send('Page.navigate', { url: `http://localhost:${port}/` })
await sleep(2500)

// scroll so the gallery is centered and settled
await evaluate(`new Promise((res) => {
  const el = document.querySelector('#gallery')
  if (!el) { res('NO_GALLERY'); return }
  el.scrollIntoView({ block: 'center' })
  setTimeout(res, 600)
})`)

const sample = `(() => {
  const strip = document.querySelector('.gal__strip')
  const art = document.querySelector('.gal__art')
  const cs = getComputedStyle(strip)
  const m = new DOMMatrixReadOnly(cs.transform)
  return JSON.stringify({
    tx: Math.round(m.e),
    play: cs.animationPlayState,
    dur: cs.animationDuration,
    name: cs.animationName,
    cards: document.querySelectorAll('.gal__card').length,
    groups: document.querySelectorAll('.gal__group').length,
    artBg: art ? getComputedStyle(art).backgroundImage.slice(0, 60) : null,
    artSize: art ? Math.round(art.getBoundingClientRect().width) : null,
  })
})()`

const A = JSON.parse(await evaluate(sample))
console.log('t=0s  ', A)

await sleep(5000)
const B = JSON.parse(await evaluate(sample))
console.log('t=5s  ', B)

const drift = B.tx - A.tx // e increasing toward 0 = strip moving RIGHT on screen
console.log('\n--- verdict ---')
console.log('animation name     :', A.name)
console.log('duration           :', A.dur)
console.log('transform delta 5s :', drift, 'px', drift > 0 ? '(moving RIGHT ✓ left→right)' : drift < 0 ? '(moving LEFT ✗)' : '(static ✗)')
console.log('cards rendered     :', A.cards, '(2 copies of', A.cards / 2, ')')
console.log('groups rendered    :', A.groups)
console.log('cover applied      :', A.artBg)
console.log('cover size (px)    :', A.artSize)

// ---- hover pause test: move mouse over the viewport ----
const box = JSON.parse(await evaluate(`(() => {
  const r = document.querySelector('.gal__viewport').getBoundingClientRect()
  return JSON.stringify({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
})()`))
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x, y: box.y })
await sleep(400)
const C = JSON.parse(await evaluate(sample))
console.log('\nmouse over gallery → play-state:', C.play, C.play === 'paused' ? '(hover-hold ✓)' : '(NOT paused ✗)')

// move mouse away, confirm it resumes
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 })
await sleep(400)
const D = JSON.parse(await evaluate(sample))
console.log('mouse away → play-state:', D.play, D.play === 'running' ? '(resumes ✓)' : '(stuck ✗)')

// visual proof: screenshot the gallery viewport
const shot = await send('Page.captureScreenshot', { format: 'png' })
const { writeFileSync } = await import('node:fs')
writeFileSync(join(ROOT, '.verify', 'gallery.png'), Buffer.from(shot.result.data, 'base64'))
console.log('screenshot saved → .verify/gallery.png')

// cleanup
chrome.kill()
vite.kill()
try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }) } catch {}
process.exit(0)
