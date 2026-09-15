/**
 * ROUTE CLASSIFICATION SYSTEM (§17, §31)
 * -------------------------------------
 * Central definition of which routes are CONTENT routes (eligible for ads)
 * and which are APPLICATION routes (not eligible for ads).
 * 
 * This makes it difficult to accidentally add ads to low-content screens.
 * The AdSlot component fails closed - if a route is not explicitly marked
 * ad-eligible, no ad renders.
 */

export type RouteType = 'content' | 'application';

export interface RouteConfig {
  path: string;
  type: RouteType;
  title: string;
  description: string;
  canonical?: string;
  showInFooter?: boolean;
  showInNav?: boolean;
}

/**
 * CONTENT ROUTES — Public publisher content pages.
 * These pages contain substantial original content written specifically for NightLight.
 * They are the focal point of the page and provide value independent of the interactive application.
 * 
 * Ads MAY be shown on these routes (subject to AdSlot policy check).
 */
export const CONTENT_ROUTES: readonly RouteConfig[] = [
  {
    path: '/',
    type: 'content',
    title: 'NightLight — Modern Android Music Player',
    description: 'NightLight is a modern Android music player with mood-aware shuffle, contextual discovery, trending music, playlists, favorites, lyrics, and background playback.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/about',
    type: 'content',
    title: 'About NightLight — Android Music Player',
    description: 'Learn what NightLight is, why it exists, and what problem it aims to solve as a modern Android music player.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/features',
    type: 'content',
    title: 'Features | NightLight — Android Music Player',
    description: 'Explore NightLight\'s Android music player features: mood-aware shuffle, contextual discovery, trending tracks, playlists, favorites, lyrics, background playback, and more.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/how-it-works',
    type: 'content',
    title: 'How It Works | NightLight — Android Music Player',
    description: 'Step-by-step guide to using the NightLight Android music player: install, discover, play, and use shuffle, favorites, playlists, lyrics, and background playback.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/faq',
    type: 'content',
    title: 'Frequently Asked Questions | NightLight',
    description: 'Answers to common questions about the NightLight Android music player: pricing, device support, music sources, playlists, mood-aware shuffle, lyrics, and more.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/help',
    type: 'content',
    title: 'Help & Documentation | NightLight',
    description: 'Documentation for the NightLight Android music player: getting started, searching, playing tracks, shuffle, playlists, favorites, lyrics, background playback, and troubleshooting.',
    showInFooter: true,
    showInNav: true,
  },
  {
    path: '/privacy',
    type: 'content',
    title: 'Privacy Policy | NightLight',
    description: 'NightLight\'s privacy policy explaining what data is collected, how it\'s used, and your rights.',
    showInFooter: true,
    showInNav: false,
  },
  {
    path: '/terms',
    type: 'content',
    title: 'Terms of Service | NightLight',
    description: 'Terms of service for using NightLight.',
    showInFooter: true,
    showInNav: false,
  },
] as const;

/**
 * APPLICATION ROUTES — Interactive music application screens.
 * These routes are primarily for user interaction, navigation, or behavioral flows.
 * They do NOT contain substantial publisher content as their primary purpose.
 * 
 * Ads MUST NOT be shown on these routes.
 */
export const APPLICATION_ROUTES: readonly RouteConfig[] = [
  {
    path: '/player',
    type: 'application',
    title: 'Player',
    description: 'Interactive music player interface.',
    showInFooter: false,
    showInNav: false,
  },
  {
    path: '/search',
    type: 'application',
    title: 'Search',
    description: 'Music search interface.',
    showInFooter: false,
    showInNav: false,
  },
  {
    path: '/library',
    type: 'application',
    title: 'Library',
    description: 'Your music library and playlists.',
    showInFooter: false,
    showInNav: false,
  },
  {
    path: '/settings',
    type: 'application',
    title: 'Settings',
    description: 'Application settings and preferences.',
    showInFooter: false,
    showInNav: false,
  },
  {
    path: '/auth',
    type: 'application',
    title: 'Authentication',
    description: 'Sign in or create an account.',
    showInFooter: false,
    showInNav: false,
  },
  {
    path: '/playlist/*',
    type: 'application',
    title: 'Playlist',
    description: 'Playlist management and playback.',
    showInFooter: false,
    showInNav: false,
  },
] as const;

/**
 * All routes combined for easy iteration.
 */
export const ALL_ROUTES = [...CONTENT_ROUTES, ...APPLICATION_ROUTES] as const;

/**
 * Check if a route path matches a content route (exact or prefix match).
 */
export function isContentRoute(pathname: string): boolean {
  return CONTENT_ROUTES.some((route) => {
    if (route.path.endsWith('*')) {
      const prefix = route.path.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    return pathname === route.path || pathname === route.path + '/';
  });
}

/**
 * Check if a route path matches an application route.
 */
export function isApplicationRoute(pathname: string): boolean {
  return APPLICATION_ROUTES.some((route) => {
    if (route.path.endsWith('*')) {
      const prefix = route.path.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    return pathname === route.path || pathname === route.path + '/';
  });
}

/**
 * Get route config for a given pathname.
 */
export function getRouteConfig(pathname: string): RouteConfig | undefined {
  return ALL_ROUTES.find((route) => {
    if (route.path.endsWith('*')) {
      const prefix = route.path.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    return pathname === route.path || pathname === route.path + '/';
  });
}

/**
 * AD ELIGIBILITY MECHANISM (§11, §31)
 * -----------------------------------
 * Central function to determine if ads can be shown on the current route.
 * Fails closed - returns false if route is not explicitly a content route.
 * 
 * This is the single source of truth for ad eligibility.
 * Components should use this via the AdSlot component, not directly.
 */
export function canShowAds(pathname: string): boolean {
  // Only show ads on explicitly defined content routes
  return isContentRoute(pathname);
}

/**
 * Get all content route paths for sitemap generation.
 */
export function getContentRoutePaths(): string[] {
  return CONTENT_ROUTES
    .filter((r) => !r.path.endsWith('*'))
    .map((r) => r.path);
}