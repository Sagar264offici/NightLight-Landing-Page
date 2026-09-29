/**
 * NIGHTLIGHT — CENTRAL CONFIGURATION
 * ----------------------------------
 * Single source of truth for every value a real launch will replace.
 * Nothing else in the codebase hardcodes these.
 */

export const APP_NAME = 'NightLight'
export const TAGLINE = 'Music after dark.'
export const APP_DESCRIPTOR = 'Android Music Player'

/** Semantic product descriptor — the entity NightLight says it is. */
export const PRODUCT_DESCRIPTION =
  'NightLight is a modern Android media player for music and audio streaming. It pairs a clean, focused listening experience with contextual discovery — mood-aware shuffle, weather and time-aware recommendations, trending music, and smart search — so playback always fits the moment you are in.'

/* ------------------------------------------------------------------ */
/* DOWNLOAD ARCHITECTURE — change ONE value, every CTA updates.        */
/* ------------------------------------------------------------------ */

/**
 * The one destination every download CTA points at.
 *
 * Until the APK is published, leave this as the placeholder below. Every CTA
 * then renders an explicit "Download link coming soon." state instead of a
 * link that 404s — swap in the real URL and the whole site updates at once.
 */
export const DOWNLOAD_URL = 'REPLACE_WITH_DOWNLOAD_LINK'

/**
 * Future platform destinations. Do NOT display platforms that are not
 * confirmed yet — leave empty and they stay hidden from the UI.
 */
export const PLAY_STORE_URL = ''
export const DIRECT_APK_URL = ''

/* ------------------------------------------------------------------ */
/* SITE / SOCIAL                                                       */
/* ------------------------------------------------------------------ */

/** Absolute site origin — enables canonical + og:url. */
export const SITE_URL = 'https://nightlightmusic.vercel.app'
/** Absolute URL to a 1200×630 social preview image. */
export const SOCIAL_PREVIEW_IMAGE = 'https://nightlightmusic.vercel.app/og-image.png'

/** Legal + social links. Only rendered when configured — never faked. */
export const PRIVACY_URL = '/privacy'
export const TERMS_URL = '/terms'

/** Project repository — Open Source, MIT licensed. */
export const REPO_URL = 'https://github.com/Sagar264offici/NightLight'
export const SOCIAL_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'GitHub', href: REPO_URL },
]

/* ------------------------------------------------------------------ */
/* NAVIGATION                                                          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Help', href: '/help' },
  { label: 'About', href: '/about' },
] as const

/* ------------------------------------------------------------------ */
/* PLACEHOLDER PRODUCT CONTENT                                         */
/* Sample catalog + lyrics so the player reads as a real player.       */
/* Replace with real data/assets when available (§64).                  */
/* ------------------------------------------------------------------ */

export interface Track {
  title: string
  artist: string
  /** Player context label, e.g. the mix the track belongs to. */
  context: string
  /** Seconds. Drives the simulated progress clock. */
  duration: number
  /** Procedural album art — layered CSS gradients, no fake screenshots. */
  gradient: string
  /** Static local cover art path under /covers, falls back to the gradient. */
  coverUrl?: string
}

