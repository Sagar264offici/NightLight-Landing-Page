/**
 * VERIFY SEO
 * ----------
 * Fails the build if the prerendered output would regress Google's ability to
 * index the site. Runs after `scripts/prerender.mjs`.
 *
 * Checks, per page: exactly one <title>, one description, one <h1>, a
 * non-empty root, a self-referencing absolute canonical, matching robots
 * directives, unique titles across the site, no duplicate structured data, and
 * enough body text to not read as thin content.
 */
import { readFile, access } from 'node:fs/promises'
import path from 'node:path'

const DIST = path.join(process.cwd(), 'dist')
const SITE_URL = 'https://nightlightmusic.vercel.app'
const MIN_TEXT_CHARS = 1500

const failures = []
const fail = (file, msg) => failures.push(`${file}: ${msg}`)

const count = (haystack, needle) => haystack.split(needle).length - 1
const attr = (html, tagName, key) => {
  const tag = html.match(new RegExp(`<${tagName}\\b[^>]*\\b${key}="([^"]*)"`, 'i'))
  return tag ? tag[1] : null
}
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

if (locs.length === 0) fail('sitemap.xml', 'no <loc> entries found')

/* -- every sitemap URL must exist on disk -- */
const pageFile = (route) =>
  route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route.slice(1), 'index.html')

const onDisk = new Set()
for (const loc of locs) {
  if (!loc.startsWith(SITE_URL)) {
    fail('sitemap.xml', `${loc} is not an absolute ${SITE_URL} URL`)
    continue
  }
  const route = loc.slice(SITE_URL.length) || '/'
  onDisk.add(route)
  try {
    await access(pageFile(route))
  } catch {
    fail('sitemap.xml', `${loc} has no built page at ${path.relative(DIST, pageFile(route))}`)
  }
}

const titles = new Map()
const descriptions = new Map()

/* -- sitemap pages -- */
for (const route of onDisk) {
  const html = await readFile(pageFile(route), 'utf8')
  const label = route
  const head = html.slice(0, html.indexOf('</head>'))
  const body = html.slice(html.indexOf('<div id="root">'))

  const title = head.match(/<title>([^<]*)<\/title>/)?.[1]
  if (count(head, '<title>') !== 1) fail(label, `expected exactly 1 <title>, found ${count(head, '<title>')}`)
  if (!title) fail(label, 'missing <title>')
  if (title && titles.has(title)) fail(label, `duplicate <title> also on ${titles.get(title)}`)
  if (title) titles.set(title, label)

  const description = attr(head, 'meta', 'name="description"') ?? html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  const descCount = count(head, '<meta name="description"')
  if (descCount !== 1) fail(label, `expected exactly 1 meta description, found ${descCount}`)
  if (!description) fail(label, 'missing meta description')
  if (description && descriptions.has(description)) {
    fail(label, `duplicate meta description also on ${descriptions.get(description)}`)
  }
  if (description) descriptions.set(description, label)
  if (description && (description.length < 70 || description.length > 300)) {
    fail(label, `meta description is ${description.length} chars (want 70-300)`)
  }

  const canonicals = [...head.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1])
  if (canonicals.length !== 1) fail(label, `expected exactly 1 canonical, found ${canonicals.length}`)
  const expectedCanonical = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`
  if (canonicals[0] !== expectedCanonical) {
    fail(label, `canonical is ${canonicals[0]}, expected ${expectedCanonical}`)
  }

  const robots = head.match(/<meta name="robots" content="([^"]*)"/)?.[1]
  if (robots !== 'index, follow') fail(label, `robots is "${robots}", expected "index, follow"`)

  const h1s = count(body, '<h1')
  if (h1s !== 1) fail(label, `expected exactly 1 <h1>, found ${h1s}`)

  if (count(body, 'id="main-content"') !== 1) fail(label, 'missing or duplicated <main id="main-content">')
  if (count(body, '<main') !== 1) fail(label, `document must have exactly one <main>, found ${count(body, '<main')}`)
  // Match the header element itself, not its `nav__*` children.
  if (count(body, '<header class="nav') !== 1) fail(label, 'navigation must render exactly once')
  if (count(body, '<footer class="footer"') !== 1) fail(label, 'footer must render exactly once')

  if (textOf(body).length < MIN_TEXT_CHARS) {
    fail(label, `only ${textOf(body).length} chars of text — too thin to rank (want ${MIN_TEXT_CHARS}+)`)
  }

  // Structured data: every block must be valid JSON, and no @type may repeat.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  if (blocks.length === 0) fail(label, 'no JSON-LD found')
  const seenTypes = new Set()
  for (const [, json] of blocks) {
    let parsed
    try {
      parsed = JSON.parse(json)
    } catch {
      fail(label, 'a JSON-LD block is not valid JSON')
      continue
    }
    for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
      const type = node?.['@type']
      if (!type) fail(label, 'a JSON-LD node has no @type')
      else if (seenTypes.has(type)) fail(label, `duplicate JSON-LD @type "${type}"`)
      else seenTypes.add(type)
    }
  }
}

/* -- 404 must exist, be noindex, and must not be in the sitemap -- */
const notFound = await readFile(path.join(DIST, '404.html'), 'utf8')
if (!/<meta name="robots" content="noindex/.test(notFound)) {
  fail('404.html', 'missing noindex robots directive')
}
if (/<link rel="canonical"/.test(notFound)) {
  fail('404.html', 'a noindex page must not declare a canonical')
}
if (count(notFound, '<h1') !== 1) fail('404.html', `expected exactly 1 <h1>, found ${count(notFound, '<h1')}`)
if (locs.some((l) => l.includes('404'))) fail('sitemap.xml', '404 must not be listed in the sitemap')

/* -- robots.txt must point at the generated sitemap -- */
const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  fail('robots.txt', `no "Sitemap: ${SITE_URL}/sitemap.xml" line`)
}

if (failures.length > 0) {
  console.error(`\nSEO verification failed (${failures.length}):`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}

console.log(`SEO verified: ${onDisk.size} indexable pages + 404, all heads consistent`)
