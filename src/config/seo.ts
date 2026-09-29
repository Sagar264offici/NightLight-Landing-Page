/**
 * SEO — the single owner of every <head> tag on a prerendered page.
 * ---------------------------------------------------------------
 * `index.html` ships only the fallback head (used by `vite dev` and as the
 * build template). At build time `scripts/prerender.mjs` calls `buildHead()`
 * for every route and writes the result into `dist/<route>/index.html`.
 *
 * Because of that, there is exactly one copy of the title, description,
 * canonical, Open Graph, Twitter and site-wide JSON-LD in the output — no
 * duplicate structured data for Google to complain about.
 */
import {
  APP_DESCRIPTOR,
  APP_NAME,
  PRODUCT_DESCRIPTION,
  REPO_URL,
  SITE_URL,
  SOCIAL_PREVIEW_IMAGE,
  TAGLINE,
} from './site'
import { CONTENT_ROUTES, getRouteConfig, isContentRoute } from './routes'

/* ------------------------------------------------------------------ */
/* ESCAPING                                                            */
/* ------------------------------------------------------------------ */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])
}

/**
 * JSON-LD is embedded in a <script> element, so it only needs `<` escaped to
 * stop a stray `</script>` inside string data from closing the tag early.
 */
function escapeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

/* ------------------------------------------------------------------ */
/* PER-ROUTE HEAD DATA                                                  */
/* ------------------------------------------------------------------ */

export interface PageSeo {
  title: string
  description: string
  canonical: string | null
  robots: 'index, follow' | 'noindex, follow' | 'noindex, nofollow'
  ogType: 'website' | 'article'
}

const NOT_FOUND_SEO: PageSeo = {
  title: 'Page Not Found | NightLight',
  description:
    'The page you were looking for does not exist. Browse the NightLight Android music player overview, features, guides and FAQs instead.',
  canonical: null,
  robots: 'noindex, follow',
  ogType: 'website',
}

/** Normalise `/about/` and `/about` to the same absolute URL. */
export function canonicalUrl(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return clean === '/' ? `${SITE_URL}/` : `${SITE_URL}${clean}`
}

/**
 * Resolve the head data for a path. Unknown paths fall through to the 404
 * document, which is exactly what the router renders for them too.
 */
export function pageSeo(pathname: string): PageSeo {
  const route = getRouteConfig(pathname)
  if (!route || !isContentRoute(pathname)) return NOT_FOUND_SEO
  return {
    title: route.title,
    description: route.description,
    canonical: canonicalUrl(route.path),
    robots: 'index, follow',
    ogType: 'website',
  }
}

/* ------------------------------------------------------------------ */
/* SITE-WIDE STRUCTURED DATA                                            */
/* ------------------------------------------------------------------ */

/**
 * Present in <head> on every page. Page-specific schema (FAQPage, HowTo,
 * SoftwareApplication, …) stays colocated with the page that owns it.
 */
export function sitewideSchema(): unknown[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: APP_NAME,
      alternateName: `${APP_NAME} ${APP_DESCRIPTOR}`,
      url: `${SITE_URL}/`,
      inLanguage: 'en',
      description: PRODUCT_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: APP_NAME,
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      slogan: TAGLINE,
      sameAs: [REPO_URL],
    },
  ]
}

/* ------------------------------------------------------------------ */
/* HEAD SERIALISATION                                                   */
/* ------------------------------------------------------------------ */

function meta(attrs: Record<string, string>): string {
  const body = Object.entries(attrs)
    .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
    .join(' ')
  return `<meta ${body} />`
}

function link(rel: string, href: string): string {
  return `<link rel="${rel}" href="${escapeHtml(href)}" />`
}

/**
 * Build the complete route-specific <head> fragment.
 * Injected by the prerenderer in place of `index.html`'s fallback head.
 */
export function buildHead(pathname: string): string {
  const seo = pageSeo(pathname)
  const image = SOCIAL_PREVIEW_IMAGE

  const parts: string[] = [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta({ name: 'description', content: seo.description }),
    meta({ name: 'robots', content: seo.robots }),
    // Canonical is omitted on noindex documents — pointing them anywhere
    // would only invite the other page to be de-indexed.
    ...(seo.canonical ? [link('canonical', seo.canonical)] : []),

    // Open Graph
    meta({ property: 'og:type', content: seo.ogType }),
    meta({ property: 'og:site_name', content: APP_NAME }),
    meta({ property: 'og:title', content: seo.title }),
    meta({ property: 'og:description', content: seo.description }),
    meta({ property: 'og:url', content: seo.canonical ?? `${SITE_URL}/404.html` }),
    meta({ property: 'og:image', content: image }),
    meta({ property: 'og:image:width', content: '1200' }),
    meta({ property: 'og:image:height', content: '630' }),
    meta({ property: 'og:image:alt', content: `${APP_NAME} — ${APP_DESCRIPTOR}` }),
    meta({ property: 'og:locale', content: 'en_US' }),

    // Twitter / X
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: seo.title }),
    meta({ name: 'twitter:description', content: seo.description }),
    meta({ name: 'twitter:image', content: image }),
    meta({ name: 'twitter:image:alt', content: `${APP_NAME} — ${APP_DESCRIPTOR}` }),

    // Site-wide structured data
    `<script type="application/ld+json">${escapeJsonLd(sitewideSchema())}</script>`,
  ]

  return parts.join('\n    ')
}

/** Every indexable route, in sitemap order. */
export const INDEXABLE_ROUTES = CONTENT_ROUTES.map((r) => r.path)
