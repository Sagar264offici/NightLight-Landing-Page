/**
 * FAQ PAGE
 * --------
 * Short answers to the questions people actually ask before installing.
 * Schema: FAQPage so Google can show rich results.
 */

import { Eyebrow, Headline, Body } from '../ui/typography';
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';

const FAQS = [
  {
    q: 'Is NightLight an Android app?',
    a: 'Yes. NightLight is a native Android music player. This website is the landing page — the product is the Android app you install on your phone from the Download page.',
  },
  {
    q: 'Is NightLight free?',
    a: 'Yes, completely free. No subscription, no premium tier, no hidden costs. The project is open source under the MIT license, and every feature works without paying.',
  },
  {
    q: 'Where do I download the NightLight APK?',
    a: 'From the Download page on this site. Tap the download button to get the release APK directly, then open the file on your phone to install. NightLight runs on Android 8.0 (Oreo) and above.',
  },
  {
    q: 'Is it safe to install the APK directly?',
    a: 'Yes. The APK is the official release build published on this site — it is not modified, repackaged, or bundled with anything else. Your phone will ask you to allow "Install unknown apps" for your browser once; that is the standard Android flow for direct APK installs.',
  },
  {
    q: 'Does NightLight support background playback?',
    a: 'Yes. NightLight runs as a proper Android background media service with a media notification, so music keeps playing when you lock your screen, switch apps, or put the phone away.',
  },
  {
    q: 'Does NightLight have lyrics?',
    a: 'Yes. When lyrics are available for a track, they appear in a dedicated time-synced view — one line at a time, with the active line highlighted as the song moves. Scrolling manually pauses the auto-sync until you resume it.',
  },
  {
    q: 'How does mood-aware shuffle work?',
    a: 'Smart Shuffle scores every track against your listening context — mood signals, time of day, recency, seed affinity, and a discovery ratio that introduces fresh artists — then builds a queue that flows with the moment. The player also offers Off (sequential) and normal shuffle modes.',
  },
  {
    q: 'Can I create playlists and save favorites?',
    a: 'Yes. Create, rename, reorder, and delete playlists from the Library, and save any track to favorites with one tap. Playlists and favorites are stored locally on your device and appear on the home screen.',
  },
  {
    q: 'Do I need an account to use NightLight?',
    a: 'No. Every core feature works without registration. Google Sign-In is available as an optional convenience, but playback, discovery, playlists, and favorites never require it.',
  },
  {
    q: 'What Android versions are supported?',
    a: 'Android 8.0 (Oreo, API 26) and newer, up to the latest Android 14+ releases. If your phone runs Android 8 or above, NightLight installs and runs.',
  },
  {
    q: 'Does NightLight collect my data?',
    a: 'No. Playlists, favorites, search history, and preferences stay on your device. The app has no third-party analytics or tracking SDKs. Read the Privacy Policy for the full details, including how Listen Together sessions work.',
  },
  {
    q: 'What is Listen Together?',
    a: 'Real-time collaborative listening. Start a session from the player, share the session code or link with friends, and everyone hears the same track in sync. In-session chat keeps the conversation next to the music.',
  },
] as const;

export default function FaqPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'NightLight FAQ',
    description:
      'Frequently asked questions about the NightLight Android music player.',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="faq-title">
        <div className="page-hero__inner">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <Headline as="h1" id="faq-title" size="xl">Questions, answered.</Headline>
            <Body className="page-hero__lead">
              Everything people ask before installing NightLight — the free
              Android music player with mood-aware shuffle, contextual
              discovery, lyrics, and background playback. Still stuck? The{' '}
              <a href="/help" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Help page</a>{' '}
              covers troubleshooting, and the{' '}
              <a href="/contact" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Contact page</a>{' '}
              explains how to reach us.
            </Body>
          </Reveal>
        </div>
      </section>

      <div className="page-content">
        <div style={{ display: 'grid', gap: '14px' }}>
          {FAQS.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index * 40, 200)}>
              <details
                className="faq-item"
                style={{
                  padding: '20px 22px',
                  borderRadius: '12px',
                  border: '1px solid rgba(216, 181, 106, 0.14)',
                  background: 'rgba(8, 11, 16, 0.5)',
                }}
              >
                <summary style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <Headline as="h2" size="md" style={{ margin: 0, fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)' }}>{item.q}</Headline>
                  <span style={{ color: 'var(--c-muted)', fontSize: '1.2rem', flexShrink: 0 }} aria-hidden="true">+</span>
                </summary>
                <Body style={{ marginTop: '12px', maxWidth: 'none' }}>{item.a}</Body>
              </details>
            </Reveal>
          ))}
        </div>

        <InlineAdSlot slotName="faq-after-list" />

        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(64px, 10vh, 110px)' }}>
            <Headline as="h2" size="lg" style={{ marginBottom: '20px' }}>Ready to listen?</Headline>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <DownloadButton>Download NightLight for Android</DownloadButton>
              <SecondaryButton href="/download">Go to download page →</SecondaryButton>
            </div>
            <p className="micro" style={{ marginTop: '16px' }}>Free · Android 8.0+ · No account needed</p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
