/**
 * FEATURES PAGE (§7, §14)
 * -----------------------
 * Real features page listing actual features discovered in the codebase.
 * For each feature: name, what it does, user benefit, how to use it.
 * No fabricated features.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';

export default function FeaturesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NightLight Features',
    description: 'Complete list of NightLight features with descriptions and usage guidance.',
    itemListElement: FEATURES.map((feature, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareFeature',
        name: feature.name,
        description: feature.description,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="features-title">
        <div className="page-hero__inner" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>Features</Eyebrow>
            <Headline as="h1" id="features-title" size="xl">Every feature. For a reason.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              No feature checkboxes. No bloat. Each capability exists because it improves the listening experience.
            </Body>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
        {FEATURES.map((feature, index) => (
          <article key={feature.id} className="feature-detail" style={{ marginTop: index === 0 ? 0 : 'clamp(64px, 10vh, 100px)', paddingBottom: 'clamp(48px, 8vh, 80px)', borderBottom: index < FEATURES.length - 1 ? '1px solid rgba(216, 181, 106, 0.1)' : 'none' }}>
            <Reveal delay={index * 50}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '16px' }}>
                <div className="feature-detail__icon" style={{ fontSize: '2.5rem', flexShrink: 0, marginTop: '4px' }}>{feature.icon}</div>
                <div>
                  <Headline as="h2" size="lg" style={{ marginBottom: '8px' }}>{feature.name}</Headline>
                  <Micro style={{ color: 'var(--c-accent)' }}>{feature.category}</Micro>
                </div>
              </div>

              <div style={{ paddingLeft: 'calc(2.5rem + 24px)' }}>
                <Body style={{ marginBottom: '16px', maxWidth: 'none', fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', lineHeight: '1.7' }}>
                  <strong>What it does:</strong> {feature.description}
                </Body>

                <Body style={{ marginBottom: '16px', maxWidth: 'none', fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', lineHeight: '1.7' }}>
                  <strong>How you benefit:</strong> {feature.benefit}
                </Body>

                <div style={{ padding: '16px 20px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '12px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                  <Micro style={{ marginBottom: '8px', display: 'block' }}>How to use it:</Micro>
                  <Body style={{ maxWidth: 'none', margin: 0, fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}>{feature.howToUse}</Body>
                </div>
              </div>
            </Reveal>
          </article>
        ))}

        {/* INLINE AD - After feature list */}
        <InlineAdSlot slotName="features-after-list" />

        {/* KEYBOARD SHORTCUTS REFERENCE */}
        <article className="feature-detail" aria-labelledby="shortcuts-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)', borderBottom: 'none' }}>
          <Reveal>
            <Headline as="h2" id="shortcuts-title" size="md">Keyboard shortcuts reference</Headline>
            <Body style={{ marginTop: '16px' }}>Every primary action in NightLight has a keyboard shortcut. Press <kbd style={{ background: 'rgba(216, 181, 106, 0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'inherit' }}>?</kbd> anywhere in the player to see this reference.</Body>

            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {SHORTCUTS.map((group) => (
                <div key={group.category} style={{ padding: '20px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '12px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                  <Micro style={{ color: 'var(--c-accent)', marginBottom: '12px', display: 'block' }}>{group.category}</Micro>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.2' }}>
                    {group.items.map((item) => (
                      <li key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span><kbd style={{ background: 'rgba(216, 181, 106, 0.1)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'inherit', marginRight: '8px' }}>{item.key}</kbd>{item.action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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

const FEATURES = [
  {
    id: 'adaptive-visuals',
    icon: '🌙',
    name: 'Adaptive Visual Modes',
    category: 'Visual Experience',
    description: 'Three distinct visual modes — Low Power, Ambient, and Animation — that change the entire atmospheric environment. Low Power minimizes particles and effects for maximum battery efficiency. Ambient adds slow-moving clouds, light rain, and soft lighting. Animation enables full rain depth, cloud movement, parallax layers, and lightning storms.',
    benefit: 'You choose the visual intensity that matches your context — saving battery on a laptop, creating atmosphere for focused listening, or going fully immersive for a dedicated session.',
    howToUse: 'Press V to cycle modes, or use the mode toggle in the player. Your preference persists across sessions via localStorage.',
  },
  {
    id: 'three-shuffle',
    icon: '🔀',
    name: 'Three Shuffle Modes',
    category: 'Playback Intelligence',
    description: 'Shuffle is not a single behavior. Off plays tracks in their natural order. Smart Shuffle uses context — time of day, mood signals, language preference, listening history — to order the queue intelligently. Random Shuffle gives every eligible track an equal turn using a deterministic seed so the same "random" order is reproducible.',
    benefit: 'Different listening intentions need different shuffle behaviors. Sequential for albums, Smart for discovery, Random for variety. You get control without complexity.',
    howToUse: 'Click the shuffle icon in the player to cycle: Off → Smart → Random. The current mode is indicated in the player UI.',
  },
  {
    id: 'synced-lyrics',
    icon: '📝',
    name: 'Time-Synced Lyrics',
    category: 'Lyrics & Typography',
    description: 'Lyrics appear line by line, synchronized with playback progress. The design treats lyrics as typography — words set in the darkness, not crammed into a scrolling panel. The active line highlights, past lines fade, future lines wait. When lyric data is available for a track, synchronization is automatic.',
    benefit: 'You can follow the words without visual clutter. The cinematic presentation keeps focus on the music while making lyrics readable when you want them.',
    howToUse: 'Press L to toggle lyrics view. Lyrics appear automatically when available for the currently playing track. No manual sync needed.',
  },
  {
    id: 'smart-search',
    icon: '🔍',
    name: 'Intent-Aware Search',
    category: 'Discovery',
    description: 'Search understands track intent, not just string matching. "Ed Sheeran Perfect" returns the canonical original version first. "Ed Sheeran Perfect acoustic" promotes the acoustic variant to the top while keeping other versions (live, remix, instrumental) accessible. Variants are labeled and grouped — the canonical track never gets buried.',
    benefit: 'You find the version you actually want without wading through duplicates. The original wins by default; qualifiers refine without losing context.',
    howToUse: 'Type in the search bar. Results show variant badges (acoustic, live, remix) and a "Best match" badge for the canonical version.',
  },
  {
    id: 'playlist-import',
    icon: '📥',
    name: 'Playlist Import',
    category: 'Library Management',
    description: 'Paste a playlist URL from Spotify, Apple Music, or YouTube Music. NightLight reads the playlist metadata, matches available tracks to its catalog, and creates a NightLight playlist. The import flow shows: tracks found, tracks matched, tracks unavailable — no silent failures. Matched tracks are added to your library immediately.',
    benefit: 'You don\'t have to rebuild playlists from scratch when switching players. Bring your existing curation with you — the tracks that are available come along.',
    howToUse: 'Open the import flow (from the player menu), paste the playlist URL, review the match summary, confirm. The playlist appears in your library.',
  },
  {
    id: 'shared-listening',
    icon: '🔗',
    name: 'Shared Listening Sessions',
    category: 'Social Listening',
    description: 'Start a session from the player, share the generated link (e.g., nightlight.app/l/ABC123), and anyone who opens it joins the same playback in sync. Both devices play the same track at the same timestamp. A listening chat appears alongside — secondary to the music, part of the session, not a distraction. The host controls playback; guests follow.',
    benefit: 'Listen together without screen sharing or voice calls. The music stays dominant; conversation is optional and contextual.',
    howToUse: 'Click Share in the player, copy the session link, send it. Guest opens the link — playback syncs automatically. Chat appears when both parties are present.',
  },
  {
    id: 'language-aware',
    icon: '🌐',
    name: 'Language-Aware Recommendations',
    category: 'Personalization',
    description: 'NightLight respects language preference as a first-class signal. Switch between English and Hindi (with more languages planned) — the recommendations and discovery results change to match, but the quality and diversity stay the same. This is not a filter that hides content; it\'s a ranking signal that prioritizes relevance.',
    benefit: 'Multilingual listeners don\'t have to wade through irrelevant recommendations. The player adapts to what you actually want to hear.',
    howToUse: 'Use the language toggle in settings or the Language-Aware section. Recommendations update immediately without requiring a restart.',
  },
  {
    id: 'keyboard-shortcuts',
    icon: '⌨️',
    name: 'Full Keyboard Control',
    category: 'Accessibility & Power Users',
    description: 'Every primary player action has a dedicated keyboard shortcut. The shortcuts are designed for both accessibility (WCAG 2.1 compliance) and power-user efficiency. No mouse required for any core playback function.',
    benefit: 'Desktop users can control playback without leaving the keyboard. Screen reader users get full control via standard key mappings.',
    howToUse: 'Press ? to see the full reference. Shortcuts work globally when the player is focused.',
  },
] as const;

const SHORTCUTS = [
  {
    category: 'Playback',
    items: [
      { key: 'Space', action: 'Play / Pause' },
      { key: 'Enter', action: 'Play selected track' },
      { key: 'Arrow Left', action: 'Seek backward 10s' },
      { key: 'Arrow Right', action: 'Seek forward 10s' },
      { key: 'Shift + Arrow Left', action: 'Seek backward 30s' },
      { key: 'Shift + Arrow Right', action: 'Seek forward 30s' },
      { key: 'Arrow Up', action: 'Volume up' },
      { key: 'Arrow Down', action: 'Volume down' },
      { key: 'M', action: 'Mute / Unmute' },
    ],
  },
  {
    category: 'Queue & Navigation',
    items: [
      { key: 'N', action: 'Next track' },
      { key: 'P', action: 'Previous track' },
      { key: 'S', action: 'Cycle shuffle mode' },
      { key: 'R', action: 'Toggle repeat' },
      { key: 'Q', action: 'Toggle queue view' },
      { key: 'L', action: 'Toggle lyrics view' },
      { key: 'V', action: 'Cycle visual mode' },
    ],
  },
  {
    category: 'Search & Library',
    items: [
      { key: '/', action: 'Focus search' },
      { key: 'Escape', action: 'Close modal / Clear search' },
      { key: 'Ctrl/Cmd + K', action: 'Open command palette (if available)' },
    ],
  },
] as const;