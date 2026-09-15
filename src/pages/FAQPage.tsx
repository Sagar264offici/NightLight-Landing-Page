/**
 * FAQ PAGE
 * --------
 * Answers based on VERIFIED behavior in the NightLight Android repository.
 * No fabricated claims.
 */

import { Eyebrow, Headline, Body } from '../ui/typography';
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
              No marketing fluff. Just what the Android app does and doesn't do.
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

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(80px, 12vh, 140px)' }}>
            <DownloadButton>Download NightLight for Android</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>
              Didn't find your answer? <a href="/help" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Check the documentation</a> or <a href="/contact" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>contact us</a>.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}

const FAQS = [
  // GENERAL
  {
    id: 'what-is-nightlight',
    question: 'What is NightLight?',
    answer: 'NightLight is a modern Android music player. It plays audio, displays album artwork, syncs lyrics, manages playlists and favorites, and supports background playback. What makes it different is context — mood-aware shuffle, weather and time-aware recommendations, trending music, and related-song discovery are all built into the listening experience.',
  },
  {
    id: 'is-nightlight-android',
    question: 'Is NightLight an Android app?',
    answer: 'Yes. NightLight is an Android application that runs on Android 8.0 (Oreo) and above. The website you are reading is the landing page — the product is the app you install on your phone.',
  },
  {
    id: 'is-nightlight-free',
    question: 'Is NightLight free?',
    answer: 'Yes. NightLight is completely free to use — no subscription, no premium tier, no feature gating. The project is open source under the MIT license, with the code public on GitHub.',
  },
  {
    id: 'android-versions',
    question: 'What Android devices does NightLight support?',
    answer: 'NightLight supports Android 8.0 (API 26) and above, targeting Android 14 (API 34). It is built as a native Android app with standard materials and permissions, including a media playback foreground service for background playback.',
  },
  {
    id: 'do-i-need-account',
    question: 'Does NightLight require an account?',
    answer: 'No. NightLight works immediately without an account. An optional Google Sign-In is supported for convenience, but you can search, discover, favorite, and play music without logging in.',
  },
  {
    id: 'open-source',
    question: 'Is NightLight open source?',
    answer: 'Yes. NightLight is distributed under the MIT license. The full source code is publicly available on GitHub at github.com/Sagar264offici/NightLight.',
  },

  // PLAYBACK
  {
    id: 'background-playback',
    question: 'Does NightLight support background playback?',
    answer: 'Yes. NightLight runs as a MediaSessionService with a foreground service and the media playback permission. Music keeps playing when you lock your screen, switch apps, or put the phone away. ExoPlayer handles audio focus so interruption feels natural.',
  },
  {
    id: 'shuffle-modes',
    question: 'How does mood-aware shuffle work?',
    answer: 'NightLight offers three shuffle modes: Off (sequential), normal random shuffle, and Smart — the context-aware mode. Smart Shuffle uses a weighted scoring engine that blends mood, time of day, recency, seed affinity, and a discovery ratio that deliberately introduces fresh artists. The queue flows with the moment instead of jumping genres.',
  },
  {
    id: 'repeat-modes',
    question: 'Does NightLight have repeat modes?',
    answer: 'Yes. The player supports three repeat modes: Off, Repeat All (loops the queue or playlist), and Repeat One (loops the current track). Toggle them from the now-playing screen.',
  },
  {
    id: 'playlists',
    question: 'Does NightLight have playlists?',
    answer: 'Yes. You can create, rename, reorder, and delete playlists from the playlist screens and dialogs. Playlists appear across the home screen and your library, and playlist tracks play in order or per your shuffle mode.',
  },
  {
    id: 'favorites',
    question: 'Does NightLight have favorites?',
    answer: 'Yes. Save any track with a single tap on the heart. Favorites are stored locally, shown as a count on the home screen, and collected in your library.',
  },
  {
    id: 'lyrics',
    question: 'Does NightLight have lyrics?',
    answer: 'Yes. When lyrical data with timestamps is available for a track, NightLight displays time-synced lyrics in a dedicated view — the active line highlights as the song moves, and manual scrolling pauses and resumes sync.',
  },
  {
    id: 'listen-together',
    question: 'Does NightLight support shared listening?',
    answer: 'Yes. NightLight has Listen Together sessions — real-time collaborative listening with session codes and deep links. Start a session, share the code or link, and participants hear the same track in sync. In-session chat is available.',
  },

  // CONTEXT & DISCOVERY
  {
    id: 'contextual-discovery',
    question: 'How does contextual discovery work?',
    answer: 'A context engine builds an environment from time of day, weather, and mood signals. That environment drives contextual recommendations — a "For You" section on the home screen, related-song radio, and discovery ratios in shuffle that keep introducing fresh artists.',
  },
  {
    id: 'weather-time',
    question: 'How does NightLight use weather and time?',
    answer: 'NightLight maps the time of day into six time slots and reads local weather conditions (rain, snow, fog, sun, cloud) into listening hints. Recommendation headlines update dynamically, e.g. "Rainy night — soft songs." The home screen recommendations reflect your current context.',
  },
  {
    id: 'trending',
    question: 'Does NightLight have trending tracks?',
    answer: 'Yes. A dedicated Trending section on the home screen surfaces tracks that are being listened to right now across the catalog.',
  },
  {
    id: 'search',
    question: 'How does search work?',
    answer: 'Search is real-time with debounced queries and paginated results, and recent searches are stored locally for quick re-searches. Find tracks by title or artist.',
  },

  // MUSIC SOURCE
  {
    id: 'music-source',
    question: 'Where does NightLight get music information?',
    answer: 'NightLight is a player and discovery tool. It streams and searches audio through a MongoDB-backed music API and plays via ExoPlayer. Music availability depends on that source; NightLight does not itself license or host a catalog.',
  },
  {
    id: 'spotify-affiliation',
    question: 'Is NightLight affiliated with Spotify?',
    answer: 'No. NightLight is an independent, open source project. It is not affiliated with or endorsed by Spotify, YouTube Music, or any other platform.',
  },

  // TECHNICAL
  {
    id: 'technology-stack',
    question: 'What technology does NightLight use?',
    answer: 'NightLight is a native Android app written in Java. It uses ExoPlayer for playback with a 200 MB LRU stream cache, a MediaSessionService for background media, Room for local persistence, and a MongoDB-backed API for search, trending, lyrics, and related-song data.',
  },
  {
    id: 'playlist-import',
    question: 'Can I import playlists from other services?',
    answer: 'Yes. NightLight supports playlist import from services such as Spotify and YouTube, converting the track list into NightLight playlists with progress reporting during import.',
  },
  {
    id: 'google-sign-in',
    question: 'Does NightLight support signing in with Google?',
    answer: 'Yes. NightLight supports Google Sign-In via Credential Manager. It is optional — the app works fully without an account.',
  },
] as const;