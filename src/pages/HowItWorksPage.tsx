/**
 * HOW IT WORKS PAGE
 * -----------------
 * Step-by-step guide to using the NightLight Android music player.
 * Every step is based on VERIFIED behavior in the Android repository.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL } from '../config/site';

export default function HowItWorksPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the NightLight Android Music Player',
    description: 'Step-by-step guide to installing and using NightLight: discover music, play tracks, and use shuffle, favorites, playlists, lyrics, and background playback.',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      { '@type': 'HowToSupply', name: 'Android device running Android 8.0 or newer' },
      { '@type': 'HowToSupply', name: 'Internet connection for streaming music' },
      { '@type': 'HowToSupply', name: 'Audio output (speakers or headphones)' },
    ],
    tool: {
      '@type': 'HowToTool',
      name: 'NightLight Android music player',
      url: SITE_URL,
    },
    step: STEPS.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      url: `${SITE_URL}/how-it-works#step-${index + 1}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="how-title">
        <div className="page-hero__inner">
          <Reveal>
            <Eyebrow>How It Works</Eyebrow>
            <Headline as="h1" id="how-title" size="xl">From install to a perfect queue in minutes.</Headline>
            <Body className="page-hero__lead">
              NightLight is designed to be immediately understandable. Here's the complete flow inside the Android app.
            </Body>
          </Reveal>
        </div>
      </section>

      <div className="page-content">
        {STEPS.map((step, index) => (
          <article key={step.id} className="how-step" id={`step-${index + 1}`} style={{
            marginTop: index === 0 ? 0 : 'clamp(80px, 12vh, 140px)',
            paddingBottom: 'clamp(64px, 10vh, 100px)',
            borderBottom: index < STEPS.length - 1 ? '1px solid rgba(216, 181, 106, 0.1)' : 'none',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '32px',
            alignItems: 'start',
          }}>
            <Reveal delay={index * 80}>
              <div className="how-step__number" style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 700,
                color: 'rgba(216, 181, 106, 0.15)',
                lineHeight: 1,
                fontFamily: '"Space Grotesk", sans-serif',
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <Headline as="h2" size="lg" style={{ marginBottom: '16px' }}>{step.title}</Headline>
                <Body style={{ maxWidth: 'none', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: '1.75' }}>{step.description}</Body>

                {step.details && (
                  <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '12px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                    <Micro style={{ color: 'var(--c-accent)', marginBottom: '12px', display: 'block' }}>Details</Micro>
                    <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.9' }}>
                      {step.details.map((detail, dIndex) => (
                        <li key={dIndex}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          </article>
        ))}

        {/* INLINE AD */}
        <InlineAdSlot slotName="how-it-works-after-steps" />

        {/* SHUFFLE MODES DEEP DIVE */}
        <article className="how-step" style={{ marginTop: 'clamp(80px, 12vh, 140px)', borderBottom: 'none' }}>
          <Reveal>
            <div style={{ gridColumn: '1 / -1' }}>
              <Headline as="h2" size="lg" style={{ marginBottom: '16px' }}>Understanding shuffle modes</Headline>
              <Body style={{ maxWidth: 'none', marginBottom: '20px', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: '1.75' }}>
                Each shuffle mode serves a different listening intention. Here's when to use each:
              </Body>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {SHUFFLE_MODES.map((mode) => (
                  <div key={mode.id} style={{ padding: '24px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '16px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                    <Headline as="h3" size="md" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>{mode.icon} {mode.name}</Headline>
                    <Body style={{ maxWidth: 'none', marginBottom: '12px' }}>{mode.description}</Body>
                    <Micro>Use when: {mode.useWhen}</Micro>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </article>

        {/* REPEAT MODES */}
        <article className="how-step" style={{ marginTop: 'clamp(80px, 12vh, 140px)', borderBottom: 'none' }}>
          <Reveal>
            <div style={{ gridColumn: '1 / -1' }}>
              <Headline as="h2" size="lg" style={{ marginBottom: '16px' }}>Repeat modes</Headline>
              <Body style={{ maxWidth: 'none', marginBottom: '20px', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: '1.75' }}>
                NightLight supports three repeat modes from the now-playing screen:
              </Body>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {REPEAT_MODES.map((mode) => (
                  <div key={mode.id} style={{ padding: '24px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '16px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                    <Headline as="h3" size="md" style={{ marginBottom: '12px' }}>{mode.icon} {mode.name}</Headline>
                    <Body style={{ maxWidth: 'none', marginBottom: '12px' }}>{mode.description}</Body>
                    <Micro>Best for: {mode.bestFor}</Micro>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </article>

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(80px, 12vh, 140px)' }}>
            <DownloadButton>Download NightLight for Android</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>Requires Android 8.0 or newer.</p>
          </div>
        </Reveal>
      </div>
    </>
  );
}

const STEPS = [
  {
    id: 'install',
    title: 'Install NightLight',
    description: 'Download the NightLight Android app and install it on your device. NightLight runs on Android 8.0 (Oreo) and above. After installation, the app opens to a home screen designed around your listening.',
    details: [
      'Compatible with Android 8.0 and newer',
      'Supports Google Sign-In as an optional convenience',
      'No account required to start listening',
      'Open source — the code is publicly available',
    ],
  },
  {
    id: 'discover',
    title: 'Discover music',
    description: 'The home screen is the discovery hub. Sections for Recently Played, For You (context-aware), Trending, Playlists, and your Favorites sit one scroll away. A mood chip row lets you shape recommendations quickly.',
    details: [
      '"For You" recommendations adapt to time, weather, and mood',
      'Trending section surfaces what\'s moving right now',
      'Mood chips let you jump to a mood directly',
      'Search with history covers title and artist queries',
    ],
  },
  {
    id: 'play',
    title: 'Play a track',
    description: 'Tap any track to start playback. The now-playing screen brings the full player together — artwork as a spinning vinyl disc, backdrop lighting, the queue, and controls where your thumb already is.',
    details: [
      'Vinyl disc animation plays while the track plays',
      'Backdrop lighting follows the album artwork',
      'Queue view shows upcoming tracks and supports reordering',
      'Like, lyrics, and listen-together actions are one tap away',
    ],
  },
  {
    id: 'shuffle-repeat',
    title: 'Use shuffle and repeat',
    description: 'The player offers three shuffle modes — Off (sequential), normal shuffle, and Smart (context-aware) — plus three repeat modes: Off, Repeat All, and Repeat One. Toggle them from the now-playing screen.',
    details: [
      'Smart Shuffle scores tracks against mood, time, and history',
      'Repeat One loops the current track',
      'Repeat All loops the queue or playlist',
      'The current mode is shown in the player UI',
    ],
  },
  {
    id: 'extend',
    title: 'Extend the experience',
    description: 'Beyond playback, NightLight covers the whole listening loop: save favorites with a tap, build playlists, read synced lyrics, let playback continue in the background, and start Listen Together sessions with friends.',
    details: [
      'Favorites: one tap, stored locally, counted on home',
      'Playlists: create, rename, reorder, delete',
      'Lyrics: time-synced view with auto-scroll and manual pause',
      'Background playback: keeps playing through locks and app switches',
      'Listen Together: session codes and deep links keep playback in sync',
    ],
  },
] as const;

const SHUFFLE_MODES = [
  {
    id: 'off',
    icon: '📋',
    name: 'Off (Sequential)',
    description: 'Tracks play in their natural order — album tracklist, playlist order, or search result order. No reordering. Predictable, intentional.',
    useWhen: 'Listening to an album front-to-back or following a curated playlist.',
  },
  {
    id: 'normal',
    icon: '🔀',
    name: 'Normal Shuffle',
    description: 'Classic random shuffle — every eligible track gets a turn with no context awareness.',
    useWhen: 'Maximum variety across a library or playlist.',
  },
  {
    id: 'smart',
    icon: '🧠',
    name: 'Smart Shuffle',
    description: 'Context-aware ordering. The engine scores tracks against mood signals, time of day, recency, seed affinity, and a discovery ratio that deliberately introduces fresh artists.',
    useWhen: 'Discovery sessions, "surprise me" moods, background listening where variety helps.',
  },
] as const;

const REPEAT_MODES = [
  {
    id: 'off',
    icon: '⏹️',
    name: 'Repeat Off',
    description: 'No looping. The queue plays through once and stops at the end.',
    bestFor: 'Focused, single-pass listening sessions.',
  },
  {
    id: 'all',
    icon: '🔁',
    name: 'Repeat All',
    description: 'Loops the entire queue or playlist continuously.',
    bestFor: 'Long sessions, background listening, drives.',
  },
  {
    id: 'one',
    icon: '🔂',
    name: 'Repeat One',
    description: 'Loops the current track indefinitely.',
    bestFor: 'Learning a track or a moment you don\'t want to end.',
  },
] as const;