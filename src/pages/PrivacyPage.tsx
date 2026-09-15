/**
 * PRIVACY POLICY
 * ---------------
 * Accurate privacy policy describing actual data practices for the Android app.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import Reveal from '../ui/Reveal';

export default function PrivacyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'NightLight\'s privacy policy explaining what data is collected, how it\'s used, and your rights.',
  };

  const lastUpdated = 'September 15, 2026';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="privacy-title">
        <div className="page-hero__inner" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>Privacy Policy</Eyebrow>
            <Headline as="h1" id="privacy-title" size="xl">Your privacy. Respected.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              NightLight collects minimal data. No tracking, no profiling, no surprises.
            </Body>
            <Micro style={{ marginTop: '16px', display: 'block' }}>Last updated: {lastUpdated}</Micro>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
        <article className="policy-section" aria-labelledby="summary-title">
          <Reveal>
            <Headline as="h2" id="summary-title" size="md">Summary</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is an Android music player. We do not collect personal listening data, build advertising profiles within the app, or sell your information. Preference, playlist, favorites, and search-history data is stored on your device. Where features share data (such as Listen Together sessions), that data is scoped to the session and ephemeral.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="data-collected-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="data-collected-title" size="md">Data stored on your device</Headline>
            <Body style={{ marginTop: '16px' }}>The following data is stored locally on your Android device and is not transmitted to our servers:</Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>Playback preferences:</strong> Shuffle and repeat modes, visual settings, mood preferences.</li>
              <li><strong>Playback state:</strong> Current queue, playback position, volume level — for session restoration.</li>
              <li><strong>Library data:</strong> Playlists you create, favorites you save, recently played tracks.</li>
              <li><strong>Search history:</strong> Recent queries stored locally for quick access.</li>
            </ul>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="shared-listening-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="shared-listening-title" size="md">Listen Together sessions</Headline>
            <Body style={{ marginTop: '16px' }}>
              When you start a Listen Together session, a session code is generated and participants connect in real time to keep playback in sync. The following data is shared during the session:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li>Playback state: current track, timestamp, play/pause status (for synchronization)</li>
              <li>Chat messages: text messages sent in the session chat</li>
              <li>Session metadata: host/guest role, connection status</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              This data exists only for the duration of the session and is not logged, stored, or analyzed after the session ends.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="third-party-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="third-party-title" size="md">Third-party services</Headline>
            <Body style={{ marginTop: '16px' }}>
              The NightLight Android app uses the following third-party services:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>Music API:</strong> NightLight searches, streams, and fetches lyrics and trending data through a MongoDB-backed music API. Queries include the terms and track metadata you request.</li>
              <li><strong>Google Sign-In:</strong> Optional sign-in via Credential Manager/Firebase auth bridging. Only used when you choose to sign in.</li>
              <li><strong>Playlist import:</strong> When you import a playlist from services like Spotify or YouTube, NightLight accesses the public playlist metadata you provide.</li>
            </ul>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="analytics-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="analytics-title" size="md">Analytics and tracking</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight does not use third-party analytics, advertising, or tracking SDKs inside the Android app. There are no tracking cookies, no advertising identifiers, and no usage profiling. Your listening behavior stays on your device.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="rights-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="rights-title" size="md">Your rights</Headline>
            <Body style={{ marginTop: '16px' }}>
              Because NightLight stores your library, preferences, favorites, and search history locally on your device, you have full control:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>Access:</strong> View your playlists, favorites, and history inside the app or your device's app data.</li>
              <li><strong>Deletion:</strong> Remove playlists, favorites, and search history inside the app, or clear the app's data in Android settings.</li>
              <li><strong>Portability:</strong> Your library data lives in local storage on your device.</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              If you are in a jurisdiction with specific data protection rights (GDPR, CCPA, etc.), the above mechanisms satisfy access, deletion, and portability requirements because your personal data stays on your device.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="children-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="children-title" size="md">Children's privacy</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information, contact us and we will delete it.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="changes-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="changes-title" size="md">Changes to this policy</Headline>
            <Body style={{ marginTop: '16px' }}>
              We may update this policy as the product evolves. Material changes will be noted with a new "Last updated" date. Continued use of NightLight after changes constitutes acceptance.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="contact-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="contact-title" size="md">Contact</Headline>
            <Body style={{ marginTop: '16px' }}>
              For privacy questions or requests, use the contact information in the footer or visit the <a href="/contact" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Contact page</a>.
            </Body>
          </Reveal>
        </article>
      </main>
    </>
  );
}