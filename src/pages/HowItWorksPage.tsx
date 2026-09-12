/**
 * HOW IT WORKS PAGE (§8, §14)
 * ---------------------------
 * Step-by-step explanation of the product flow.
 * Only includes functionality that actually exists.
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
    name: 'How to Use NightLight',
    description: 'Step-by-step guide to using NightLight: open the player, search or select music, control playback, and use player features.',
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      { '@type': 'HowToSupply', name: 'Modern web browser (Chrome, Firefox, Safari, Edge)' },
      { '@type': 'HowToSupply', name: 'Internet connection' },
      { '@type': 'HowToSupply', name: 'Audio output (speakers or headphones)' },
    ],
    tool: {
      '@type': 'HowToTool',
      name: 'NightLight web music player',
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
        <div className="page-hero__inner" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>How It Works</Eyebrow>
            <Headline as="h1" id="how-title" size="xl">From open tab to playing music in seconds.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              NightLight is designed to be immediately understandable. Here's the complete flow.
            </Body>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
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

                {step.shortcut && (
                  <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(216, 181, 106, 0.08)', borderRadius: '8px', border: '1px solid rgba(216, 181, 106, 0.2)', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                    <Micro style={{ margin: 0 }}>Shortcut:</Micro>
                    <kbd style={{ background: 'rgba(216, 181, 106, 0.2)', padding: '4px 10px', borderRadius: '6px', fontFamily: 'inherit' }}>{step.shortcut}</kbd>
                  </div>
                )}
              </div>
            </Reveal>
          </article>
        ))}

        {/* INLINE AD */}
        <InlineAdSlot slotName="how-it-works-after-steps" />

        {/* VISUAL MODES DEEP DIVE */}
        <article className="how-step" style={{ marginTop: 'clamp(80px, 12vh, 140px)', borderBottom: 'none' }}>
          <Reveal>
            <div style={{ gridColumn: '1 / -1' }}>
              <Headline as="h2" size="lg" style={{ marginBottom: '16px' }}>Choosing your visual mode</Headline>
              <Body style={{ maxWidth: 'none', marginBottom: '20px', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: '1.75' }}>
                NightLight's visual modes aren't just cosmetic — they materially affect performance and battery life. Choose based on your device and context:
              </Body>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {VISUAL_MODES.map((mode) => (
                  <div key={mode.id} style={{ padding: '24px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '16px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '2rem' }}>{mode.icon}</span>
                      <Headline as="h3" size="md" style={{ margin: 0 }}>{mode.name}</Headline>
                    </div>
                    <Body style={{ maxWidth: 'none', marginBottom: '12px' }}>{mode.description}</Body>
                    <Micro>Best for: {mode.bestFor}</Micro>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </article>

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

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(80px, 12vh, 140px)' }}>
            <DownloadButton>Download NightLight</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>Or <a href="/" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>start listening now</a></p>
          </div>
        </Reveal>
      </main>
    </>
  );
}

const STEPS = [
  {
    id: 'open',
    title: 'Open NightLight',
    description: 'Visit nightlightmusic.vercel.app in any modern browser — Chrome, Firefox, Safari, Edge, or their mobile equivalents. The player loads instantly. No installation wizard, no account creation, no permissions prompt. You are immediately at the player interface.',
    details: [
      'Works on desktop (Windows, macOS, Linux, Chrome OS)',
      'Works on mobile (iOS Safari, Android Chrome, Samsung Internet)',
      'Works on tablets (iPadOS, Android tablets)',
      'No cookies required for core playback',
      'Service worker caches assets for faster subsequent loads',
    ],
    shortcut: 'N/A — just open the URL',
  },
  {
    id: 'search',
    title: 'Search or browse for music',
    description: 'Use the search bar to find tracks by title, artist, album, or even lyrics fragments. NightLight understands intent: "Perfect" returns Ed Sheeran\'s original first. "Perfect acoustic" promotes the acoustic variant. Variants (live, remix, instrumental) are labeled and grouped — the canonical track never gets buried.',
    details: [
      'Search by track title, artist, or combination',
      'Variant detection: acoustic, live, remix, instrumental',
      'Canonical version always ranks first for base queries',
      'Language-aware results (English/Hindi toggle)',
      'Recent searches saved locally for quick access',
    ],
    shortcut: '/ (forward slash) to focus search',
  },
  {
    id: 'select',
    title: 'Choose content and start playback',
    description: 'Click any track result to start playback immediately. The interface responds instantly — artwork loads, the color palette adapts to the album art, lyrics sync if available, and the queue builds automatically with related tracks. No loading spinner, no delay.',
    details: [
      'Instant playback start (subject to network)',
      'Album artwork drives dynamic color theming',
      'Time-synced lyrics load automatically when available',
      'Queue populates with contextually relevant tracks',
      'Visual mode applies immediately',
    ],
    shortcut: 'Enter to play focused track',
  },
  {
    id: 'control',
    title: 'Control playback',
    description: 'Standard playback controls: play/pause, next/previous, seek bar, volume, repeat, shuffle. All controls are keyboard accessible. The seek bar shows timestamp and duration. Volume remembers your last setting. Repeat cycles: off → one → all.',
    details: [
      'Space = play/pause',
      'Arrow Left/Right = seek ±10s (Shift = ±30s)',
      'Arrow Up/Down = volume',
      'M = mute toggle',
      'N/P = next/previous',
      'R = repeat cycle',
      'S = shuffle cycle',
    ],
    shortcut: 'Space = play/pause',
  },
  {
    id: 'features',
    title: 'Use player features',
    description: 'Beyond basic playback, NightLight offers features that enhance the listening experience: three visual modes (Low Power, Ambient, Animation), three shuffle modes (Off, Smart, Random), time-synced lyrics, playlist import from other services, and shared listening sessions. Each feature is optional — use what fits your session.',
    details: [
      'V = cycle visual mode (Low Power → Ambient → Animation)',
      'L = toggle lyrics view',
      'Smart Shuffle = context-aware queue ordering',
      'Playlist Import = Spotify, Apple Music, YouTube Music URLs',
      'Share Session = generate link for synced multi-device listening',
      'Language Toggle = English/Hindi preference for recommendations',
    ],
    shortcut: 'V = visual mode, L = lyrics, S = shuffle',
  },
] as const;

const VISUAL_MODES = [
  {
    id: 'low',
    icon: '🔋',
    name: 'Low Power',
    description: 'Minimal particles. Subtle static atmosphere. No rain, no clouds, no parallax. The background reduces to a simple gradient with a soft vignette. Animation frame rate targets 30fps. GPU usage minimized.',
    bestFor: 'Laptops on battery, older devices, background listening, accessibility (reduced motion)',
  },
  {
    id: 'ambient',
    icon: '🌙',
    name: 'Ambient',
    description: 'Slow clouds drifting. Light rain with subtle droplets. Soft moonlight glow. Gentle parallax on device movement. Film grain texture. Targets 60fps on modern devices. Balanced immersion and performance.',
    bestFor: 'Most listening sessions, desktop use, evening relaxation, focused work',
  },
  {
    id: 'animation',
    icon: '⚡',
    name: 'Animation',
    description: 'Full rain depth with layered droplets and ripples. Dynamic cloud movement with multiple layers. Parallax response to pointer/device motion. Lightning flashes synced to audio peaks (when available). Film grain. Maximum GPU usage. Targets 60fps on capable hardware.',
    bestFor: 'Dedicated listening sessions, high-end devices, plugged-in laptops, immersive environments',
  },
] as const;

const SHUFFLE_MODES = [
  {
    id: 'off',
    icon: '📋',
    name: 'Off (Sequential)',
    description: 'Tracks play in their natural order — album tracklist, playlist order, or search result order. No reordering. Predictable, intentional.',
    useWhen: 'Listening to an album front-to-back, following a curated playlist, learning a new artist\'s discography',
  },
  {
    id: 'smart',
    icon: '🧠',
    name: 'Smart Shuffle',
    description: 'Context-aware ordering. Considers: time of day (late night = slower tempo), mood signals (recent skips, repeats), language preference, listening history, track relationships (same artist, similar genre). The queue reorders dynamically as context changes.',
    useWhen: 'Discovery sessions, "surprise me" moods, background listening where variety helps',
  },
  {
    id: 'random',
    icon: '🎲',
    name: 'Random Shuffle',
    description: 'True random with deterministic seeding. Every eligible track gets an equal turn. The same seed produces the same order — so "random" is reproducible. No context awareness, no weighting.',
    useWhen: 'Maximum variety, rediscovering library, party/random play, when you want no pattern at all',
  },
] as const;