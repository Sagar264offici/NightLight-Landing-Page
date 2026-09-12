/**
 * TERMS OF SERVICE (§22)
 * -----------------------
 * Accurate terms describing actual service.
 * No copied templates — only what applies to NightLight.
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

  const lastUpdated = 'September 12, 2026';

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
              NightLight is a free, browser-based music player application. It provides a user interface for playing audio, displaying artwork, showing lyrics, managing playback queues, and related features. NightLight is not a music streaming service, does not host a music catalog, and does not license or distribute music.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="no-account-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="no-account-title" size="md">No account required</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight does not require account creation. All core functionality works without registration. If optional account features are added in the future, they will be clearly separate from the core player and governed by additional terms.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="content-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="content-title" size="md">Content and intellectual property</Headline>
            <Body style={{ marginTop: '16px' }}>
              <strong>NightLight content:</strong> The NightLight application code, design, branding, and original text content are proprietary to the NightLight project. You may not copy, reproduce, or redistribute the NightLight application itself without permission.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Third-party content:</strong> Music, artwork, lyrics, metadata, and other content played or displayed through NightLight belong to their respective rights holders. NightLight makes no claim of ownership over this content. Your use of third-party content is subject to the terms of the respective rights holders and applicable law.
            </Body>
            <Body style={{ marginTop: '16px' }}>
              <strong>Playlist import:</strong> When you import a playlist from a third-party service (Spotify, Apple Music, YouTube Music), you are responsible for ensuring you have the right to access that playlist data. NightLight reads publicly available playlist metadata only; it does not circumvent access controls or authentication.
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
              <li>Attempt to reverse engineer, decompile, or extract the source code of the NightLight application beyond what is publicly available in the browser.</li>
              <li>Interfere with or disrupt the Service, servers, or networks connected to the Service.</li>
              <li>Use automated systems (bots, scrapers, crawlers) to access the Service in a manner that exceeds reasonable human usage.</li>
              <li>Use shared listening sessions for harassment, spam, or any abusive purpose.</li>
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

        <article className="policy-section" aria-labelledby="indemnification-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="indemnification-title" size="md">Indemnification</Headline>
            <Body style={{ marginTop: '16px' }}>
              You agree to indemnify and hold harmless the NightLight project and its maintainers from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from your use of the Service in violation of these Terms or applicable law.
            </Body>
          </Reveal>
        </article>

        <article className="policy-section" aria-labelledby="third-party-links-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="third-party-links-title" size="md">Third-party links and services</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight may contain links to third-party websites or services (e.g., Spotify, Apple Music, YouTube Music for playlist import). We do not control these services and are not responsible for their content, privacy practices, or terms. Your use of third-party services is at your own risk.
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

        <article className="policy-section" aria-labelledby="governing-law-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="governing-law-title" size="md">Governing law</Headline>
            <Body style={{ marginTop: '16px' }}>
              These Terms are governed by the laws of the jurisdiction where the NightLight project is maintained, without regard to conflict of law principles. Disputes will be resolved in the courts of that jurisdiction.
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