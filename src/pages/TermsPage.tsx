/**
 * TERMS OF SERVICE
 * -----------------
 * Accurate terms describing the actual Android application.
 */

import { Eyebrow, Headline, Body, Micro } from '../ui/typography';
import Reveal from '../ui/Reveal';

export default function TermsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description: 'Terms of service for using NightLight.',
  };

  const lastUpdated = 'September 15, 2026';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="terms-title">
        <div className="page-hero__inner" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>Terms of Service</Eyebrow>
            <Headline as="h1" id="terms-title" size="xl">Simple terms. No surprises.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              By using NightLight, you agree to these terms.
            </Body>
            <Micro style={{ marginTop: '16px', display: 'block' }}>Last updated: {lastUpdated}</Micro>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
        <article className="policy-section" aria-labelledby="acceptance-title">
          <Reveal>
            <Headline as="h2" id="acceptance-title" size="md">Acceptance of terms</Headline>
            <Body style={{ marginTop: '16px' }}>
              By accessing or using NightLight (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="description-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="description-title" size="md">What NightLight is</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is a free, open source Android music player application. It provides a user interface for searching and playing audio, displaying artwork, showing synced lyrics, managing playlists and favorites, and background playback. NightLight is a player and discovery tool — it does not itself license or distribute a music catalog.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="no-account-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="no-account-title" size="md">No account required</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight does not require account creation. All core functionality works without registration. Optional Google Sign-In is available for convenience but is not required for playback or discovery.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="license-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="license-title" size="md">Open source license</Headline>
            <Body style={{ marginTop: '16px' }}>
              The NightLight source code is made available under the MIT License. You may use, copy, modify, and redistribute the code in accordance with the license text in the repository.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="content-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="content-title" size="md">Content and intellectual property</Headline>
            <Body style={{ marginTop: '16px' }}>
              <strong>Third-party content:</strong> Music, artwork, lyrics, metadata, and other content played or displayed through NightLight belong to their respective rights holders. NightLight makes no claim of ownership over this content. Your use of third-party content is subject to the terms of the respective rights holders and applicable law.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Playlist import:</strong> When you import a playlist from a third-party service (e.g., Spotify, YouTube), you are responsible for ensuring you have the right to access that playlist data. NightLight reads publicly available playlist metadata only.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="acceptable-use-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="acceptable-use-title" size="md">Acceptable use</Headline>
            <Body style={{ marginTop: '16px' }}>
              You agree not to:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li>Use NightLight for any illegal purpose or in violation of any law.</li>
              <li>Use Listen Together sessions for harassment, spam, or any abusive purpose.</li>
              <li>Interfere with or disrupt the Service, servers, or networks connected to the Service.</li>
            </ul>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="disclaimer-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="disclaimer-title" size="md">Disclaimer of warranties</Headline>
            <Body style={{ marginTop: '16px' }}>
              NIGHTLIGHT IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="limitation-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="limitation-title" size="md">Limitation of liability</Headline>
            <Body style={{ marginTop: '16px' }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE NIGHTLIGHT PROJECT AND ITS MAINTAINERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, LOSS OF PROFITS, OR BUSINESS INTERRUPTION, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="third-party-links-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="third-party-links-title" size="md">Third-party services</Headline>
            <Body style={{ marginTop: '16px' }}>
              The NightLight app integrates with third-party services for music search/streaming, lyrics, playlist import, and optional Google Sign-In. We do not control these services and are not responsible for their content, privacy practices, or terms.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="changes-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="changes-title" size="md">Changes to the Service and terms</Headline>
            <Body style={{ marginTop: '16px' }}>
              We may modify or discontinue the Service (or any part) at any time without notice. We may update these Terms; material changes will be posted with a new "Last updated" date. Continued use after changes constitutes acceptance.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="contact-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="contact-title" size="md">Contact</Headline>
            <Body style={{ marginTop: '16px' }}>
              For questions about these Terms, use the contact information in the footer or visit the <a href="/contact" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>Contact page</a>.
            </Body>
          </Reveal>
        </article>
      </main>
    </>
  );
}