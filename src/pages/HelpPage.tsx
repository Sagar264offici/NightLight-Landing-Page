/**
 * HELP / DOCUMENTATION PAGE
 * -------------------------
 * Documentation for the NightLight Android music player.
 * Explains real Android workflows: getting started, searching, playing,
 * shuffle, playlists, favorites, lyrics, background playback, contextual
 * discovery, and troubleshooting.
 * Only documents functionality VERIFIED in the Android repository.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL, REPO_URL } from '../config/site';

export default function HelpPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'NightLight Help & Documentation',
    description: 'Documentation for the NightLight Android music player: getting started, searching, playing tracks, shuffle, playlists, favorites, lyrics, background playback, contextual discovery, and troubleshooting.',
    about: {
      '@type': 'SoftwareApplication',
      name: 'NightLight',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Android',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="help-title">
        <div className="page-hero__inner" style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>Help & Documentation</Eyebrow>
            <Headline as="h1" id="help-title" size="xl">Everything you need to know.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              Complete reference for the NightLight Android music player.
            </Body>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
        {/* TABLE OF CONTENTS */}
        <nav className="help-toc" aria-label="Table of contents" style={{
          position: 'sticky',
          top: '100px',
          alignSelf: 'flex-start',
          padding: '24px',
          background: 'rgba(8, 11, 16, 0.5)',
          borderRadius: '16px',
          border: '1px solid rgba(216, 181, 106, 0.14)',
          marginBottom: '48px',
        }}>
          <Micro style={{ color: 'var(--c-accent)', display: 'block', marginBottom: '16px' }}>Contents</Micro>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.2', fontSize: '0.95rem' }}>
            {TOC_SECTIONS.map((section) => (
              <li key={section.id}><a href={`#${section.id}`} style={{ color: 'var(--c-text-2)', textDecoration: 'none', transition: 'color 140ms' }}>{section.title}</a></li>
            ))}
          </ul>
        </nav>

        {/* SECTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {HELP_SECTIONS.map((section, index) => (
            <article key={section.id} id={section.id} className="help-section" style={{ borderBottom: index < HELP_SECTIONS.length - 1 ? '1px solid rgba(216, 181, 106, 0.1)' : 'none', paddingBottom: '48px' }}>
              <Reveal delay={index * 50}>
                <Headline as="h2" size="lg" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{section.icon}</span>
                  {section.title}
                </Headline>
                <div style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', lineHeight: '1.8' }}>
                  {section.content.map((block, bIndex) => (
                    <div key={bIndex}>
                      {block.type === 'body' && <Body style={{ maxWidth: 'none', marginBottom: '16px' }}>{block.content}</Body>}
                      {block.type === 'list' && (
                        <ul style={{ marginBottom: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
                          {block.items.map((item, iIndex) => (
                            <li key={iIndex}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {block.type === 'note' && (
                        <div style={{ marginBottom: '16px', padding: '16px 20px', background: 'rgba(216, 181, 106, 0.08)', borderRadius: '8px', border: '1px solid rgba(216, 181, 106, 0.2)' }}>
                          <Micro style={{ color: 'var(--c-accent)', marginBottom: '8px', display: 'block' }}>{block.label}</Micro>
                          <Body style={{ maxWidth: 'none', margin: 0 }}>{block.content}</Body>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        {/* INLINE AD - After documentation */}
        <InlineAdSlot slotName="help-after-docs" />

        {/* TROUBLESHOOTING */}
        <article id="troubleshooting" className="help-section" style={{ borderBottom: 'none' }}>
          <Reveal>
            <Headline as="h2" size="lg" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '2rem' }}>🔧</span>
              Troubleshooting
            </Headline>
            <div style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', lineHeight: '1.8' }}>
              <Body style={{ maxWidth: 'none', marginBottom: '20px' }}>Common issues and solutions:</Body>
              {TROUBLESHOOTING.map((item) => (
                <details key={item.id} style={{ marginBottom: '12px', padding: '20px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '12px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                  <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Headline as="h3" size="md" style={{ margin: 0 }}>{item.problem}</Headline>
                    <span style={{ color: 'var(--c-muted)', fontSize: '1.5rem' }}>+</span>
                  </summary>
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(216, 181, 106, 0.1)' }}>
                    <Body style={{ maxWidth: 'none', margin: 0 }}>{item.solution}</Body>
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </article>

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(80px, 12vh, 140px)' }}>
            <DownloadButton>Download NightLight for Android</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>
              Still need help? <a href="/faq" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Check the FAQ</a>, <a href="/contact" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>contact us</a>, or open an issue on{' '}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)' }}>GitHub</a>.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}

const TOC_SECTIONS = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'home-screen', title: 'Home Screen' },
  { id: 'searching', title: 'Searching for Music' },
  { id: 'playing', title: 'Playing Tracks' },
  { id: 'shuffle', title: 'Shuffle & Repeat' },
  { id: 'playlists', title: 'Playlists' },
  { id: 'favorites', title: 'Favorites' },
  { id: 'lyrics', title: 'Lyrics' },
  { id: 'background-playback', title: 'Background Playback' },
  { id: 'contextual-discovery', title: 'Contextual Discovery' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
] as const;

const HELP_SECTIONS = [
  {
    id: 'getting-started',
    icon: '🚀',
    title: 'Getting Started',
    content: [
      { type: 'body', content: 'NightLight is a native Android music app. Install it on your device, open it, and the home screen greets you with your listening context — Recently Played, For You, Trending, Playlists, and Favorites all in one view.' },
      { type: 'list', items: [
        'Supports Android 8.0 (Oreo) and above',
        'No account required — tap a track and it plays',
        'Optional Google Sign-In for convenience',
        'Open source: source at github.com/Sagar264offici/NightLight',
      ]},
      { type: 'note', label: 'Tip', content: 'Grant notification/notification access prompts if asked. NightLight uses a foreground media service so background playback works through the lock screen.' },
    ],
  },
  {
    id: 'home-screen',
    icon: '🏠',
    title: 'Home Screen',
    content: [
      { type: 'body', content: 'The home screen is the discovery hub. Sections include Recently Played, For You (context-aware recommendations), Trending, your Playlists, and a Like count. A mood chip row lets you shape recommendations quickly, and the greeting adapts to the time of day.' },
      { type: 'list', items: [
        'Mood chips: jump to a listening mood directly',
        'For You: contextual recommendations driven by time, weather, and mood',
        'Trending: what\'s being listened to right now',
        'Playlists and Favorites: your library one scroll away',
      ]},
    ],
  },
  {
    id: 'searching',
    icon: '🔍',
    title: 'Searching for Music',
    content: [
      { type: 'body', content: 'Search is real-time with debounced queries and paginated results. Recent searches are saved on your device for quick re-searches.' },
      { type: 'list', items: [
        'Type by track title or artist',
        'Results appear as you type',
        'Paginated results load as you scroll',
        'Search history: tap a term to re-run the search',
      ]},
    ],
  },
  {
    id: 'playing',
    icon: '🎵',
    title: 'Playing Tracks',
    content: [
      { type: 'body', content: 'Tap any track to start playback. The now-playing screen is the heart of the app: album artwork rendered as a spinning vinyl disc, backdrop lighting that follows the artwork, a seek bar, play/pause, next/previous, shuffle, repeat, like, queue, lyrics, and listen-together actions.' },
      { type: 'list', items: [
        'Vinyl disc animation: spins while the track plays',
        'Backdrop lighting: ambient light that follows the album art',
        'Queue: bottom sheet with drag-to-reorder and remove',
        'Like: heart icon saves to favorites',
      ]},
    ],
  },
  {
    id: 'shuffle',
    icon: '🔀',
    title: 'Shuffle & Repeat',
    content: [
      { type: 'body', content: 'NightLight offers three shuffle modes and three repeat modes, toggled from the now-playing screen.' },
      { type: 'list', items: [
        'Shuffle Off: plays in natural order',
        'Shuffle (normal): classic random',
        'Smart Shuffle: context-aware weighting using mood, time, recency, and discovery ratio',
        'Repeat Off / Repeat All / Repeat One',
      ]},
      { type: 'note', label: 'Smart Shuffle', content: 'Smart Shuffle scores every track against your listening context. Use it for discovery sessions or background listening where variety helps.' },
    ],
  },
  {
    id: 'playlists',
    icon: '📁',
    title: 'Playlists',
    content: [
      { type: 'body', content: 'Create, rename, reorder, and delete playlists from the dedicated playlist screens and dialogs. Playlists appear across the home screen and your library.' },
      { type: 'list', items: [
        'Create a playlist from the Library',
        'Add tracks from the track menu or player',
        'Reorder and remove tracks inside a playlist',
        'Play either in order or under your shuffle mode',
        'Import playlists from Spotify or YouTube with progress reporting',
      ]},
    ],
  },
  {
    id: 'favorites',
    icon: '❤️',
    title: 'Favorites',
    content: [
      { type: 'body', content: 'Save tracks you love with a single tap on the heart. Favorites are stored locally, shown as a count on the home screen, and gathered in your library.' },
      { type: 'list', items: [
        'Tap the heart on a track or in the player to like it',
        'Tap again to unlike',
        'Favorites persist across sessions',
        'Favorite count appears on the home screen',
      ]},
    ],
  },
  {
    id: 'lyrics',
    icon: '📝',
    title: 'Lyrics',
    content: [
      { type: 'body', content: 'When timestamped lyric data is available for a track, NightLight displays time-synced lyrics in a dedicated view. The active line highlights as the song moves.' },
      { type: 'list', items: [
        'Auto-scroll follows the song',
        'Tap any line to pause auto-scroll and browse manually',
        'Tap again to resume sync',
        'Lyric availability varies by track',
      ]},
    ],
  },
  {
    id: 'background-playback',
    icon: '🎧',
    title: 'Background Playback',
    content: [
      { type: 'body', content: 'NightLight runs as a MediaSessionService with a foreground service. Playback continues when you lock your screen, switch apps, or put the phone away, and media controls appear in the notification shade.' },
      { type: 'list', items: [
        'Lock-screen playback with notification controls',
        'Audio focus handled by ExoPlayer',
        '200 MB LRU stream cache smooths repeat plays',
        'Works with system media controls',
      ]},
    ],
  },
  {
    id: 'contextual-discovery',
    icon: '🌙',
    title: 'Contextual Discovery',
    content: [
      { type: 'body', content: 'The context engine reads time of day (six slots), weather (rain, snow, fog, sun, cloud), and mood signals, and shapes discovery accordingly. Here\'s what that looks like in practice:' },
      { type: 'list', items: [
        'Rainy night: surfaces soft, slowed-down listening ("Rainy night — soft songs")',
        'Late-night focus: leans toward instrumentals and low-energy tracks',
        'Morning: picks up energy and drive',
        'Related-song radio: surfaces related artists and tracks',
      ]},
    ],
  },
] as const;

const TROUBLESHOOTING = [
  {
    id: 'no-audio',
    problem: 'No audio plays when I tap a track',
    solution: 'Check: (1) System volume is up and the phone is not on silent/DND. (2) The stream source is reachable — try a different track. (3) If Bluetooth is connected, ensure the device is selected as the output. (4) Restart the app if playback appears stuck.',
  },
  {
    id: 'background-stop',
    problem: 'Playback stops when I lock the screen',
    solution: 'NightLight uses a foreground media service for background playback. Make sure you granted the background/media notifications permission when prompted. Check Android settings under Apps → NightLight → Notifications and ensure notifications are enabled. Also check battery optimization: some manufacturers aggressively stop background services — add NightLight to the exclusion list if available.',
  },
  {
    id: 'lyrics-not-showing',
    problem: 'Lyrics don\'t appear for a track',
    solution: 'Lyrics only appear when timestamped lyric data is available for that specific track. Not all tracks have lyric data. Open the lyrics view from the player — if nothing loads, lyrics are unavailable for that track from the current source.',
  },
  {
    id: 'search-not-working',
    problem: 'Search returns no results',
    solution: 'Try shorter queries (artist + title). Check your spelling. If offline, search requires a network connection to the music API. If results are paginated, scroll further to load more.',
  },
  {
    id: 'smart-shuffle-no-change',
    problem: 'Smart Shuffle doesn\'t seem to change the queue',
    solution: 'Smart Shuffle weights tracks by context — mood, time, recency, and discovery. In small queues the effect can be subtle. Add more variety to the queue or playlist, and make sure Smart is the active mode (the shuffle icon reflects the current mode).',
  },
  {
    id: 'background-permission',
    problem: 'Notification/permission prompts at first run',
    solution: 'NightLight requests notification and media playback permissions because it runs as a foreground media service. Grant them to enable background playback and lock-screen controls. You can revoke access later in Android settings.',
  },
  {
    id: 'playlist-import-failed',
    problem: 'Playlist import fails or shows zero tracks',
    solution: 'NightLight converts playlists from supported sources (e.g., Spotify, YouTube). Verify: (1) the playlist URL is valid and public, (2) the source service is reachable, and (3) the tracks can be matched to the music catalog. Import progress is reported so you can see where it stops.',
  },
  {
    id: 'listen-together-out-of-sync',
    problem: 'Listen Together gets out of sync',
    solution: 'Listen Together sessions rely on stable network for all participants. Try re-sending the session link or code. The host controls playback; participants follow. On high-latency networks, drift can occur — the host can pause/play to re-sync.',
  },
] as const;