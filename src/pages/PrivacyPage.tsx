/**
 * PRIVACY POLICY (§22)
 * ---------------------
 * Accurate privacy policy describing actual data practices.
 * No copied templates — only what NightLight actually does.
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

  const lastUpdated = 'September 12, 2026';

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
              NightLight is a browser-based music player. We do not collect personal listening data, build advertising profiles, or sell your information. The only data stored is what you explicitly provide (preferences, playlists) and it stays in your browser unless you use a feature that requires sharing (like shared listening sessions).
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="data-collected-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="data-collected-title" size="md">Data stored in your browser</Headline>
            <Body style={{ marginTop: '16px' }}>The following data is stored locally in your browser (localStorage/IndexedDB) and never transmitted to our servers:</Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>Playback preferences:</strong> Visual mode, default shuffle mode, language preference, lyrics auto-show, gapless playback, crossfade, volume normalization, hardware acceleration.</li>
              <li><strong>Playback state:</strong> Current queue, playback position, volume level, repeat mode — for session restoration.</li>
              <li><strong>Library data:</strong> Native playlists you create, imported playlist metadata (track names, match status), recently played tracks (for history).</li>
              <li><strong>Search history:</strong> Recent queries (last 10) for quick access.</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              You can clear all local data at any time by clearing browser storage for nightlightmusic.vercel.app, or by using the "Reset All Data" option in Settings (when available).
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="shared-listening-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="shared-listening-title" size="md">Shared listening sessions</Headline>
            <Body style={{ marginTop: '16px' }}>
              When you start a shared listening session, a session ID is generated and a WebRTC connection (or WebSocket relay) is established between participants. The following data is shared during the session:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li>Playback state: current track, timestamp, play/pause status (for synchronization)</li>
              <li>Chat messages: text messages sent in the listening chat</li>
              <li>Session metadata: host/guest role, connection status</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              This data exists only for the duration of the session. It is not logged, stored, or analyzed after the session ends. No participant identity is collected — sessions are anonymous by default.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="third-party-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="third-party-title" size="md">Third-party services</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight uses the following third-party services:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>Vercel (hosting):</strong> Logs standard HTTP access data (IP, timestamp, requested path, user agent) for security and performance monitoring. We do not access or use this data for analytics.</li>
              <li><strong>Google AdSense (on content pages only):</strong> Displays advertisements on eligible content pages (/, /about, /features, /how-it-works, /faq, /help). AdSense may use cookies and collect data per Google\'s privacy policy. We do not control AdSense\'s data collection. Ads are NOT shown on application routes (player, search, library, settings, auth).</li>
              <li><strong>Google Fonts (Space Grotesk):</strong> Loaded via Google Fonts API. Google\'s privacy policy applies.</li>
              <li><strong>Cover art sources:</strong> Album artwork is fetched from public sources (MusicBrainz, Cover Art Archive) based on track metadata. These requests include the track/artist name but not your identity.</li>
            </ul>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="analytics-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="analytics-title" size="md">Analytics and tracking</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight does not use Google Analytics, Mixpanel, Segment, Amplitude, or any similar analytics/tracking service. We do not track page views, events, funnels, or user behavior. The only metrics we have are aggregate server logs from Vercel (request counts, error rates, bandwidth) which contain no personal identifiers.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="cookies-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="cookies-title" size="md">Cookies</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight does not set first-party cookies for tracking or analytics. The following cookies may be set:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>Session cookie (shared listening):</strong> Temporary cookie for WebSocket session affinity during a shared listening session. Expires when the session ends.</li>
              <li><strong>Google AdSense cookies:</strong> On ad-eligible content pages, AdSense may set cookies per Google\'s policy. These are third-party cookies controlled by Google.</li>
              <li><strong>Vercel cookies:</strong> Vercel may set infrastructure cookies for load balancing and security.</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              All preferences and state are stored in localStorage/IndexedDB, not cookies.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="rights-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="rights-title" size="md">Your rights</Headline>
            <Body style={{ marginTop: '16px' }}>
              Since NightLight stores data locally in your browser, you have full control:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>Access:</strong> Open browser dev tools → Application → Local Storage / IndexedDB to view all stored data.</li>
              <li><strong>Deletion:</strong> Clear site data in browser settings, or use the in-app reset (when available).</li>
              <li><strong>Portability:</strong> Export localStorage/IndexedDB data via browser tools.</li>
              <li><strong>Objection:</strong> Disable JavaScript or block third-party scripts to prevent AdSense loading.</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              If you are in a jurisdiction with specific data protection rights (GDPR, CCPA, etc.), the above mechanisms satisfy access, deletion, and portability requirements because the data never leaves your device (except for shared listening sessions, which are ephemeral and anonymous).
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