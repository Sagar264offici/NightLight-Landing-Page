/**
 * FEATURES PAGE
 * -------------
 * Based on VERIFIED functionality from the NightLight Android repository.
 * For each feature: name, what it does, why it matters, how the user experiences it.
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
    description: 'Complete list of NightLight Android music player features with descriptions and usage guidance.',
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
        <div className="page-hero__inner page-hero__inner--wide">
          <Reveal>
            <Eyebrow>Android Music Player Features</Eyebrow>
            <Headline as="h1" id="features-title" size="xl">Every feature. For a reason.</Headline>
            <Body className="page-hero__lead">
              No feature checkboxes. No bloat. Each capability exists because it improves the listening experience.
            </Body>
          </Reveal>
        </div>
      </section>

      <div className="page-content page-content--wide">
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
                  <strong>Why it matters:</strong> {feature.benefit}
                </Body>

                <div style={{ padding: '16px 20px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '12px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                  <Micro style={{ marginBottom: '8px', display: 'block' }}>How you experience it:</Micro>
                  <Body style={{ maxWidth: 'none', margin: 0, fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}>{feature.howToUse}</Body>
                </div>
              </div>
            </Reveal>
          </article>
        ))}

        {/* INLINE AD - After feature list */}
        <InlineAdSlot slotName="features-after-list" />

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(80px, 12vh, 140px)' }}>
            <DownloadButton>Download NightLight for Android</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>NightLight runs on Android 8.0 and above.</p>
          </div>
        </Reveal>
      </div>
    </>
  );
}

/**
 * Features — every entry VERIFIED against the NightLight Android repository.
 */
const FEATURES = [
  {
    id: 'mood-shuffle',
    icon: '🧠',
    name: 'Mood-Aware Smart Shuffle',
    category: 'Playback Intelligence',
    description: 'The Smart Shuffle engine scores every track against your listening context using weighted random selection — mood blending, seed affinity, discovery ratio, and anti-repetition. It builds a queue that flows with the moment instead of jumping genres. Shuffle modes: Off, normal, and Smart (context-aware).',
    benefit: 'Discovering and listening feel personal. The queue always fits the mood, the moment, and how much you\'ve already heard a song.',
    howToUse: 'Open the player, tap the shuffle icon to cycle modes, and choose Smart for the context-aware experience.',
  },
  {
    id: 'contextual-discovery',
    icon: '🌙',
    name: 'Contextual Discovery',
    category: 'Discovery',
    description: 'A context engine builds an environment from time of day, weather, and mood signals — then surfaces music that fits that environment. Related-song radio and discovery ratios deliberately introduce fresh artists so the listening experience breathes.',
    benefit: 'Instead of a static library, NightLight gives you a listening experience that responds to where you are and how you feel.',
    howToUse: 'Check the "For You" section on the home screen — it changes with your context. Use related-song radio for related discoveries.',
  },
  {
    id: 'trending',
    icon: '📈',
    name: 'Trending Tracks',
    category: 'Discovery',
    description: 'A dedicated trending section on the home screen surfaces what\'s being listened to across the catalog right now. Tap a trending track and it plays immediately.',
    benefit: 'You always have a fresh pool of music to explore without hunting for something new.',
    howToUse: 'Open the home screen and scroll to the Trending section. Tap any track to play.',
  },
  {
    id: 'weather-time',
    icon: '🌧️',
    name: 'Time + Weather Recommendations',
    category: 'Context',
    description: 'NightLight maps the time of day into six time slots and reads the local weather — rain, snow, sun, fog, cloud — into listening hints. Headlines change dynamically, like "Rainy night — soft songs."',
    benefit: 'The app understands the atmosphere around you and matches the music to it — a simple, human touch most players don\'t have.',
    howToUse: 'Just open the app. The recommendation headline and For You section reflect current time and weather automatically.',
  },
  {
    id: 'playlists',
    icon: '📁',
    name: 'Playlists',
    category: 'Library',
    description: 'Full playlist support: create, rename, edit, reorder, and delete playlists from the dedicated playlist screens and dialogs. Playlists appear across the home screen and your library.',
    benefit: 'Curate your listening your way, and always come back to the mixes you\'ve built.',
    howToUse: 'Open the Library, start a new playlist, name it, and add tracks from any track menu.',
  },
  {
    id: 'favorites',
    icon: '❤️',
    name: 'Favorites',
    category: 'Library',
    description: 'Save tracks you love with a single tap. Favorites are stored locally with a like/unlike toggle and a count shown on the home screen.',
    benefit: 'Your personal collection is one tap away, and it persists across sessions.',
    howToUse: 'Tap the heart on any track or in the player to like it. Find favorites in your Library.',
  },
  {
    id: 'background-playback',
    icon: '🎵',
    name: 'Background Playback',
    category: 'Playback',
    description: 'NightLight runs as a proper Android MediaSessionService with a foreground service and media playback permission. ExoPlayer handles audio focus. Music keeps playing when you lock the screen, switch apps, or put the phone away.',
    benefit: 'Listening is continuous — through locks, app switches, drives, and long sessions.',
    howToUse: 'Press play, then lock your screen. Playback continues via your notification controls.',
  },
  {
    id: 'synced-lyrics',
    icon: '📝',
    name: 'Time-Synced Lyrics',
    category: 'Lyrics',
    description: 'A dedicated lyrics activity displays synchronized lyrics with auto-scroll, an active line highlight, and manual scroll that pauses and resumes sync. Lyrics load when available for a track.',
    benefit: 'Sing along without losing your place. The words move with the song, not against it.',
    howToUse: 'From the player, open the lyrics view. Tap a word or line to pause auto-scroll; tap again to resume.',
  },
  {
    id: 'search',
    icon: '🔍',
    name: 'Smart Search',
    category: 'Discovery',
    description: 'Real-time search with debounced queries, paginated results, and search history stored in a local database. Find tracks by title or artist as you type.',
    benefit: 'Finding a track is fast and repeatable — and your recent searches are always close by.',
    howToUse: 'Open the search field on the home screen and start typing. Tap a history term to re-run a search.',
  },
  {
    id: 'listen-together',
    icon: '🔗',
    name: 'Listen Together',
    category: 'Social',
    description: 'Real-time collaborative listening sessions with session codes and deep links. Start a session, share the code or link, and everyone in the session hears the same track in sync. In-session chat keeps the conversation close to the music.',
    benefit: 'Share a listening moment with friends as it happens — the music stays the center of the experience.',
    howToUse: 'From the player, use the share/listen-together action to start a session, then share the session code or link.',
  },
] as const;