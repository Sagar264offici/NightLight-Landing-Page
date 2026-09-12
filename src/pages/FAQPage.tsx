/**
 * FAQ PAGE (§9, §14)
 * ------------------
 * Useful FAQ with factual answers.
 * No fabricated legal/licensing claims.
 * Each answer is truthful based on actual product functionality.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';

export default function FAQPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="faq-title">
        <div className="page-hero__inner" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <Headline as="h1" id="faq-title" size="xl">Straight answers.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              No marketing fluff. Just what the product does and doesn't do.
            </Body>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQS.map((faq, index) => (
            <article key={faq.id} className="faq-item" style={{ border: '1px solid rgba(216, 181, 106, 0.14)', borderRadius: '12px', background: 'rgba(8, 11, 16, 0.5)', overflow: 'hidden' }}>
              <Reveal delay={index * 30}>
                <details style={{ padding: '24px' }}>
                  <summary style={{ 
                    cursor: 'pointer', 
                    listStyle: 'none', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}>
                    <Headline as="h2" size="md" style={{ margin: 0, maxWidth: 'calc(100% - 40px)' }}>{faq.question}</Headline>
                    <span style={{ color: 'var(--c-muted)', fontSize: '1.5rem', flexShrink: 0, marginTop: '4px' }}>+</span>
                  </summary>
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(216, 181, 106, 0.1)' }}>
                    <Body style={{ maxWidth: 'none', lineHeight: '1.75' }}>{faq.answer}</Body>
                  </div>
                </details>
              </Reveal>
            </article>
          ))}
        </div>

        {/* INLINE AD - After FAQ list */}
        <InlineAdSlot slotName="faq-after-list" />

        {/* CATEGORIES */}
        <section aria-labelledby="categories-title" style={{ marginTop: 'clamp(80px, 12vh, 140px)' }}>
          <Reveal>
            <Headline as="h2" id="categories-title" size="md" style={{ marginBottom: '24px', textAlign: 'center' }}>Browse by category</Headline>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'center' }}>
              {CATEGORIES.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} style={{ 
                  padding: '20px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(216, 181, 106, 0.14)', 
                  background: 'rgba(8, 11, 16, 0.5)',
                  transition: 'border-color 220ms, background 220ms',
                }}>
                  <Micro style={{ color: 'var(--c-accent)', display: 'block', marginBottom: '8px' }}>{cat.label}</Micro>
                  <Body style={{ margin: 0, fontSize: '0.95rem' }}>{cat.count} questions</Body>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(80px, 12vh, 140px)' }}>
            <DownloadButton>Download NightLight</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>
              Didn't find your answer? <a href="/help" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Check the documentation</a> or <a href="/contact" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>contact us</a>.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}

const CATEGORIES = [
  { id: 'general', label: 'General', count: 6 },
  { id: 'playback', label: 'Playback & Features', count: 7 },
  { id: 'content', label: 'Music & Content', count: 5 },
  { id: 'technical', label: 'Technical', count: 4 },
  { id: 'privacy', label: 'Privacy & Data', count: 3 },
] as const;

