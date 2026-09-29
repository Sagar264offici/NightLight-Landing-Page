/**
 * PRERENDER
 * ---------
 * Turns the Vite client build into a static site. For every route in
 * src/config/routes.ts it writes a real `dist/<route>/index.html` containing
 * the page markup plus that route's <head>, so a crawler gets the content
 * without running any JavaScript. Also emits `404.html` and `sitemap.xml`.
 *
 * Run by `npm run build` after the client and SSR bundles are built.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const DIST = path.join(ROOT, 'dist')
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js')
const SEO_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-seo.js')

const SEO_START = '<!--seo:start-->'
const SEO_END = '<!--seo:end-->'
const NOT_FOUND_PATH = '/404'

if (!existsSync(DIST)) {
  throw new Error('dist/ not found — run the vite build first')
}
for (const [file, what] of [
  [SSR_ENTRY, 'dist-ssr/entry-server.js'],
  [SEO_ENTRY, 'dist-ssr/entry-seo.js'],
]) {
  if (!existsSync(file)) throw new Error(`${what} not found — run the SSR vite build first`)
}

const { render } = await import(pathToFileURL(SSR_ENTRY).href)
// The head + route table come from the same module the app imports, so the
// prerenderer and the running site can never disagree about a page's metadata.
const { buildHead, INDEXABLE_ROUTES, canonicalUrl } = await import(
  pathToFileURL(SEO_ENTRY).href
)

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

if (!template.includes(SEO_START) || !template.includes(SEO_END)) {
  throw new Error('index.html is missing the seo:start / seo:end markers')
}

/** Swap the fallback head block for this route's head. */
function withHead(head) {
  const start = template.indexOf(SEO_START)
  const end = template.indexOf(SEO_END)
  return template.slice(0, start + SEO_START.length) + '\n    ' + head + '\n    ' + template.slice(end)
}

/** Drop the rendered app markup into the empty root element. */
function withMarkup(html, body) {
  const open = '<div id="root">'
  const at = html.indexOf(open)
  if (at === -1) throw new Error('index.html is missing <div id="root">')
  const insertAt = at + open.length
  return html.slice(0, insertAt) + body + html.slice(insertAt)
}

function documentFor(routePath) {
  return withMarkup(withHead(buildHead(routePath)), render(routePath))
}

let written = 0
for (const routePath of INDEXABLE_ROUTES) {
  const html = documentFor(routePath)
  // `/` is the root document; everything else gets its own directory so the
  // server can serve `/about` as a plain static file.
  const outDir = routePath === '/' ? DIST : path.join(DIST, routePath.slice(1))
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'index.html'), html)
  written += 1
}

// Real 404: served with a 404 status and a noindex head.
await writeFile(path.join(DIST, '404.html'), documentFor(NOT_FOUND_PATH))

/* -- sitemap, generated from the same route table the router uses -- */
const today = new Date().toISOString().slice(0, 10)
const priority = { '/': '1.0', '/features': '0.9', '/how-it-works': '0.8', '/faq': '0.8' }
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...INDEXABLE_ROUTES.map((p) =>
    [
      '  <url>',
      `    <loc>${canonicalUrl(p)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>`,
      `    <priority>${priority[p] ?? '0.6'}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n')
await writeFile(path.join(DIST, 'sitemap.xml'), xml)

console.log(`prerendered ${written} pages + 404.html + sitemap.xml`)
