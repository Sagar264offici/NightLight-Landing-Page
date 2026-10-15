/**
 * HELP PAGE
 * ---------
 * Guides + troubleshooting for installing and using NightLight.
 * Schema: TechArticle (page-specific; site-wide WebSite/Organization live in <head>).
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL } from '../config/site';

const GUIDES = [
  {
    id: 'install-apk',
    title: 'Install the APK on your phone',
    body: 'Open the Download page on your Android phone and tap the download button to get the release APK. When the download finishes, open the file from your notification shade or Downloads folder. Android will ask you to allow installs from that app once — approve it, then confirm install. The whole process takes under a minute on a normal connection.',
    points: [
      'Requires Android 8.0 (Oreo) or newer — check in Settings → About phone.',
      'If the install button is greyed out, free up a little storage and retry.',
      'After installing, you can delete the APK file — the app stays installed.',
    ],
  },
  {
    id: 'playback-stops',
    title: 'Music stops when the screen locks',
    body: 'NightLight is built for background playback, so if audio stops when you leave the app, Android battery optimization is almost always the cause. Open Settings → Apps → NightLight → Battery and set it to Unrestricted, then lock the screen and press play from the media notification to confirm it keeps going.',
    points: [
      'Keep the media notification visible — swiping it away can stop playback.',
      'On Xiaomi, Oppo, Vivo, and Huawei phones also enable Autostart for NightLight.',
      'If Bluetooth stutters, unpair and re-pair the device before retrying.',
    ],
  },
  {
    id: 'no-sound',
    title: 'No sound or track will not play',
    body: 'First check the obvious: media volume up, phone not on silent, and headphones or speaker connected. Then force-stop NightLight once and reopen it. If a single track fails while others play, it is a problem with that track source — skip it and report it via the Contact page with the track title and artist.',
    points: [
      'Toggle between Wi-Fi and mobile data to rule out a network block.',
      'Clear the app cache (Settings → Apps → NightLight → Storage) — your playlists stay intact.',
      'Make sure one app has audio focus; pause YouTube or other players first.',
    ],
  },
  {
    id: 'playlists-favorites',
    title: 'Playlists, favorites, and search history',
    body: 'Everything in your library lives on your device. Create a playlist from the Library screen, add tracks from any track menu, and reorder from the playlist view. Tap the heart on any track to save it to favorites. Search history is stored locally too — tap a history term to re-run a search instantly.',
    points: [
      'Deleted a playlist by accident? It cannot be recovered — there is no cloud copy.',
      'Switching phones? Rebuild playlists manually; there is no sync account.',
      'Clearing app data erases playlists, favorites, and history permanently.',
    ],
  },
  {
    id: 'lyrics',
    title: 'Lyrics not showing or out of sync',
    body: 'Lyrics appear only when they are available for a track — open the lyrics view from the player to check. If the words lag behind the song, close and reopen the lyrics view to re-sync. Scrolling manually pauses auto-scroll on purpose; tap the resume control to follow along again.',
    points: [
      'Instrumental or rare tracks often have no lyrics — that is expected.',
      'A poor connection can delay lyric loading; retry on Wi-Fi.',
      'If lyrics are wrong for a track, report it with title and artist.',
    ],
  },
  {
    id: 'shuffle',
    title: 'Shuffle and repeat modes',
    body: 'The player has three shuffle modes — Off (plays in order), normal shuffle, and Smart (context-aware) — plus three repeat modes: Off, Repeat All, and Repeat One. Toggle them from the now-playing screen. If Smart Shuffle feels repetitive, play and like more tracks so the engine has richer history to score against.',
    points: [
      'Off is best for albums; Smart is best for discovery sessions.',
      'Repeat One loops the current track until you change it.',
      'Mode indicators in the player always show the active setting.',
    ],
  },
] as const;

export default function HelpPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'NightLight Help & Troubleshooting',
    description:
      'Guides for installing the NightLight APK and fixing common playback, playlist, lyrics, and shuffle issues.',
    url: `${SITE_URL}/help`,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: 'NightLight', url: `${SITE_URL}/` },
    about: { '@type': 'SoftwareApplication', name: 'NightLight', operatingSystem: 'Android' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="help-title">
        <div className="page-hero__inner">
          <Reveal>
            <Eyebrow>Help</Eyebrow>
            <Headline as="h1" id="help-title" size="xl">Fix it in minutes.</Headline>
            <Body className="page-hero__lead">
              Install guides and troubleshooting for the NightLight Android
              music player. If your answer is short, try the{' '}
              <a href="/faq" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>FAQ</a>{' '}
              first — this page goes deeper.
            </Body>
          </Reveal>
        </div>
      </section>

      <div className="page-content">
        {GUIDES.map((guide, index) => (
          <article
            key={guide.id}
            id={guide.id}
            style={{
              marginTop: index === 0 ? 0 : 'clamp(56px, 9vh, 88px)',
              paddingBottom: 'clamp(40px, 7vh, 72px)',
              borderBottom: index < GUIDES.length - 1 ? '1px solid rgba(216, 181, 106, 0.1)' : 'none',
            }}
          >
            <Reveal delay={Math.min(index * 60, 200)}>
              <Headline as="h2" size="lg" style={{ marginBottom: '14px' }}>{guide.title}</Headline>
              <Body style={{ maxWidth: 'none', lineHeight: 1.75 }}>{guide.body}</Body>
              <div style={{ marginTop: '18px', padding: '18px 20px', background: 'rgba(8, 11, 16, 0.5)', borderRadius: '12px', border: '1px solid rgba(216, 181, 106, 0.14)' }}>
                <Micro style={{ color: 'var(--c-accent)', marginBottom: '10px', display: 'block' }}>Checklist</Micro>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.9, color: 'var(--c-text-2)' }}>
                  {guide.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </article>
        ))}

        <InlineAdSlot slotName="help-after-guides" />

        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(64px, 10vh, 110px)' }}>
            <Headline as="h2" size="lg" style={{ marginBottom: '20px' }}>Still stuck?</Headline>
            <Body style={{ margin: '0 auto 24px', textAlign: 'center' }}>
              Report bugs with your device model and Android version, or ask policy questions — every message is read by the maintainer.
            </Body>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <SecondaryButton href="/contact">Contact support →</SecondaryButton>
              <DownloadButton>Reinstall NightLight</DownloadButton>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
