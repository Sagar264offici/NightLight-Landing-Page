/**
 * ABOUT PAGE
 * ----------
 * Explains why the NightLight Android music player exists.
 * The website is the landing page; the product is the Android app.
 */

import { Eyebrow, Headline, Body } from '../ui/typography';
import { DownloadButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL, REPO_URL } from '../config/site';

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NightLight',
    description: 'Learn what NightLight is, why it exists, and what problem it aims to solve as a modern Android music player.',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'NightLight',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Android',
      url: SITE_URL,
      description: 'NightLight is a modern Android music player built around contextual discovery, mood-aware listening, and everyday playback.',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="about-title">
        <div className="page-hero__inner">
          <Reveal>
            <Eyebrow>About NightLight</Eyebrow>
            <Headline as="h1" id="about-title" size="xl">What NightLight is. And why.</Headline>
            <Body className="page-hero__lead">
              NightLight is an Android music player built around how you actually listen — context, mood, and discovery, without losing the music.
            </Body>
          </Reveal>
        </div>
      </section>

      <div className="page-content">
        {/* WHAT IS NIGHTLIGHT */}
        <article className="about-section" aria-labelledby="what-is-title">
          <Reveal>
            <Headline as="h2" id="what-is-title" size="md">What is NightLight?</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is a modern Android music player. It plays audio, shows album artwork,
              syncs lyrics, manages playlists and favorites, and keeps playing in the background
              while you use your phone.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              What makes it different is context. NightLight reads the moment — time of day,
              weather, mood signals, and your listening history — and uses that context to
              shape its recommendations and shuffle. Whether it's mood-aware shuffle, trending
              tracks, weather-aware suggestions, or related-song discovery, the app is designed
              so the music always fits where you are.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              The website you're reading is the landing page. The product is the Android app
              you install on your phone.
            </Body>
          </Reveal>
        </article>

        {/* INLINE AD */}
        <InlineAdSlot slotName="about-after-intro" />

        {/* WHY IT EXISTS */}
        <article className="about-section" aria-labelledby="why-exists-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="why-exists-title" size="md">Why NightLight exists</Headline>
            <Body style={{ marginTop: '16px' }}>
              The starting point was a simple observation: most music players are built around a
              search bar and a library, but listening is rarely a search problem. It's a context
              problem. What feels right at 2:00 am on a rainy night is not what feels right on a
              Monday morning commute.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              NightLight exists for listeners who want a player that understands the moment —
              one that surfaces the right music without making you hunt for it, and disappears
              when you just want to play a song.
            </Body>
          </Reveal>
        </article>

        {/* THE PROBLEM IT SOLVES */}
        <article className="about-section" aria-labelledby="problem-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="problem-title" size="md">The problem NightLight solves</Headline>
            <Body style={{ marginTop: '16px' }}>
              <strong>Discovery takes work.</strong> In most players, finding something new means
              digging through recommendation feeds that don't understand your real listening
              situation. NightLight's context engine surfaces music that fits the moment —
              time, weather, and mood — without you asking.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Shuffle doesn't understand mood.</strong> Random shuffle treats every track
              equally. Smart Shuffle weights tracks against your context, so the queue flows with
              you instead of against you.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Listening shouldn't be a subscription.</strong> NightLight is free and open
              source, with no premium tier hiding the good features.
            </Body>
          </Reveal>
        </article>

        {/* PRODUCT FOCUS */}
        <article className="about-section" aria-labelledby="focus-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="focus-title" size="md">What the product focuses on</Headline>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.8' }}>
              <li><strong>Contextual listening.</strong> Time-of-day slots, weather hints, and mood detection feed every recommendation.</li>
              <li><strong>Intelligent defaults.</strong> Mood-aware shuffle and contextual discovery are the norm, not an add-on.</li>
              <li><strong>Modern Android.</strong> A real background media service, notification-based controls, and smooth playback.</li>
              <li><strong>Library that respects you.</strong> Playlists, favorites, and search history live with you on your device.</li>
              <li><strong>Open source.</strong> The code is public and MIT-licensed.</li>
            </ul>
          </Reveal>
        </article>

        {/* TECHNOLOGIES */}
        <article className="about-section" aria-labelledby="tech-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="tech-title" size="md">Technology</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is a native Android application:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.8' }}>
              <li><strong>Android</strong> — Java, min SDK 26 (Android 8.0), target SDK 34 (Android 14)</li>
              <li><strong>ExoPlayer</strong> with audio focus and a 200 MB stream cache for smooth repeat plays</li>
              <li><strong>MediaSessionService</strong> for proper background and lock-screen playback</li>
              <li><strong>Room</strong> database for playlists, favorites, search history, and mood preferences</li>
              <li><strong>Context engine</strong> combining time-of-day, weather, and mood into listening recommendations</li>
              <li><strong>MongoDB-backed API</strong> for search, trending, lyrics, and related-song radio</li>
            </ul>
          </Reveal>
        </article>

        {/* WHO MAINTAINS IT */}
        <article className="about-section" aria-labelledby="maintainers-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="maintainers-title" size="md">Who builds and maintains NightLight</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is an independent, open source project. It is built publicly — the code
              lives on{' '}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)' }}>
                GitHub
              </a>{' '}
              under the MIT license, and bug reports, feature requests, and contributions are welcome.
            </Body>
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