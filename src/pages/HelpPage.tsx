/**
 * HELP / DOCUMENTATION PAGE (§10, §14)
 * ------------------------------------
 * Useful documentation for actual functionality.
 * Explains real workflows: player, search, queue, playlists, playback, shortcuts, settings, troubleshooting.
 * Only documents functionality that exists.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL } from '../config/site';

export default function HelpPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'NightLight Help & Documentation',
    description: 'Documentation for using NightLight: player controls, searching, queue management, playlists, playback, keyboard shortcuts, settings, and troubleshooting.',
    about: {
      '@type': 'SoftwareApplication',
      name: 'NightLight',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
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
              Complete reference for NightLight's features and workflows.
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
                  {section.content.map((block, _bIndex) => (
                    <>
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
                      {block.type === 'shortcuts' && (
                        <div style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                          {block.items.map((item, iIndex) => (
                            <div key={iIndex} style={{ padding: '12px 16px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '8px', border: '1px solid rgba(216, 181, 106, 0.14)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span><kbd style={{ background: 'rgba(216, 181, 106, 0.1)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'inherit', marginRight: '8px' }}>{item.key}</kbd>{item.action}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
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
              {TROUBLESHOOTING.map((item, _index) => (
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
            <DownloadButton>Download NightLight</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>
              Still need help? <a href="/faq" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Check the FAQ</a> or <a href="/contact" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>contact us</a>.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}

const TOC_SECTIONS = [
  { id: 'player-controls', title: 'Player Controls' },
  { id: 'searching', title: 'Searching for Music' },
  { id: 'queue-management', title: 'Queue Management' },
  { id: 'playlists', title: 'Playlists' },
  { id: 'playback-controls', title: 'Playback Controls' },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts' },
  { id: 'settings', title: 'Settings' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
] as const;

const HELP_SECTIONS = [
  {
    id: 'player-controls',
    icon: '🎮',
    title: 'Player Controls',
    content: [
      { type: 'body', content: 'The NightLight player interface centers on the now-playing view. Album artwork dominates the screen, with the track title, artist, and context (playlist, album, mood) below. Playback controls sit at the bottom: play/pause, previous/next, seek bar with timestamps, volume, repeat, and shuffle.' },
      { type: 'body', content: 'Above the controls, three icon buttons provide quick access: Lyrics (toggles time-synced lyrics view), Queue (shows the upcoming tracks), and Smart (opens shuffle mode and visual mode options). The menu button (three dots) opens additional actions: Share Session, Add to Playlist, Import Playlist, and Settings.' },
      { type: 'list', items: [
        'Artwork area: click to toggle lyrics (when available)',
        'Track title/artist: displays current track metadata',
        'Context label: shows source (playlist name, "Discover", "Library")',
        'Seek bar: click/drag to seek, shows current/total time',
        'Volume: click icon to mute, drag slider to adjust',
        'Repeat: cycles Off → Repeat One → Repeat All',
        'Shuffle: cycles Off → Smart → Random',
      ]},
      { type: 'note', label: 'Tip', content: 'Press ? anywhere in the player to see the full keyboard shortcut reference.' },
    ],
  },
  {
    id: 'searching',
    icon: '🔍',
    title: 'Searching for Music',
    content: [
      { type: 'body', content: 'NightLight\'s search understands track intent, not just text matching. Type a query and results appear instantly.' },
      { type: 'list', items: [
        'Base query ("Ed Sheeran Perfect"): canonical original version ranks first',
        'Variant qualifier ("Perfect acoustic"): acoustic variant promotes to top',
        'Variant badges: acoustic, live, remix, instrumental are labeled',
        'Canonical badge: "Best match" indicates the primary version',
        'Language toggle: switch between English/Hindi to change result ranking',
      ]},
      { type: 'note', label: 'How it works', content: 'Search uses a canonical-variant model. Each track has a canonical version; variants (acoustic, live, remix) are linked to their canonical. This prevents the original from being buried when you search for a variant.' },
      { type: 'shortcuts', items: [
        { key: '/', action: 'Focus search bar' },
        { key: 'Escape', action: 'Clear search / close results' },
        { key: 'Enter', action: 'Play focused result' },
        { key: 'Arrow Up/Down', action: 'Navigate results' },
      ]},
    ],
  },
  {
    id: 'queue-management',
    icon: '📋',
    title: 'Queue Management',
    content: [
      { type: 'body', content: 'The queue shows upcoming tracks. Open it with the Queue button (or press Q). The current track is highlighted. You can reorder, remove, or play any track in the queue.' },
      { type: 'list', items: [
        'Current track: highlighted with pulse indicator',
        'Click any track: jumps to that track immediately',
        'Drag to reorder: (drag handle on hover) — changes playback order',
        'Remove button (×): removes track from queue',
        'Clear queue: removes all tracks after current',
        'Shuffle mode affects queue order: Off = static, Smart = dynamic reorder, Random = seeded shuffle',
      ]},
      { type: 'note', label: 'Smart Shuffle', content: 'With Smart Shuffle enabled, the queue reorders dynamically based on context (time, mood, language, history). Manual reorder is respected until the next context change triggers a re-sort.' },
    ],
  },
  {
    id: 'playlists',
    icon: '📁',
    title: 'Playlists',
    content: [
      { type: 'body', content: 'NightLight supports two types of playlists: native NightLight playlists (created within the app) and imported playlists (from Spotify, Apple Music, YouTube Music).' },
      { type: 'body', content: 'Creating a NightLight playlist: open the queue or library, select tracks, choose "Save as Playlist", name it. The playlist appears in your library.' },
      { type: 'body', content: 'Importing a playlist: open the Import flow (from menu), paste a Spotify / Apple Music / YouTube Music playlist URL. NightLight reads the track list, matches available tracks, shows a summary (X matched, Y unavailable), and creates a NightLight playlist with matched tracks.' },
      { type: 'list', items: [
        'Native playlists: fully editable, reorderable, deletable',
        'Imported playlists: match rate shown, unmatched tracks listed',
        'Import creates a new NightLight playlist — original unchanged',
        'Playlist tracks play in order (or per shuffle mode)',
        'Share playlist: generates a nightlight.app link (future feature)',
      ]},
      { type: 'note', label: 'Import limitations', content: 'Import matches by track title and artist name. Variations in metadata (featuring artists, remaster labels, punctuation) may reduce match rates. Unavailable tracks are shown so you know what\'s missing.' },
    ],
  },
  {
    id: 'playback-controls',
    icon: '⏯️',
    title: 'Playback Controls',
    content: [
      { type: 'body', content: 'All playback controls are available via mouse/touch and keyboard.' },
      { type: 'shortcuts', items: [
        { key: 'Space', action: 'Play / Pause' },
        { key: 'Enter', action: 'Play selected track' },
        { key: 'N', action: 'Next track' },
        { key: 'P', action: 'Previous track' },
        { key: 'Arrow Left', action: 'Seek backward 10s' },
        { key: 'Arrow Right', action: 'Seek forward 10s' },
        { key: 'Shift + Arrow Left', action: 'Seek backward 30s' },
        { key: 'Shift + Arrow Right', action: 'Seek forward 30s' },
        { key: 'Arrow Up', action: 'Volume up' },
        { key: 'Arrow Down', action: 'Volume down' },
        { key: 'M', action: 'Mute / Unmute' },
        { key: 'R', action: 'Cycle repeat: Off → One → All' },
        { key: 'S', action: 'Cycle shuffle: Off → Smart → Random' },
      ]},
      { type: 'list', items: [
        'Repeat One: repeats the current track indefinitely',
        'Repeat All: repeats the entire queue/playlist',
        'Seek bar: click anywhere to jump; drag for fine control',
        'Volume: remembers last setting per session',
        'Gapless playback: enabled by default for consecutive tracks',
      ]},
    ],
  },
  {
    id: 'keyboard-shortcuts',
    icon: '⌨️',
    title: 'Keyboard Shortcuts Reference',
    content: [
      { type: 'body', content: 'Complete shortcut reference. Press ? in the player to see this overlay.' },
      { type: 'shortcuts', items: [
        { key: 'Space', action: 'Play / Pause' },
        { key: 'Enter', action: 'Play focused track' },
        { key: 'N', action: 'Next track' },
        { key: 'P', action: 'Previous track' },
        { key: 'Arrow Left', action: 'Seek -10s' },
        { key: 'Arrow Right', action: 'Seek +10s' },
        { key: 'Shift+←', action: 'Seek -30s' },
        { key: 'Shift+→', action: 'Seek +30s' },
        { key: 'Arrow Up', action: 'Volume up' },
        { key: 'Arrow Down', action: 'Volume down' },
        { key: 'M', action: 'Mute toggle' },
        { key: 'L', action: 'Lyrics toggle' },
        { key: 'Q', action: 'Queue toggle' },
        { key: 'V', action: 'Visual mode cycle' },
        { key: 'S', action: 'Shuffle mode cycle' },
        { key: 'R', action: 'Repeat mode cycle' },
        { key: '/', action: 'Focus search' },
        { key: 'Escape', action: 'Close modal / clear search' },
        { key: '?', action: 'Show shortcut reference' },
      ]},
      { type: 'note', label: 'Accessibility', content: 'All shortcuts work with screen readers. Focus management follows WAI-ARIA patterns. Reduced motion (prefers-reduced-motion) disables non-essential animations.' },
    ],
  },
  {
    id: 'settings',
    icon: '⚙️',
    title: 'Settings',
    content: [
      { type: 'body', content: 'Open Settings from the player menu (three dots). Settings persist in localStorage across sessions.' },
      { type: 'list', items: [
        'Visual Mode: Low Power / Ambient / Animation (default: Ambient)',
        'Default Shuffle: Off / Smart / Random (default: Smart)',
        'Language Preference: English / Hindi (affects search ranking & recommendations)',
        'Lyrics Auto-Show: On / Off (default: On — shows lyrics when available)',
        'Gapless Playback: On / Off (default: On)',
        'Crossfade: Off / 3s / 5s / 10s (default: Off)',
        'Volume Normalization: On / Off (default: On — EBU R128)',
        'Hardware Acceleration: On / Off (default: On — uses Web Audio API)',
        'Reduced Motion: Follows system preference (prefers-reduced-motion)',
      ]},
      { type: 'note', label: 'Note', content: 'Settings are stored locally in your browser. They do not sync across devices unless you use a future account/sync feature.' },
    ],
  },
] as const;

const TROUBLESHOOTING = [
  {
    id: 'no-audio',
    problem: 'No audio plays when I click a track',
    solution: 'Check: (1) Browser tab is not muted (right-click tab → Unmute). (2) System volume is up. (3) NightLight volume slider is not at zero. (4) Try a different track — the demo uses placeholder tracks without actual audio. (5) If using Bluetooth, ensure the device is connected and selected as output.',
  },
  {
    id: 'lyrics-not-showing',
    problem: 'Lyrics don\'t appear for a track',
    solution: 'Lyrics only appear when timestamped lyric data is available for that specific track. Not all tracks have lyric data. Press L to toggle the lyrics view — if no lyrics load, none are available for that track in the current data source.',
  },
  {
    id: 'search-not-working',
    problem: 'Search returns no results or unexpected results',
    solution: 'Try: (1) Shorter queries (artist + title only). (2) Check spelling. (3) Toggle language preference (English/Hindi) — results are ranked by language. (4) The demo uses a limited track catalog — only demo tracks are searchable.',
  },
  {
    id: 'visual-modes-not-changing',
    problem: 'Visual mode doesn\'t change when I press V',
    solution: 'Ensure the player has focus (click anywhere in the player area). If Reduced Motion is enabled in your OS settings, Animation mode may be restricted. Check Settings → Visual Mode to confirm the current mode.',
  },
  {
    id: 'playlist-import-failed',
    problem: 'Playlist import shows 0 matched tracks',
    solution: 'Verify: (1) The URL is a valid playlist URL (not a track, album, or artist URL). (2) The playlist is public or you have access. (3) Track metadata in the source playlist matches NightLight\'s catalog (title + artist). Private playlists or region-locked content may not be readable.',
  },
  {
    id: 'shared-session-sync',
    problem: 'Shared listening session is out of sync',
    solution: 'Sync relies on both devices having stable internet. Try: (1) Refresh the guest link. (2) Ensure both devices are on the same track (host controls playback). (3) Check network latency — high latency can cause drift. The host can pause/play to re-sync.',
  },
  {
    id: 'performance-issues',
    problem: 'Player is laggy, stutters, or uses high CPU',
    solution: 'Switch to Low Power visual mode (press V twice). Close other browser tabs. Disable browser extensions that may interfere. Ensure hardware acceleration is on in browser settings. On older devices, Low Power mode is recommended.',
  },
  {
    id: 'keyboard-shortcuts-not-working',
    problem: 'Keyboard shortcuts don\'t work',
    solution: 'Shortcuts require the player to be focused. Click the player area or press Tab to focus. If a modal or search is open, shortcuts may be captured by that element. Press Escape to close modals, then try again.',
  },
] as const;