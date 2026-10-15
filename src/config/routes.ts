/**
 * ROUTE CLASSIFICATION
 * --------------------
 * Every indexable URL lives here exactly once. This table is the single source
 * of truth for the router, the <head> tags, the sitemap and ad eligibility, so
 * a page can never be routed without also being described (or the reverse).
 *
 * The AdSlot component fails closed: a path that is not in CONTENT_ROUTES is
 * never ad-eligible.
 */

export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  showInFooter?: boolean;
  showInNav?: boolean;
}

/**
 * CONTENT ROUTES — the indexable pages of the site.
 * These carry the original written content about the NightLight Android
 * music player and are the only pages eligible for ads.
 */
export const CONTENT_ROUTES: readonly RouteConfig[] = [
  {
    path: '/',
    title: 'NightLight — Modern Android Music Player',
    description: 'NightLight is a modern Android music player with mood-aware shuffle, contextual discovery, trending music, playlists, favorites, lyrics, and background playback.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/about',
    title: 'About NightLight — Android Music Player',
    description: 'Learn what NightLight is, why it exists, and what problem it aims to solve as a modern Android music player.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/features',
    title: 'Features | NightLight — Android Music Player',
    description: 'Explore NightLight\'s Android music player features: mood-aware shuffle, contextual discovery, trending tracks, playlists, favorites, lyrics, background playback, and more.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/how-it-works',
    title: 'How It Works | NightLight — Android Music Player',
    description: 'Step-by-step guide to using the NightLight Android music player: install, discover, play, and use shuffle, favorites, playlists, lyrics, and background playback.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/download',
    title: 'Download NightLight APK for Android (Free, Latest Version)',
    description: 'Download the free NightLight APK for Android 8.0 and above. Direct, safe install with mood-aware shuffle, contextual discovery, trending tracks, lyrics, and background playback.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/faq',
    title: 'FAQ | NightLight — Android Music Player',
    description: 'Frequently asked questions about the NightLight Android music player: free download, background playback, lyrics, playlists, supported Android versions, and privacy.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/help',
    title: 'Help & Troubleshooting | NightLight — Android Music Player',
    description: 'NightLight help guides and troubleshooting: install the APK, fix playback issues, manage playlists and favorites, use lyrics, and solve background playback problems.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/contact',
    title: 'Contact | NightLight',
    description: 'Contact NightLight for bug reports, content issues, copyright concerns, or questions about the privacy policy and terms of service.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | NightLight',
    description: 'NightLight\'s privacy policy explaining what data is collected, how it\'s used, and your rights.',
    showInFooter: true,
    showInNav: false,
  },
  {
    path: '/terms',
    title: 'Terms of Service | NightLight',
    description: 'The terms that apply when you download and use the NightLight Android music player, including your rights, acceptable use, and how we limit liability.',
    showInFooter: true,
    showInNav: false,
  },
] as const;

/**
 * Normalise a pathname so `/about`, `/about/` and `/ABOUT` all resolve to the
 * same route entry.
 */
function normalise(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

/** Look up a route by pathname. Unknown paths return undefined. */
export function getRouteConfig(pathname: string): RouteConfig | undefined {
  const path = normalise(pathname);
  return CONTENT_ROUTES.find((route) => route.path === path);
}

/** True only for the indexable content pages. Fails closed. */
export function isContentRoute(pathname: string): boolean {
  return getRouteConfig(pathname) !== undefined;
}

/**
 * AD ELIGIBILITY
 * --------------
 * Single source of truth. Components must go through AdSlot, which calls this.
 */
export function canShowAds(pathname: string): boolean {
  return isContentRoute(pathname);
}

/** Indexable route paths, in sitemap order. */
export function getContentRoutePaths(): string[] {
  return CONTENT_ROUTES.map((route) => route.path);
}
