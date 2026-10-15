/**
 * DOWNLOAD PAGE
 * -------------
 * The one place to get the NightLight APK. Direct same-origin download, plus
 * install steps, release facts, and reinstall help. Schema: SoftwareApplication
 * with a real downloadUrl so search engines understand this is the installer.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';
import {
  SITE_URL,
  REPO_URL,
  APK_VERSION,
  APK_FILE_SIZE,
  APK_MIN_ANDROID,
  DIRECT_APK_URL,
} from '../config/site';

const STEPS = [
  {
    title: 'Tap download',
    body: 'Press the download button below on your Android phone. The release APK downloads straight from this site — no accounts, no third-party stores, no redirects.',
  },
  {
    title: 'Open the APK file',
    body: 'When the download finishes, open it from your notification shade or your Downloads folder. Android asks once to allow installs from that app — approve it to continue.',
  },
  {
    title: 'Confirm install',
    body: 'Tap Install on the system prompt. NightLight installs in seconds and appears in your app drawer, ready to open.',
  },
  {
    title: 'Open and listen',
    body: 'Open NightLight and the home screen greets you with Recently Played, For You recommendations, Trending, Playlists, and Favorites. No sign-up needed.',
  },
] as const;

export default function DownloadPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NightLight',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Player',
    operatingSystem: 'Android',
    url: `${SITE_URL}/download`,
    downloadUrl: `${SITE_URL}${DIRECT_APK_URL}`,
    softwareVersion: APK_VERSION,
    inLanguage: 'en',
    description:
      'Download the free NightLight APK for Android — a modern music player with mood-aware shuffle, contextual discovery, trending tracks, playlists, favorites, synced lyrics, and background playback.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    sameAs: [REPO_URL],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="download-title">
        <div className="page-hero__inner">
          <Reveal>
            <Eyebrow>Free · {APK_MIN_ANDROID} · v{APK_VERSION}</Eyebrow>
            <Headline as="h1" id="download-title" size="xl">Download NightLight for Android.</Headline>
            <Body className="page-hero__lead">
              The official release APK, served directly from this site. Free
              forever, open source, no account needed — install in under a minute.
            </Body>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                justifyContent: 'center',
                marginTop: '36px',
              }}
            >
              <DownloadButton>⬇ Download APK · {APK_FILE_SIZE}</DownloadButton>
            </div>
            <Micro style={{ marginTop: '18px', display: 'block' }}>
              Version {APK_VERSION} · {APK_FILE_SIZE} · {APK_MIN_ANDROID} · Free &amp; open source
            </Micro>
          </Reveal>
        </div>
      </section>

      <div className="page-content">
        <article aria-labelledby="install-title">
          <Reveal>
            <Headline as="h2" id="install-title" size="lg" style={{ marginBottom: '24px', textAlign: 'center' }}>
              Install in four steps.
            </Headline>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '16px' }}>
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '20px',
                    padding: '20px 22px',
                    borderRadius: '14px',
                    border: '1px solid rgba(216, 181, 106, 0.14)',
                    background: 'rgba(8, 11, 16, 0.5)',
                    alignItems: 'start',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                      fontWeight: 700,
                      color: 'rgba(216, 181, 106, 0.25)',
                      lineHeight: 1,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <Headline as="h3" size="md" style={{ marginBottom: '8px' }}>{step.title}</Headline>
                    <Body style={{ maxWidth: 'none' }}>{step.body}</Body>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </article>

        <InlineAdSlot slotName="download-after-steps" />

        <article aria-labelledby="facts-title" style={{ marginTop: 'clamp(56px, 9vh, 88px)' }}>
          <Reveal>
            <Headline as="h2" id="facts-title" size="lg" style={{ marginBottom: '20px', textAlign: 'center' }}>
              Release facts.
            </Headline>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              {[
                { k: 'Version', v: `v${APK_VERSION} (release)` },
                { k: 'File size', v: APK_FILE_SIZE },
                { k: 'Requires', v: APK_MIN_ANDROID },
                { k: 'Price', v: 'Free, no premium tier' },
                { k: 'Source', v: 'Official build from this site' },
                { k: 'License', v: 'MIT open source on GitHub' },
              ].map((fact) => (
                <div
                  key={fact.k}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(216, 181, 106, 0.14)',
                    background: 'rgba(8, 11, 16, 0.5)',
                  }}
                >
                  <Micro style={{ color: 'var(--c-accent)', marginBottom: '6px', display: 'block' }}>{fact.k}</Micro>
                  <Body style={{ maxWidth: 'none', margin: 0 }}>{fact.v}</Body>
                </div>
              ))}
            </div>
          </Reveal>
        </article>

        <article aria-labelledby="safe-title" style={{ marginTop: 'clamp(56px, 9vh, 88px)' }}>
          <Reveal>
            <Headline as="h2" id="safe-title" size="lg" style={{ marginBottom: '14px' }}>Safe to install.</Headline>
            <Body style={{ maxWidth: 'none', lineHeight: 1.75 }}>
              This APK is the official NightLight release build — published here,
              unmodified, and bundled with nothing else. When Android warns about
              installing from your browser, that is the standard one-time prompt
              for direct APK installs, not a problem with this file. Your
              playlists, favorites, and history stay on your device, and the app
              collects no analytics. If anything misbehaves after installing, the{' '}
              <a href="/help" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Help page</a>{' '}
              walks through every common fix, and the{' '}
              <a href="/faq" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>FAQ</a>{' '}
              answers pre-install questions in seconds.
            </Body>
          </Reveal>
        </article>

        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(64px, 10vh, 110px)' }}>
            <DownloadButton>⬇ Download NightLight APK</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>
              v{APK_VERSION} · {APK_FILE_SIZE} · {APK_MIN_ANDROID}
            </p>
            <p style={{ marginTop: '20px' }}>
              <SecondaryButton href="/how-it-works">How it works →</SecondaryButton>
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
