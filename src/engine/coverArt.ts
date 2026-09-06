/** Cover art loader — uses album-art (Spotify catalog) via CDN.
 * The album-art UMD bundle is loaded from unpkg and exposes window.albumArt.
 * No API key needed — the package bundles its own Spotify client credentials.
 */

declare global {
  interface Window {
    albumArt?: (artist: string, options?: { album?: string; size?: 'small' | 'medium' | 'large' }) => Promise<string>
  }
}

const COVER_CACHE = new Map<string, string>()

function cacheKey(title: string, artist: string): string {
  return `${title.toLowerCase().trim()}|${artist.toLowerCase().trim()}`
}

async function ensureAlbumArtLoaded(): Promise<boolean> {
  if (window.albumArt) return true
  try {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/album-art@4.0.4/index.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('failed to load album-art'))
      document.head.appendChild(script)
    })
    return !!window.albumArt
  } catch {
    return false
  }
}

export async function fetchCoverUrl(
  title: string,
  artist: string,
): Promise<string | null> {
  const key = cacheKey(title, artist)
  if (COVER_CACHE.has(key)) return COVER_CACHE.get(key) ?? null

  const loaded = await ensureAlbumArtLoaded()
  if (!loaded || !window.albumArt) return null

  try {
    const url = await window.albumArt(artist, { album: title, size: 'medium' })
    COVER_CACHE.set(key, url)
    return url
  } catch {
    // If the search fails (e.g. song title doesn't match album name),
    // fall back to artist-only search which is more reliable.
    try {
      const url = await window.albumArt(artist, { size: 'medium' })
      COVER_CACHE.set(key, url)
      return url
    } catch {
      return null
    }
  }
}

/** Preload covers for a list of { title, artist } pairs. */
export async function preloadCovers(
  tracks: readonly { title: string; artist: string }[],
): Promise<Map<string, string>> {
  const results = new Map<string, string>()
  const loaded = await ensureAlbumArtLoaded()
  if (!loaded || !window.albumArt) return results

  for (const t of tracks) {
    // stagger requests slightly to avoid rate limits
    const url = await fetchCoverUrl(t.title, t.artist)
    if (url) results.set(cacheKey(t.title, t.artist), url)
    await new Promise((r) => setTimeout(r, 80))
  }
  return results
}
