/**
 * ABOUT PAGE (§6, §14)
 * --------------------
 * Genuine About page explaining what NightLight is, why it exists,
 * what problem it aims to solve, and who maintains it.
 * All information is truthful and based on actual product reality.
 */

import { Eyebrow, Headline, Body } from '../ui/typography';
import { DownloadButton } from '../ui/DownloadButton';
import Reveal from '../ui/Reveal';
import { InlineAdSlot } from '../components/AdSlot';
import { SITE_URL } from '../config/site';

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NightLight',
    description: 'Learn what NightLight is, why it exists, and what problem it aims to solve.',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'NightLight',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      description: 'NightLight is a free, modern web music player designed for simple and focused music listening.',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="about-title">
        <div className="page-hero__inner" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>About NightLight</Eyebrow>
            <Headline as="h1" id="about-title" size="xl">What NightLight is. And why.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              NightLight is a free, browser-based music player built for people who want to listen — not manage, not discover, not share. Just listen.
            </Body>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
        {/* WHAT IS NIGHTLIGHT */}
        <article className="about-section" aria-labelledby="what-is-title">
          <Reveal>
            <Headline as="h2" id="what-is-title" size="md">What is NightLight?</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is a music player that runs entirely in your web browser. No installation, no account creation, no background processes. You open the URL and the player is ready — instantly.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              It plays audio, displays album artwork, shows time-synced lyrics, manages a playback queue, and offers three distinct shuffle modes. It adapts its visual intensity to your device and preferences — from a battery-sipping Low Power mode to a fully immersive Animation mode with rain, clouds, and parallax depth.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              NightLight also includes features you won't find in most players: playlist import from Spotify, Apple Music, and YouTube Music; shared listening sessions where multiple people hear the same track in sync; language-aware recommendations; and full keyboard control for power users.
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
              The starting point was frustration. Modern music apps have become sprawling platforms — social feeds, algorithmic recommendations, podcasts, videos, live lyrics, artist bios, concert tickets, merchandise stores. The actual act of listening became a secondary feature buried under layers of engagement mechanics.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              NightLight exists because some listeners want the opposite: a tool that does one thing well. Play music. Show the artwork. Sync the lyrics. Get out of the way.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              The web browser is the ideal platform for this. It's universal, zero-install, always up to date, and respects user boundaries. A browser-based player can be opened from a link, shared as a URL, and closed without leaving traces. NightLight embraces these properties instead of working around them.
            </Body>
          </Reveal>
        </article>

        {/* THE PROBLEM IT SOLVES */}
        <article className="about-section" aria-labelledby="problem-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="problem-title" size="md">The problem NightLight solves</Headline>
            <Body style={{ marginTop: '16px' }}>
              <strong>Fragmentation.</strong> Your music is scattered across services — Spotify for some things, Apple Music for others, YouTube for live versions, local files for the rest. NightLight's playlist import lets you bring playlists from multiple sources into one player.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Distraction.</strong> Most players optimize for engagement time, not listening quality. NightLight optimizes for the listening experience: clean interface, artwork-first presentation, lyrics that arrive with the music, visual modes that match your energy level.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Platform lock-in.</strong> Native apps tie you to an ecosystem. NightLight runs in the browser — the most open platform there is. Your listening session is a URL you can bookmark, share, or continue on any device with a browser.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Complexity for casual listening.</strong> Not every listening session needs a queue, a library, a profile, and a social graph. Sometimes you just want to play a song. NightLight makes that path as short as possible.
            </Body>
          </Reveal>
        </article>

        {/* PRODUCT FOCUS */}
        <article className="about-section" aria-labelledby="focus-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="focus-title" size="md">What the product focuses on</Headline>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.8' }}>
              <li><strong>Playback quality.</strong> Gapless playback, accurate seeking, volume normalization, crossfade support.</li>
              <li><strong>Visual craft.</strong> Album artwork drives the entire color palette. Lyrics set like typography. Atmosphere responds to the music.</li>
              <li><strong>Intelligent defaults.</strong> Smart Shuffle understands context. Search understands intent. Visual mode adapts to device capabilities.</li>
              <li><strong>Respect for the web.</strong> URLs for everything. No app shell. Progressive enhancement. Accessible by default.</li>
              <li><strong>Performance.</strong> Code-split, lazy-loaded, optimized for Core Web Vitals. Low Power mode for constrained devices.</li>
            </ul>
          </Reveal>
        </article>

        {/* TECHNOLOGIES */}
        <article className="about-section" aria-labelledby="tech-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="tech-title" size="md">Technologies and platform</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is built with modern web technologies:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.8' }}>
              <li><strong>React 19</strong> with TypeScript for the UI layer</li>
              <li><strong>Vite</strong> for fast development and optimized production builds</li>
              <li><strong>CSS custom properties</strong> for theming and motion control</li>
              <li><strong>Web Audio API</strong> and <strong>HTMLMediaElement</strong> for playback</li>
              <li><strong>IntersectionObserver</strong> and <strong>requestAnimationFrame</strong> for performant animations</li>
              <li><strong>Vercel</strong> for global edge deployment</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              The project uses no heavy frameworks beyond React — no Electron, no Tauri, no native wrappers. It is a web application in the truest sense.
            </Body>
          </Reveal>
        </article>

        {/* WHO MAINTAINS IT */}
        <article className="about-section" aria-labelledby="maintainers-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="maintainers-title" size="md">Who builds and maintains NightLight</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is an independent project developed by a small team of engineers and designers who use the product themselves. It is not backed by a major label, a streaming service, a venture fund, or a corporate parent.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              The project is maintained publicly. Bug reports, feature requests, and contributions are welcome through the project's repository. There is no dedicated support team — responses depend on maintainer availability.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              NightLight does not have official social media accounts, a Discord server, or a community forum at this time. For critical issues (security, copyright, policy), use the contact information in the footer.
            </Body>
          </Reveal>
        </article>

        {/* WHAT NIGHTLIGHT IS NOT */}
        <article className="about-section" aria-labelledby="not-title" style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <Reveal>
            <Headline as="h2" id="not-title" size="md">What NightLight is not</Headline>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.8' }}>
              <li>NightLight is not a music streaming service. It does not host, license, or distribute music catalogs.</li>
              <li>NightLight is not affiliated with Spotify, Apple Music, YouTube Music, or any other music platform.</li>
              <li>NightLight does not claim ownership of any music, artwork, lyrics, or metadata displayed in the player.</li>
              <li>NightLight is not a social network. There are no profiles, follows, likes, or public activity feeds.</li>
              <li>NightLight does not collect personal listening data for advertising or profiling.</li>
            </ul>
          </Reveal>
        </article>

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(80px, 12vh, 140px)' }}>
            <DownloadButton>Download NightLight</DownloadButton>
            <p className="micro" style={{ marginTop: '16px' }}>Or <a href="/" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>start listening now</a> — no download required.</p>
          </div>
        </Reveal>
      </main>
    </>
  );
}