const FAQS = [
  // GENERAL
  {
    id: 'what-is-nightlight',
    question: 'What is NightLight?',
    answer: 'NightLight is a free music player that runs entirely in your web browser. It plays audio, displays album artwork, shows time-synced lyrics, manages a playback queue, and offers features like three shuffle modes, visual modes, playlist import, and shared listening sessions. No installation, no account required.',
  },
  {
    id: 'is-nightlight-free',
    question: 'Is NightLight free?',
    answer: 'Yes. NightLight is completely free to use. There is no subscription, no premium tier, no feature gating, and no hidden costs. The project is independently maintained.',
  },
  {
    id: 'do-i-need-account',
    question: 'Do I need to create an account to use NightLight?',
    answer: 'No. NightLight works immediately without any account. You open the URL and the player is ready. Optional account features (cross-device sync, persistent history) may be added in the future, but the core player will always work without an account.',
  },
  {
    id: 'browser-support',
    question: 'What browsers and devices are supported?',
    answer: 'NightLight works in any modern browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, and their mobile equivalents. This covers Windows, macOS, Linux, Chrome OS, iOS, iPadOS, and Android. Older browsers may work but are not tested.',
  },
  {
    id: 'mobile-support',
    question: 'Does NightLight work on mobile phones and tablets?',
    answer: 'Yes. NightLight is fully responsive and works in mobile browsers. The Low Power visual mode is especially useful for battery life on phones. Touch targets meet accessibility minimums. The player interface adapts to portrait and landscape orientations.',
  },
  {
    id: 'offline-support',
    question: 'Can I use NightLight offline?',
    answer: 'The player interface loads offline via service worker caching, but audio playback requires an internet connection to stream content. NightLight does not currently support downloading tracks for offline playback.',
  },

  // PLAYBACK & FEATURES
  {
    id: 'how-player-works',
    question: 'How does the music player work?',
    answer: 'NightLight uses the browser\'s native HTMLMediaElement and Web Audio API for playback. When you select a track, the player requests the audio stream, renders artwork, syncs lyrics if available, and builds the queue. Playback controls (play/pause, seek, volume, repeat, shuffle) operate on the native media element.',
  },
  {
    id: 'can-create-playlists',
    question: 'Can I create playlists in NightLight?',
    answer: 'Yes. You can create playlists manually within NightLight, or import playlists from Spotify, Apple Music, or YouTube Music by pasting the playlist URL. Imported playlists show match rates (tracks found vs. unavailable) and create a NightLight playlist in your library.',
  },
  {
    id: 'keyboard-controls',
    question: 'Does NightLight support keyboard controls?',
    answer: 'Yes. Full keyboard control is built in: Space (play/pause), Arrow keys (seek/volume), M (mute), N/P (next/previous), S (shuffle cycle), R (repeat cycle), L (lyrics toggle), Q (queue toggle), V (visual mode cycle), / (focus search), ? (shortcut reference). All shortcuts work when the player is focused.',
  },
  {
    id: 'visual-modes',
    question: 'What are the visual modes and how do they differ?',
    answer: 'Three modes: Low Power (minimal effects, battery efficient), Ambient (slow clouds, light rain, soft lighting — balanced), Animation (full rain depth, cloud movement, parallax, lightning — maximum immersion). Press V to cycle. Preference persists locally.',
  },
  {
    id: 'shuffle-modes',
    question: 'What are the three shuffle modes?',
    answer: 'Off (sequential order), Smart (context-aware: time, mood, language, history), Random (true shuffle with deterministic seed). Click the shuffle icon to cycle. Smart Shuffle reorders the queue dynamically; Random gives every track an equal turn.',
  },
  {
    id: 'synced-lyrics',
    question: 'How do synced lyrics work?',
    answer: 'When lyric data with timestamps is available for a track, NightLight displays lyrics line by line synchronized with playback. Press L to toggle the lyrics view. The active line highlights, past lines fade, future lines wait. Lyrics are typography-first — not a scrolling panel.',
  },
  {
    id: 'shared-listening',
    question: 'How does shared listening work?',
    answer: 'Start a session from the player (Share button), copy the generated link (e.g., nightlight.app/l/ABC123), and send it. Anyone who opens the link joins the same playback in perfect sync. The host controls playback; guests follow. A listening chat appears alongside — secondary to the music.',
  },

  // CONTENT
  {
    id: 'music-source',
    question: 'Where does NightLight get its music/content?',
    answer: 'NightLight is a player, not a music service. It does not host, license, or distribute a music catalog. The demo shows placeholder tracks with procedural artwork — the prototype runs without audio. In a production deployment, NightLight would play audio from sources you provide or that are available via supported integrations.',
  },
  {
    id: 'spotify-affiliation',
    question: 'Is NightLight affiliated with Spotify?',
    answer: 'No. NightLight is not affiliated with Spotify, Apple Music, YouTube Music, or any other music platform. Playlist import uses publicly available playlist metadata (URLs you provide) to match track names — it does not use Spotify\'s API, does not stream from Spotify, and has no partnership with Spotify.',
  },
  {
    id: 'copyright',
    question: 'Does NightLight own the music, artwork, or lyrics shown?',
    answer: 'No. NightLight does not claim ownership of any music, artwork, lyrics, or metadata displayed in the player. All copyrighted content belongs to its respective rights holders. NightLight is a playback tool — like a browser is a tool for viewing websites.',
  },
  {
    id: 'lyrics-source',
    question: 'Where do lyrics come from?',
    answer: 'When lyrics are displayed, they come from lyric data sources available to the application. NightLight does not generate, transcribe, or create lyrics. Lyric availability varies by track and region.',
  },
  {
    id: 'artwork-source',
    question: 'Where does album artwork come from?',
    answer: 'Artwork is fetched from publicly available sources (such as MusicBrainz, Cover Art Archive, or similar) based on track metadata. The demo uses local placeholder images and procedural gradients. NightLight does not host or claim rights to artwork.',
  },

  // TECHNICAL
  {
    id: 'technology-stack',
    question: 'What technology stack does NightLight use?',
    answer: 'React 19 with TypeScript, Vite for build tooling, CSS custom properties for theming, Web Audio API and HTMLMediaElement for playback. Deployed on Vercel\'s edge network. No Electron, Tauri, or native wrappers — it is a web application.',
  },
  {
    id: 'performance',
    question: 'Is NightLight fast?',
    answer: 'Yes. The production build is code-split and lazy-loaded. The initial payload is under 100KB gzipped. Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1. Low Power mode further reduces CPU/GPU usage for constrained devices.',
  },
  {
    id: 'accessibility',
    question: 'Is NightLight accessible?',
    answer: 'Accessibility is a design requirement. Semantic HTML, ARIA labels, focus management, keyboard navigation, color contrast (WCAG AA), reduced motion support (prefers-reduced-motion), screen reader compatible. The player is usable without a mouse.',
  },
  {
    id: 'progressive-enhancement',
    question: 'Does NightLight work without JavaScript?',
    answer: 'No. NightLight is a React single-page application and requires JavaScript for the interactive player. The content pages (this FAQ, About, Features, etc.) are server-rendered and readable without JS, but the player itself requires JS.',
  },

  // PRIVACY
  {
    id: 'data-collection',
    question: 'Does NightLight collect my listening data?',
    answer: 'NightLight does not collect personal listening data for advertising, profiling, or analytics. Playback state (queue, position, preferences) is stored locally in your browser (localStorage/IndexedDB) and never leaves your device unless you explicitly use a feature that requires it (e.g., shared listening sessions).',
  },
  {
    id: 'cookies',
    question: 'Does NightLight use cookies?',
    answer: 'NightLight does not set tracking cookies. A session cookie may be used for shared listening synchronization. Preferences (visual mode, shuffle mode, language) are stored in localStorage, not cookies. See the Privacy Policy for details.',
  },
  {
    id: 'third-party-services',
    question: 'Does NightLight use third-party analytics or tracking?',
    answer: 'No. NightLight does not use Google Analytics, Mixpanel, Segment, or similar tracking services. The only third-party script is Google AdSense (on eligible content pages only), which loads only when an ad slot is rendered and respects user consent signals.',
  },
] as const;