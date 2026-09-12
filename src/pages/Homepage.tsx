/**
 * HOMEPAGE (§3, §19, §32)
 * -----------------------
 * Transformed into a real product/publisher page with substantial original content.
 * Architecture:
 * - Hero: Product introduction + primary CTA
 * - What Is NightLight: Core product explanation
 * - How It Works: Step-by-step flow
 * - Core Features: Actual features from the codebase
 * - Why Browser-Based: Product philosophy
 * - Product Screenshots/Interface: Visual explanation
 * - Getting Started: Actionable guidance
 * - FAQ Preview: Links to full FAQ
 * - About NightLight: Brief + link to full page
 * - Footer navigation
 * 
 * Ads: Eligible for ads (content route). AdSlot components placed
 * in content-appropriate positions, NOT next to interactive controls.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import DeviceShowcase from '../components/DeviceShowcase';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL } from '../config/site';

export default function Homepage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NightLight',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      description: 'NightLight is a free, modern web music player designed for simple and focused music listening.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Adaptive visual modes (Low Power, Ambient, Animation)',
        'Three shuffle modes (Off, Smart, Random)',
        'Time-synced lyrics',
        'Smart search with variant detection',
        'Playlist import from Spotify, Apple Music, YouTube Music',
        'Shared listening sessions with synced playback',
        'Language-aware recommendations',
        'Keyboard shortcuts',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NightLight',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ];

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
            <Eyebrow>Free Music Player for the Web</Eyebrow>
            <Headline as="h1" id="hero-title" size="xl">
              NightLight
              <br />
              — Free Music Player for the Web
            </Headline>
            <Body className="hero__sub">
              NightLight is a free, modern web music player built for simple, fast and focused music listening directly in your browser. No installation, no account required — just open and listen.
            </Body>
            <div className="hero__ctas">
              <DownloadButton>Download NightLight</DownloadButton>
              <SecondaryButton href="#what-is-nightlight">Explore the experience</SecondaryButton>
            </div>
            <Micro className="hero__micro">Free · Works in your browser · No account needed</Micro>
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
              <Headline as="h2" id="what-is-title" size="md">What is NightLight?</Headline>
              <Body>
                NightLight is a free music player that runs entirely in your web browser. Unlike traditional streaming services that require apps, subscriptions, or accounts, NightLight opens instantly in any modern browser — desktop, mobile, or tablet. It's designed for people who want a simple, focused music experience without the complexity of algorithm-driven feeds, social features, or heavy software installations.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <Headline as="h2" id="simpler-way" size="md">A simpler way to listen to music</Headline>
              <Body>
                Most music players are built around playlists, algorithms, and social features. NightLight takes a different approach: it's a lightweight, distraction-free player that puts your music first. The interface stays out of your way so you can focus on the listening experience. There are no recommendations you didn't ask for, no autoplay videos, no cluttered sidebars — just your music, presented beautifully.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="seo-content__section">
              <Headline as="h2" id="why-nightlight" size="md">Why use NightLight?</Headline>
              <ul className="seo-content__features">
                <li>
                  <Headline as="h3" size="md">Free and open</Headline>
                  <Body>No subscription, no account required. Just music.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Works in any browser</Headline>
                  <Body>Runs on desktop, mobile, tablet — anywhere with a modern browser.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Focused on the music</Headline>
                  <Body>Clean interface, album artwork, synced lyrics, and smart shuffle modes — all designed around the listening experience.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Lightweight and fast</Headline>
                  <Body>No heavy electron wrapper, no background processes. Loads instantly and uses minimal resources.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Modern web technology</Headline>
                  <Body>Built with React 19, optimized for performance with code splitting and lazy loading.</Body>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INLINE AD - After intro content, before feature deep-dive */}
      <InlineAdSlot slotName="homepage-after-intro" />

      {/* HOW IT WORKS */}
      <section className="seo-content" id="how-it-works" data-section="how-it-works" aria-labelledby="how-works-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Headline as="h2" id="how-works-title" size="md">How NightLight works</Headline>
              <Body>
                NightLight is designed to be immediately understandable. Here's the complete flow from opening the page to listening to music:
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <ol className="how-it-works__steps" style={{ textAlign: 'left', maxWidth: '720px', margin: '0 auto', paddingLeft: '24px' }}>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>1. Open NightLight</Headline>
                  <Body>Visit nightlightmusic.vercel.app in any modern browser. The player loads instantly — no installation, no sign-up screen, no permissions dialog.</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>2. Search or browse for music</Headline>
                  <Body>Use the search bar to find tracks by title, artist, or lyrics. NightLight understands intent — search "Ed Sheeran Perfect" and the original version ranks first. Add "acoustic" and the acoustic variant moves to the top.</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>3. Choose content</Headline>
                  <Body>Click any track to start playback immediately. The interface responds instantly — artwork loads, lyrics sync, and the queue builds automatically.</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>4. Control playback</Headline>
                  <Body>Standard controls: play/pause, next/previous, seek, volume, repeat, shuffle. Keyboard shortcuts supported (Space = play/pause, Arrow keys = seek, etc.).</Body>
                </li>
                <li style={{ marginBottom: '24px', paddingLeft: '16px' }}>
                  <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>5. Use player features</Headline>
                  <Body>Switch between three visual modes (Low Power, Ambient, Animation). Enable time-synced lyrics. Choose from three shuffle modes. Import playlists from other services. Start a shared listening session with a link.</Body>
                </li>
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="features" id="features" data-section="features" aria-labelledby="features-title">
        <div className="features__inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(96px, 14vh, 180px) clamp(20px, 5vw, 72px)' }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <Eyebrow>Core features</Eyebrow>
              <Headline as="h2" id="features-title" size="lg">Built for how you actually listen.</Headline>
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

      {/* INLINE AD - After features, before why browser-based */}
      <InlineAdSlot slotName="homepage-after-features" />

      {/* WHY BROWSER-BASED */}
      <section className="seo-content" id="why-browser" data-section="why-browser" aria-labelledby="why-browser-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Headline as="h2" id="why-browser-title" size="md">Why a browser-based music player?</Headline>
              <Body>
                The web browser is the most universal software platform in existence. It runs on every device, updates automatically, requires no installation, and respects user privacy by default. NightLight embraces this platform rather than fighting it.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <ul className="seo-content__features">
                <li>
                  <Headline as="h3" size="md">Zero friction</Headline>
                  <Body>Send a link, it plays. No "download the app" step. No "create an account" wall. The music starts in seconds.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Universal compatibility</Headline>
                  <Body>Works on Windows, macOS, Linux, Chrome OS, iOS, Android — anything with a modern browser. Even older devices benefit from the lightweight Low Power mode.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Privacy by default</Headline>
                  <Body>No background processes, no telemetry, no account tracking. Your listening stays in your browser session.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Always current</Headline>
                  <Body>No app updates to manage. You always have the latest version the moment you open the page.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Shareable by nature</Headline>
                  <Body>A NightLight session is just a URL. Shared listening works because the web is natively linkable.</Body>
                </li>
              </ul>
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
              Not a dashboard. Not a file browser. A room where your music lives — artwork that breathes, lyrics that arrive with the line, light that follows the sound.
            </Body>

            <div className="rx__captions" aria-hidden="false">
              <p className="rx__caption" style={{ '--at': 0.22 } as React.CSSProperties}>Artwork first — the album sets the light.</p>
              <p className="rx__caption" style={{ '--at': 0.42 } as React.CSSProperties}>Controls where your thumb already is.</p>
              <p className="rx__caption" style={{ '--at': 0.62 } as React.CSSProperties}>Lyrics, one line at a time.</p>
            </div>

            <Micro className="rx__micro">Interactive prototype — try the controls.</Micro>
          </div>

          <div className="rx__device">
            <div className="rx__glow" aria-hidden="true" />
            <PhoneMock interactive />
          </div>

          <Waveform className="rx__wave" />
        </div>
      </section>

      {/* GETTING STARTED */}
      <section className="seo-content" id="getting-started" data-section="getting-started" aria-labelledby="getting-started-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Headline as="h2" id="getting-started-title" size="md">Getting started with NightLight</Headline>
              <Body>
                You're already here. NightLight works immediately — but here are a few things worth knowing to get the most out of it:
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <ul className="seo-content__features">
                <li>
                  <Headline as="h3" size="md">Keyboard shortcuts</Headline>
                  <Body>Space = play/pause. Arrow Left/Right = seek ±10s. Arrow Up/Down = volume. M = mute. S = shuffle mode cycle. L = lyrics toggle. Q = queue toggle.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Visual modes</Headline>
                  <Body>Press V (or use the mode toggle) to cycle: Low Power → Ambient → Animation. Low Power extends battery life on laptops and phones. Animation is the full immersive experience.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Shuffle modes</Headline>
                  <Body>Cycle through Off (sequential), Smart (context-aware), and Random (true shuffle). Each serves a different listening intention.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Lyrics</Headline>
                  <Body>When available, lyrics sync automatically. Press L to toggle the lyrics view — words appear line by line, following the song.</Body>
                </li>
                <li>
                  <Headline as="h3" size="md">Playlist import</Headline>
                  <Body>Paste a Spotify, Apple Music, or YouTube Music playlist URL. NightLight matches available tracks to your library.</Body>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="seo-content__section" style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vh, 56px)' }}>
              <DownloadButton>Download NightLight</DownloadButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="seo-content" id="faq-preview" data-section="faq-preview" aria-labelledby="faq-preview-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Headline as="h2" id="faq-preview-title" size="md">Frequently asked questions</Headline>
              <Body>A quick preview — <a href="/faq" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>view the full FAQ</a> for more.</Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
              {FAQ_PREVIEW.map((item, _index) => (
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

      {/* ABOUT NIGHTLIGHT - Brief */}
      <section className="seo-content" id="about-brief" data-section="about-brief" aria-labelledby="about-brief-title">
        <div className="seo-content__inner">
          <Reveal>
            <div className="seo-content__section">
              <Headline as="h2" id="about-brief-title" size="md">About NightLight</Headline>
              <Body>
                NightLight is an independent project built by developers who believe music listening should be simple, beautiful, and free from unnecessary complexity. It's not backed by a major label, a streaming giant, or a venture fund — it's a product built for listeners, by listeners.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="seo-content__section">
              <Body>
                The project focuses on three things: a player that feels like a dedicated listening room, intelligence that's invisible rather than intrusive, and a web-first architecture that respects the platform's strengths. NightLight runs on React 19 with TypeScript, uses modern browser APIs for media playback, and is deployed on Vercel's edge network for fast global access.
              </Body>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="seo-content__section" style={{ textAlign: 'center', marginTop: 'clamp(24px, 4vh, 40px)' }}>
              <SecondaryButton href="/about">Read the full story →</SecondaryButton>
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
            <DownloadButton>Download NightLight</DownloadButton>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Feature definitions — sourced from actual product functionality in the codebase.
 * Do not add features that don't exist.
 */
const FEATURES = [
  {
    id: 'adaptive-visuals',
    icon: '🌙',
    name: 'Adaptive Visual Modes',
    description: 'Three visual modes — Low Power, Ambient, and Animation — let you choose how immersive the environment feels. Low Power minimizes particles for battery efficiency. Ambient adds slow clouds and light rain. Animation enables full rain depth, cloud movement, and parallax.',
    howToUse: 'Press V or use the mode toggle to cycle. Settings persist across sessions.',
  },
  {
    id: 'three-shuffle',
    icon: '🔀',
    name: 'Three Shuffle Modes',
    description: 'Shuffle isn\'t one thing. Off plays tracks in order. Smart Shuffle uses context — mood, language, history, time of day — to order the queue intelligently. Random Shuffle gives every eligible track an equal turn with a deterministic seed.',
    howToUse: 'Click the shuffle icon to cycle: Off → Smart → Random. Current mode shows in the player.',
  },
  {
    id: 'synced-lyrics',
    icon: '📝',
    name: 'Time-Synced Lyrics',
    description: 'Lyrics appear line by line, synchronized with playback. The typography-first design means words set like poetry in the darkness — not crammed into a panel. When lyrics are available for a track, they display automatically.',
    howToUse: 'Press L to toggle lyrics view. Works automatically when lyric data exists for the playing track.',
  },
  {
    id: 'smart-search',
    icon: '🔍',
    name: 'Intent-Aware Search',
    description: 'Search understands track intent. "Ed Sheeran Perfect" returns the canonical original first. "Ed Sheeran Perfect acoustic" promotes the acoustic variant to the top while keeping other versions accessible. No hijacking, no lost results.',
    howToUse: 'Type in the search bar. Variants (acoustic, live, remix) are labeled and grouped.',
  },
  {
    id: 'playlist-import',
    icon: '📥',
    name: 'Playlist Import',
    description: 'Paste a playlist link from Spotify, Apple Music, or YouTube Music. NightLight reads the playlist, matches available tracks to its catalog, and creates a NightLight playlist. Unavailable tracks are noted — no silent failures.',
    howToUse: 'Open the import flow, paste the URL, confirm. Matched tracks appear in your library.',
  },
  {
    id: 'shared-listening',
    icon: '🔗',
    name: 'Shared Listening Sessions',
    description: 'Start a session, share the link, and listen to the same track in perfect sync across devices. A listening chat appears alongside — secondary to the music, part of the session, not a distraction.',
    howToUse: 'Click Share in the player, copy the link, send it. Guest joins and playback syncs automatically.',
  },
  {
    id: 'language-aware',
    icon: '🌐',
    name: 'Language-Aware Recommendations',
    description: 'Switch between English and Hindi preferences — the suggestions change, but the quality stays the same. NightLight respects what you actually want to hear without forcing a single-language catalog.',
    howToUse: 'Use the language toggle in settings or the language-aware section. Recommendations update immediately.',
  },
  {
    id: 'keyboard-shortcuts',
    icon: '⌨️',
    name: 'Full Keyboard Control',
    description: 'Every primary action has a keyboard shortcut. Space (play/pause), arrows (seek/volume), M (mute), S (shuffle), L (lyrics), Q (queue), V (visual mode). Designed for desktop power users and accessibility.',
    howToUse: 'Press ? anywhere in the player to see the full shortcut reference.',
  },
] as const;

const FAQ_PREVIEW = [
  {
    q: 'Is NightLight free?',
    a: 'Yes. NightLight is completely free to use. No subscription, no premium tier, no hidden costs.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. NightLight works immediately without any account. Optional account features (sync, history) may be added later but the core player will always work without one.',
  },
  {
    q: 'Where does the music come from?',
    a: 'NightLight is a player, not a music service. It plays audio from sources you provide or that are available via supported integrations. The demo shows placeholder tracks with procedural artwork — the prototype runs without audio.',
  },
  {
    q: 'Can I import my Spotify playlists?',
    a: 'Yes. Paste a Spotify playlist URL (or Apple Music / YouTube Music) and NightLight will match available tracks to create a NightLight playlist.',
  },
  {
    q: 'Does NightLight work on mobile?',
    a: 'Yes. NightLight is fully responsive and works in mobile browsers. The Low Power visual mode is especially useful for battery life on phones.',
  },
] as const;

// Import PhoneMock and Waveform for the product reveal section
import PhoneMock from '../components/PhoneMock';
import Waveform from '../components/Waveform';