export const TRACKS: readonly Track[] = [
  {
    title: 'Attention',
    artist: 'Charlie Puth',
    context: 'Pop Essentials',
    duration: 218,
    coverUrl: '/covers/attention-charlie-puth.png',
    gradient:
      'radial-gradient(100% 80% at 50% 30%, #ff6b6b 0%, rgba(255,107,107,0) 60%), linear-gradient(160deg, #1a0a2e 0%, #0a0f18 100%)',
  },
  {
    title: 'Timeless',
    artist: 'The Weeknd',
    context: 'After Midnight',
    duration: 200,
    coverUrl: '/covers/timeless-the-weeknd.png',
    gradient:
      'radial-gradient(120% 100% at 70% 20%, #6c5ce7 0%, rgba(108,92,231,0) 55%), radial-gradient(100% 80% at 30% 80%, #fd79a8 0%, rgba(253,121,168,0) 50%), linear-gradient(180deg, #0c0a1d 0%, #080c12 100%)',
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
    context: 'Dance Floor',
    duration: 203,
    coverUrl: '/covers/levitating-dua-lipa.png',
    gradient:
      'radial-gradient(100% 100% at 50% 50%, #00cec9 0%, rgba(0,206,201,0) 50%), radial-gradient(80% 60% at 20% 20%, #fdcb6e 0%, rgba(253,203,110,0) 60%), linear-gradient(140deg, #0a1628 0%, #06090f 100%)',
  },
  {
    title: 'Serena',
    artist: 'Safari',
    context: 'Chill Vibes',
    duration: 185,
    coverUrl: '/covers/serena-safari.png',
    gradient:
      'radial-gradient(120% 100% at 40% 60%, #a29bfe 0%, rgba(162,155,254,0) 55%), linear-gradient(170deg, #1a2a3a 0%, #0d1520 100%)',
  },
  {
    title: 'Paaro',
    artist: 'Aditya Rikhari',
    context: 'Bollywood Soul',
    duration: 220,
    coverUrl: '/covers/paaro-aditya-rikhari.png',
    gradient:
      'radial-gradient(100% 80% at 60% 30%, #e17055 0%, rgba(225,112,85,0) 55%), radial-gradient(100% 100% at 20% 70%, #fdcb6e 0%, rgba(253,203,110,0) 50%), linear-gradient(160deg, #1e1528 0%, #0a0712 100%)',
  },
  {
    title: 'Pal Pal',
    artist: 'Talwinder',
    context: 'Desi Nights',
    duration: 195,
    coverUrl: '/covers/pal-pal-talwinder.png',
    gradient:
      'radial-gradient(100% 100% at 50% 50%, #ff7675 0%, rgba(255,118,117,0) 45%), linear-gradient(150deg, #2d1b36 0%, #150d1a 100%)',
  },
  {
    title: 'Hola Amigo',
    artist: 'Krishna',
    context: 'Good Vibes',
    duration: 210,
    coverUrl: '/covers/hola-amigo-krishna.png',
    gradient:
      'radial-gradient(120% 80% at 30% 40%, #00b894 0%, rgba(0,184,148,0) 55%), radial-gradient(100% 100% at 70% 80%, #fdcb6e 0%, rgba(253,203,110,0) 50%), linear-gradient(180deg, #0a2a22 0%, #071215 100%)',
  },
  {
    title: 'Chal Bombay',
    artist: 'Divine',
    context: 'Street Beats',
    duration: 240,
    coverUrl: '/covers/chal-bombay-divine.png',
    gradient:
      'radial-gradient(100% 80% at 50% 20%, #6c5ce7 0%, rgba(108,92,231,0) 50%), linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    context: 'Romantic Nights',
    duration: 234,
    coverUrl: '/covers/perfect-ed-sheeran.png',
    gradient:
      'radial-gradient(120% 100% at 40% 30%, #fd79a8 0%, rgba(253,121,168,0) 55%), radial-gradient(100% 80% at 70% 70%, #e17055 0%, rgba(225,112,85,0) 50%), linear-gradient(170deg, #1e0f1a 0%, #0d070d 100%)',
  },
  {
    title: 'Closer',
    artist: 'The Chainsmokers',
    context: 'EDM Anthems',
    duration: 208,
    coverUrl: '/covers/closer-the-chainsmokers.png',
    gradient:
      'radial-gradient(100% 100% at 50% 50%, #74b9ff 0%, rgba(116,185,255,0) 45%), radial-gradient(80% 60% at 20% 80%, #dfe6e9 0%, rgba(223,230,233,0) 55%), linear-gradient(140deg, #0a1525 0%, #060d18 100%)',
  },
  {
    title: "We Didn't Start the Fire",
    artist: 'Billy Joel',
    context: 'Classics',
    duration: 292,
    coverUrl: '/covers/we-didnt-start-the-fire-billy-joel.png',
    gradient:
      'radial-gradient(100% 80% at 50% 50%, #fdcb6e 0%, rgba(253,203,110,0) 45%), linear-gradient(160deg, #1a1510 0%, #0d0a07 100%)',
  },
  {
    title: 'Piano Man',
    artist: 'Billy Joel',
    context: 'The Classics',
    duration: 334,
    coverUrl: '/covers/piano-man-billy-joel.png',
    gradient:
      'radial-gradient(100% 100% at 50% 40%, #dfe6e9 0%, rgba(223,230,233,0) 40%), radial-gradient(80% 60% at 30% 20%, #b8c5d6 0%, rgba(184,197,214,0) 55%), linear-gradient(150deg, #1a1a1f 0%, #0a0a0d 100%)',
  },
  {
    title: 'Lonely',
    artist: 'Akon',
    context: 'R&B Classics',
    duration: 205,
    coverUrl: '/covers/lonely-akon.png',
    gradient:
      'radial-gradient(120% 100% at 60% 30%, #6c5ce7 0%, rgba(108,92,231,0) 50%), radial-gradient(100% 80% at 20% 70%, #a29bfe 0%, rgba(162,155,254,0) 55%), linear-gradient(170deg, #0e0a1f 0%, #070512 100%)',
  },
]

/** Original sample lyrics used by the player mock's lyric view. */
export const SAMPLE_LYRICS: readonly string[] = [
  'streetlights on the ceiling again',
  'the city hums in a lower key',
  'every window keeps its own hour',
  'and the chorus arrives like rain',
  'hold it — hold it — let it fade',
  'the night knows what to play',
]

/* ------------------------------------------------------------------ */
/* DERIVED STATE                                                       */
/* ------------------------------------------------------------------ */

/** A URL is considered configured once it is a real link. */
export const downloadConfigured =
  DOWNLOAD_URL.trim() !== '' && !DOWNLOAD_URL.startsWith('REPLACE_')

/** Primary destination used by every CTA (falls back through confirmed platforms). */
export const RESOLVED_DOWNLOAD_URL = downloadConfigured
  ? DOWNLOAD_URL
  : PLAY_STORE_URL || DIRECT_APK_URL || ''

/* ------------------------------------------------------------------ */
/* COVER ART                                                            */
/* Every track's artwork is a local file under public/covers, with      */
/* WebP/AVIF derivatives generated by `npm run covers`. That keeps the   */
/* site free of third-party image requests at runtime.                  */
/* ------------------------------------------------------------------ */
