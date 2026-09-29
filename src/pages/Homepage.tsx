/**
 * HOMEPAGE
 * --------
 * A cinematic product story for NIGHTLIGHT — THE ANDROID MUSIC PLAYER.
 * Structure:
 * - Hero (Android positioning)
 * - What NightLight is
 * - Mood-aware shuffle
 * - Contextual discovery
 * - Trending tracks
 * - Time + weather context
 * - The player
 * - Playlists + favorites
 * - Lyrics + background playback
 * - Why NightLight
 * - FAQ preview
 * - Final CTA
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import DeviceShowcase from '../components/DeviceShowcase';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL, REPO_URL } from '../config/site';

export default function Homepage() {
  // WebSite + Organization are emitted sitewide by config/seo.ts, so only the
  // page-specific schema belongs here — declaring it twice confuses Google.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NightLight',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Player',
    operatingSystem: 'Android',
    url: SITE_URL,
    inLanguage: 'en',
    description:
      'NightLight is a modern Android music player built around contextual discovery, mood-aware shuffle, trending music, playlists, favorites, synced lyrics, and background playback.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Mood-aware smart shuffle',
      'Contextual music discovery',
      'Trending tracks',
      'Weather and time-aware recommendations',
      'Playlists',
      'Favorites',
      'Background playback',
      'Time-synced lyrics',
      'Listen Together sessions',
    ],
    sameAs: [REPO_URL],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HERO */}
      <section className="hero" id="top" data-section="hero" aria-labelledby="hero-title">
        <div className="hero__inner">
          <div className="hero__copy">
            <Eyebrow>Android Music Player</Eyebrow>
            <Headline as="h1" id="hero-title" size="xl">
              Music for
              <br />
              the moment you're in.
            </Headline>
            <Body className="hero__sub">
              NightLight is a modern Android music player built around smarter
              discovery, contextual listening, and a beautifully focused playback
              experience.
            </Body>
            <div className="hero__ctas">
              <DownloadButton>Download for Android</DownloadButton>
              <SecondaryButton href="#what-is-nightlight">Explore the experience</SecondaryButton>
            </div>
            <Micro className="hero__micro">Free · Android 8.0+ · Open source on GitHub</Micro>
          </div>

          <div className="hero__device">
            <DeviceShowcase />
          </div>
        </div>

        <div className="hero__scrollcue" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* WHAT IS NIGHTLIGHT */}
      <section className="seo-content" id="what-is-nightlight" data-section="what-is" aria-labelledby="what-is-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Eyebrow>What NightLight is</Eyebrow>
              <Headline as="h2" id="what-is-title" size="lg">An Android music player designed around how you actually listen.</Headline>
              <Body>
                NightLight is an Android app for discovering and playing music. It pairs a modern,
                focused player with contextual intelligence — the music adapts to the moment:
                the time of day, the weather outside, your mood, and your listening history.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <Headline as="h3" size="md">Not another search-and-play clone</Headline>
              <Body>
                Most music players are built around a search bar. NightLight is built around
                listening context. Mood-aware shuffle, weather and time-aware recommendations,
                trending music, and contextual discovery all work together to make finding
                something to play feel effortless.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="seo-content__section">
              <Headline as="h3" size="md">A modern Android experience</Headline>
              <ul className="seo-content__features">
                <li>
                  <Headline as="h4" size="md">Background playback</Headline>
                  <Body>Music keeps playing when you lock your screen, switch apps, or put the phone away.</Body>
                </li>
                <li>
                  <Headline as="h4" size="md">Synced lyrics</Headline>
                  <Body>Follow along line by line, set in a dedicated lyrics view.</Body>
                </li>
                <li>
                  <Headline as="h4" size="md">Playlists and favorites</Headline>
                  <Body>Build your library your way. Save tracks, curate playlists, revisit them anytime.</Body>
                </li>
                <li>
                  <Headline as="h4" size="md">Free and open source</Headline>
                  <Body>No subscription, no paywall. Licensed under MIT — the source is public.</Body>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INLINE AD - After intro content */}
      <InlineAdSlot slotName="homepage-after-intro" />

      {/* HOW IT WORKS - Product flow summary */}
      <section className="seo-content" id="how-it-works" data-section="how-it-works" aria-labelledby="how-works-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Eyebrow>How it works</Eyebrow>
              <Headline as="h2" id="how-works-title" size="lg">Install. Open. Discover. Play.</Headline>
              <Body>
                NightLight gets out of your way. Install the app, open it, and the home screen
                greets you with context — recently played, recommendations for the moment,
                trending tracks, and your playlists.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <ol className="how-it-works__steps" style={{ textAlign: 'left', maxWidth: '720px', margin: '0 auto', paddingLeft: '24px' }}>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>1. Install NightLight</Headline>
                  <Body>Download the Android app and install it on your phone. NightLight runs on Android 8.0 and above.</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>2. Open the app</Headline>
                  <Body>The home screen shows sections built around you: Recently Played, For You, Trending, your Playlists, and your Favorites.</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>3. Discover music</Headline>
                  <Body>Explore trending tracks, contextual recommendations that shift with time and weather, or search for anything by title or artist.</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>4. Play a track</Headline>
                  <Body>The now-playing screen brings artwork, the queue, and controls together. Toggle mood-aware shuffle, repeat modes, and view synced lyrics.</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>5. Keep listening</Headline>
                  <Body>Background playback keeps the music going when you leave the app. Favorite tracks, build playlists, and join Listen Together sessions.</Body>
                </li>
              </ol>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="seo-content__section" style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vh, 56px)' }}>
              <SecondaryButton href="/how-it-works">Read the full guide →</SecondaryButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="features" id="features" data-section="features" aria-labelledby="features-title">
        <div className="features__inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(96px, 14vh, 180px) clamp(20px, 5vw, 72px)' }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <Eyebrow>Built for real listening moments</Eyebrow>
              <Headline as="h2" id="features-title" size="lg">The player adapts to the moment.</Headline>
              <Body className="features__body" style={{ marginTop: '22px' }}>
                Every feature exists because it improves the listening experience. No feature checkboxes, no bloat.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="features__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(24px, 3vw, 40px)', marginTop: 'clamp(48px, 8vh, 80px)' }}>
              {FEATURES.map((feature, index) => (
                <article key={feature.id} className="feature-card" style={{
                  padding: '28px',
                  borderRadius: '16px',
                  border: '1px solid rgba(216, 181, 106, 0.14)',
                  background: 'rgba(8, 11, 16, 0.5)',
                  transition: 'border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), background 220ms cubic-bezier(0.22, 1, 0.36, 1)',
                  animationDelay: `${index * 80}ms`,
                }}>
                  <div className="feature-card__icon" style={{ fontSize: '2rem', marginBottom: '16px' }}>{feature.icon}</div>
                  <Headline as="h3" size="md" style={{ marginBottom: '12px' }}>{feature.name}</Headline>
                  <Body style={{ marginBottom: '16px', maxWidth: 'none' }}>{feature.description}</Body>
                  <Micro>{feature.howToUse}</Micro>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INLINE AD - After features */}
      <InlineAdSlot slotName="homepage-after-features" />

      {/* DOSSIER OF ACTUAL APP FEATURES */}
      <section className="seo-content" id="dossier" data-section="dossier" aria-labelledby="dossier-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <Eyebrow>The listening experience</Eyebrow>
              <Headline as="h2" id="dossier-title" size="lg">Designed for the night — and every mood in it.</Headline>
              <Body>
                NightLight connects music with the moment. Here is how each part of the
                experience works.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section" style={{ marginTop: 'clamp(48px, 8vh, 96px)' }}>
              <Headline as="h3" size="lg">Mood-aware shuffle</Headline>
              <Body>
                NightLight's shuffle isn't random — it's smart. The shuffle engine scores every
                track against your listening context: your mood, the time of day, how recently
                you played a song, and how much you've heard it. The result is a queue that
                flows with the moment instead of jumping between every genre you've ever
                touched.
              </Body>
              <Body>
                Toggle between three modes: Off (sequential), normal shuffle, and Smart —
                the context-aware mode that makes NightLight feel like it's listening with you.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="seo-content__section">
              <Headline as="h3" size="lg">Contextual discovery</Headline>
              <Body>
                A dedicated context engine reads the environment — time of day, weather, and
                your mood signals — and surfaces music that fits. A rainy night leans toward
                soft, slowed-down tracks. A late-night focus session drifts toward instrumentals.
                Monday morning energy gets something with drive.
              </Body>
              <Body>
                The home screen reflects this: "For You" recommendations change as your day
                changes, and every play keeps the freshness tuned.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="seo-content__section">
              <Headline as="h3" size="lg">Trending tracks</Headline>
              <Body>
                A dedicated trending section surfaces what's moving right now. Explore what's
                being listened to across the catalog and jump straight into the tracks other
                listeners are discovering.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="seo-content__section">
              <Headline as="h3" size="lg">Time and weather context</Headline>
              <Body>
                NightLight reads the time of day — from early morning to after midnight — and
                maps weather conditions like rain, snow, fog, or clear skies into listening
                hints. A rainy evening might surface "Rainy night — soft songs." Your context
                becomes the recommendation engine.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="seo-content__section">
              <Headline as="h3" size="lg">The modern player</Headline>
              <Body>
                The now-playing screen is where NightLight shines: a spinning vinyl disc for
                the artwork, backdrop lighting that follows the album, a draggable queue,
                playback controls where your thumb already is, and three shuffle modes plus
                three repeat modes.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="seo-content__section">
              <Headline as="h3" size="lg">Playlists and favorites</Headline>
              <Body>
                Build playlists, save favorites with one tap, and pull them from the home screen.
                NightLight treats your library as a first-class part of listening — not an
                afterthought.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="seo-content__section">
              <Headline as="h3" size="lg">Lyrics and background playback</Headline>
              <Body>
                When lyrics are available, they arrive in a dedicated, time-synced view —
                one line at a time, highlighted as the song moves. And playback never stops
                when you leave the app: NightLight runs as a proper Android background media
                service, so the music keeps going through screen locks, app switches, and
                longer drives.
              </Body>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT INTERFACE EXPLANATION */}
      <section className="rx" id="product" data-section="product" aria-labelledby="product-title">
        <div className="rx__stage">
          <div className="rx__copy">
            <Eyebrow>The player</Eyebrow>
            <Headline as="h2" id="product-title" size="lg">
              Music should feel
              <br />
              like something.
            </Headline>
            <Body className="rx__body">
              Not a dashboard. Not a file browser. A room where your music lives —
              artwork that breathes, lyrics that arrive with the line, light that
              follows the sound.
            </Body>

            <div className="rx__captions" aria-hidden="false">
              <p className="rx__caption" style={{ '--at': 0.22 } as React.CSSProperties}>
                Artwork first — the album sets the light.
              </p>
              <p className="rx__caption" style={{ '--at': 0.42 } as React.CSSProperties}>
                Controls where your thumb already is.
              </p>
              <p className="rx__caption" style={{ '--at': 0.62 } as React.CSSProperties}>
                Lyrics, one line at a time.
              </p>
            </div>

            <Micro className="rx__micro">
              Interactive preview of the player experience.
            </Micro>
          </div>

          <div className="rx__device">
            <div className="rx__glow" aria-hidden="true" />
            <PhoneMock interactive />
          </div>

          <Waveform className="rx__wave" />
        </div>
      </section>

      {/* WHY NIGHTLIGHT */}
      <section className="seo-content" id="why-nightlight" data-section="why-nightlight" aria-labelledby="why-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Eyebrow>Why NightLight</Eyebrow>
              <Headline as="h2" id="why-title" size="lg">Made for the moments music actually lives in.</Headline>
              <Body>
                NightLight is designed around the moment you are in. Late nights, quiet
                evenings, focused work, commutes, late drives, and casual discovery — the
                player shapes itself to the listening context rather than forcing you into
                one.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <ul className="seo-content__features">
                <li>
                  <Headline as="h3" size="md">Most players help you search.</Headline>
                  <Body>NightLight goes further into context and discovery. The experience connects music with mood, moment, time, weather, and listening behavior.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">A player that listens with you</Headline>
                  <Body>The context engine means the app understands your listening situation and responds with music that fits — not just a queue of everything.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Beautiful, focused, and free</Headline>
                  <Body>NightLight keeps the interface clean and the playback first-class. It's free to use and open source, with the code public on GitHub.</Body>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="seo-content" id="faq-preview" data-section="faq-preview" aria-labelledby="faq-preview-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Eyebrow>FAQ</Eyebrow>
              <Headline as="h2" id="faq-preview-title" size="lg">Quick answers.</Headline>
              <Body>A quick preview — <a href="/faq" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>view the full FAQ</a> for more.</Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
              {FAQ_PREVIEW.map((item) => (
                <details key={item.q} className="faq-item" style={{ marginBottom: '16px', padding: '20px', borderRadius: '12px', border: '1px solid rgba(216, 181, 106, 0.14)', background: 'rgba(8, 11, 16, 0.5)' }}>
                  <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Headline as="h3" size="md" style={{ margin: 0 }}>{item.q}</Headline>
                    <span style={{ color: 'var(--c-muted)', fontSize: '1.2rem' }}>+</span>
                  </summary>
                  <Body style={{ marginTop: '12px', maxWidth: 'none' }}>{item.a}</Body>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="finale" id="download" data-section="finale" aria-labelledby="finale-title">
        <div className="finale__inner">
          <Headline as="h2" id="finale-title" size="xl" className="finale__title">
            Your night.
            <br />
            Your music.
          </Headline>
          <Body className="finale__line">Put your headphones on.</Body>
          <div className="finale__cta">
            <DownloadButton>Download NightLight for Android</DownloadButton>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Feature definitions — sourced from the actual Android application.
 * Do not add features that don't exist in the app.
 */
const FEATURES = [
  {
    id: 'mood-shuffle',
    icon: '🧠',
    name: 'Mood-Aware Shuffle',
    description: 'Smart Shuffle scores tracks against your listening context — mood, time of day, recency, and how much you\'ve heard a track. The queue flows with the moment instead of jumping genres.',
    howToUse: 'Toggle Smart in the player shuffle menu. Cycle between Off, normal, and Smart.',
  },
  {
    id: 'contextual-discovery',
    icon: '🌙',
    name: 'Contextual Discovery',
    description: 'A context engine reads the environment — time, weather, mood signals — and surfaces music that fits. Recommendations change as your day changes.',
    howToUse: 'Check the "For You" section on the home screen. It updates with context.',
  },
  {
    id: 'trending',
    icon: '📈',
    name: 'Trending Tracks',
    description: 'A dedicated trending section surfaces what\'s being listened to right now across the catalog. Discover the tracks other listeners are playing.',
    howToUse: 'Open the Trending section on the home screen and tap any track to play.',
  },
  {
    id: 'weather-time',
    icon: '🌧️',
    name: 'Time + Weather Context',
    description: 'NightLight maps time of day and weather — rain, snow, fog, sun — into listening hints. A rainy night may surface soft songs; a drive gets more energy.',
    howToUse: 'Quote bars update automatically. Recommendations follow the forecast.',
  },
  {
    id: 'playlists',
    icon: '📁',
    name: 'Playlists',
    description: 'Full playlist support: create, edit, rename, reorder, and delete playlists. Your library lives on your device and is one tap away.',
    howToUse: 'Create a playlist from the Library screen, then add tracks from any menu.',
  },
  {
    id: 'favorites',
    icon: '❤️',
    name: 'Favorites',
    description: 'Save tracks you love with a single tap. Favorites live in your library and show up with a count on the home screen.',
    howToUse: 'Tap the heart on any track or in the player to like it. Find them in your Library.',
  },
  {
    id: 'background-playback',
    icon: '🎵',
    name: 'Background Playback',
    description: 'NightLight runs as a proper Android background media service. Music keeps playing when you lock the screen, switch apps, or leave the phone alone.',
    howToUse: 'Press play, then lock your screen. Playback continues via your notification.',
  },
  {
    id: 'lyrics',
    icon: '📝',
    name: 'Time-Synced Lyrics',
    description: 'Lyrics arrive in a dedicated view, line by line, synchronized with playback. The active line highlights as the song moves. Manual scrolling pauses the sync.',
    howToUse: 'Open the lyrics view from the player. Tap a line to pause auto-scroll.',
  },
  {
    id: 'search',
    icon: '🔍',
    name: 'Smart Search',
    description: 'Real-time search with debounced results, paginated browsing, and search history stored on your device. Find anything by title or artist.',
    howToUse: 'Tap the search bar on the home screen and start typing. History supports quick re-searches.',
  },
  {
    id: 'listen-together',
    icon: '🔗',
    name: 'Listen Together',
    description: 'Start a session, share the code or link, and listen to the same track in sync with friends. Session chat keeps the conversation close.',
    howToUse: 'Use the share/listen-together action in the player and share the session link.',
  },
] as const;

const FAQ_PREVIEW = [
  {
    q: 'Is NightLight an Android app?',
    a: 'Yes. NightLight is a modern Android music player. The website you\'re on is the landing page — the product is the Android app you install on your phone.',
  },
  {
    q: 'Is NightLight free?',
    a: 'Yes. NightLight is completely free to use — no subscription, no premium tier, no hidden costs. The project is open source under the MIT license.',
  },
  {
    q: 'Does NightLight support background playback?',
    a: 'Yes. NightLight runs as an Android background media service, so music keeps playing when you lock your screen or switch apps.',
  },
  {
    q: 'Does NightLight have lyrics?',
    a: 'Yes. When lyrics are available for a track, they appear in a dedicated, time-synced view — line by line, with the active line highlighted.',
  },
  {
    q: 'How does mood-aware shuffle work?',
    a: 'Smart shuffle scores every track against your listening context — mood, time of day, recency, and listening history — to build a queue that flows with the moment.',
  },
] as const;

// Import PhoneMock and Waveform for the product reveal section
import PhoneMock from '../components/PhoneMock';
import Waveform from '../components/Waveform';