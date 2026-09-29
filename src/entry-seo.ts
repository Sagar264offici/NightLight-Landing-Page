/**
 * SSR BUILD ENTRIES
 * -----------------
 * `entry-server` renders a route's markup; this module is a plain-data entry
 * so the prerender script can read the route table and head builder without
 * pulling React into its process. Both are built by the `--ssr` vite pass.
 */
export { buildHead, canonicalUrl, INDEXABLE_ROUTES, sitewideSchema, pageSeo } from './config/seo'
