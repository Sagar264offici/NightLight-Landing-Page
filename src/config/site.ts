/**
 * NIGHTLIGHT — CENTRAL CONFIGURATION
 * ----------------------------------
 * Single source of truth for every value a real launch will replace.
 * Nothing else in the codebase hardcodes these (directives §17, §64).
 */

export const APP_NAME = 'NightLight'
export const TAGLINE = 'Music after dark.'

/* ------------------------------------------------------------------ */
/* DOWNLOAD ARCHITECTURE — change ONE value, every CTA updates.        */
/* ------------------------------------------------------------------ */

/** The one destination every download CTA points at. */
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
export const SOCIAL_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  // { label: 'X', href: 'https://x.com/nightlight' },
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
  /** Static local cover art path (from SongsTumb thumbnails), falls back to gradient. */
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

/** Sample time-synced lyric lines for the Perfect demo. */
export const PERFECT_LYRICS: readonly string[] = [
  'I found a love for me',
  'Darling, just dive right in',
  'And follow my lead',
  'Well, I found a girl, beautiful and sweet',
  'Oh, I never knew you were the someone',
  'Waiting for me',
  'Cause we were just kids when we fell in love',
  'Not knowing what it was',
  'I will not give you up this time',
  'But darling, just kiss me slow, your heart is all I own',
  'And in your eyes you\'re holding mine',
  'Baby, I\'m dancing in the dark',
  'With you between my arms',
  'Barefoot on the grass',
  'Listening to our favourite song',
  'When you said you looked a mess',
  'I whispered underneath my breath',
  'But you heard it, darling, you look perfect tonight',
]

/** Original sample lyrics (placeholder). */
export const SAMPLE_LYRICS: readonly string[] = [
  'streetlights on the ceiling again',
  'the city hums in a lower key',
  'every window keeps its own hour',
  'and the chorus arrives like rain',
  'hold it — hold it — let it fade',
  'the night knows what to play',
]

/* ------------------------------------------------------------------ */
/* FEATURE + SMART CONTENT (§22, §23, §64)                             */
/* ------------------------------------------------------------------ */

export const SMART_WORDS: readonly string[] = [
  '2:00 am',
  'rain outside',
  'wind-down',
  'late drive',
  'focus',
  'new releases',
  'instrumental',
  'your tuesday nights',
  'low light',
  'rediscovered',
  'slow tempo',
  'after hours',
]

/* ------------------------------------------------------------------ */
/* SEARCH DEMO DATA (§12)                                              */
/* ------------------------------------------------------------------ */

export interface SearchResult {
  title: string
  artist: string
  variant?: string
  canonical: boolean
}

export const SEARCH_DEMO: readonly { query: string; results: readonly SearchResult[] }[] = [
  {
    query: 'Ed Sheeran Perfect',
    results: [
      { title: 'Perfect', artist: 'Ed Sheeran', canonical: true },
      { title: 'Perfect Acoustic', artist: 'Ed Sheeran', variant: 'acoustic', canonical: false },
      { title: 'Perfect Live', artist: 'Ed Sheeran', variant: 'live', canonical: false },
      { title: 'Perfect Remix', artist: 'Ed Sheeran', variant: 'remix', canonical: false },
    ],
  },
  {
    query: 'Ed Sheeran Perfect acoustic',
    results: [
      { title: 'Perfect Acoustic', artist: 'Ed Sheeran', variant: 'acoustic', canonical: true },
      { title: 'Perfect', artist: 'Ed Sheeran', canonical: false },
      { title: 'Perfect Live', artist: 'Ed Sheeran', variant: 'live', canonical: false },
      { title: 'Perfect Remix', artist: 'Ed Sheeran', variant: 'remix', canonical: false },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* LANGUAGE DEMO DATA (§21)                                            */
/* ------------------------------------------------------------------ */

export const LANG_EN: readonly { title: string; artist: string }[] = [
  { title: 'Perfect', artist: 'Ed Sheeran' },
  { title: 'Attention', artist: 'Charlie Puth' },
  { title: 'Levitating', artist: 'Dua Lipa' },
]

export const LANG_HI: readonly { title: string; artist: string }[] = [
  { title: 'Paaro', artist: 'Aditya Rikhari' },
  { title: 'Pal Pal', artist: 'Talwinder' },
  { title: 'Chal Bombay', artist: 'Divine' },
]

/* ------------------------------------------------------------------ */
/* DERIVED STATE                                                       */
/* ------------------------------------------------------------------ */

/** A URL is considered configured once it is a real link. */
export const downloadConfigured =
  DOWNLOAD_URL.trim() !== '' && !DOWNLOAD_URL.startsWith('REPLACE_')

/** Primary destination used by every CTA (falls back through confirmed platforms). */
export const RESOLVED_DOWNLOAD_URL =
  (downloadConfigured && DOWNLOAD_URL) ||
  (PLAY_STORE_URL && PLAY_STORE_URL) ||
  (DIRECT_APK_URL && DIRECT_APK_URL) ||
  ''

/* ------------------------------------------------------------------ */
/* COVER ART                                                            */
/* Local thumbnails (public/covers, from SongsTumb) are attached in     */
/* TRACKS above. For any track without one, fetch artwork at runtime    */
/* via the album-art loader (no key needed).                            */
/* Call initCoverArt() once at app start to fill the gaps.              */
/* ------------------------------------------------------------------ */

/** Mutable track list so cover URLs can be injected at runtime. */
export const TRACKS_MUTABLE: Track[] = [...TRACKS]

export async function initCoverArt(): Promise<void> {
  const missing = TRACKS_MUTABLE.filter((t) => !t.coverUrl)
  if (missing.length === 0) return
  const { preloadCovers } = await import('../engine/coverArt')
  const covers = await preloadCovers(
    missing.map((t) => ({ title: t.title, artist: t.artist })),
  )
  for (const t of missing) {
    const key = `${t.title.toLowerCase().trim()}|${t.artist.toLowerCase().trim()}`
    if (covers.has(key)) t.coverUrl = covers.get(key)
  }
}
