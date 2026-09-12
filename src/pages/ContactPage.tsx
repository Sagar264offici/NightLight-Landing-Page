/**
 * CONTACT PAGE (§23)
 * ------------------
 * Legitimate contact/feedback mechanism.
 * Uses existing project contact information.
 */

import { Eyebrow, Headline, Body } from '../ui/typography';
import Reveal from '../ui/Reveal';
import { SITE_URL } from '../config/site';

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NightLight',
    description: 'Contact NightLight for bugs, content issues, copyright concerns, or policy questions.',
    mainEntity: {
      '@type': 'Organization',
      name: 'NightLight',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: ['English'],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-hero" aria-labelledby="contact-title">
        <div className="page-hero__inner" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(120px, 18vh, 200px) clamp(20px, 5vw, 72px) clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <Headline as="h1" id="contact-title" size="xl">Get in touch.</Headline>
            <Body className="page-hero__lead" style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', maxWidth: 'none' }}>
              We read every message. Response time depends on maintainer availability.
            </Body>
          </Reveal>
        </div>
      </section>

      <main className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px) clamp(120px, 16vh, 180px)' }}>
        <article className="contact-section" aria-labelledby="bug-reports-title">
          <Reveal>
            <Headline as="h2" id="bug-reports-title" size="md">Bug reports</Headline>
            <Body style={{ marginTop: '16px' }}>
              Found a bug? Please include:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li>What you were doing when it happened</li>
              <li>What you expected vs. what actually happened</li>
              <li>Browser and version (e.g., Chrome 128, Safari 17)</li>
              <li>Device and OS (e.g., iPhone 15 / iOS 17, Windows 11 / Chrome 128)</li>
              <li>Steps to reproduce (if reproducible)</li>
              <li>Console errors (open DevTools → Console, copy any red errors)</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              Submit via the project's GitHub Issues page (preferred) or email.
            </Body>
          </Reveal>
        </article>

        <article className="contact-section" aria-labelledby="content-issues-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="content-issues-title" size="md">Content issues</Headline>
            <Body style={{ marginTop: '16px' }}>
              Issues with displayed content (incorrect metadata, missing artwork, wrong lyrics, mismatched tracks):
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li>Track title and artist</li>
              <li>What is incorrect (artwork, lyrics, metadata, variant labeling)</li>
              <li>Source of correct information (if known)</li>
            </ul>
          </Reveal>
        </article>

        <article className="contact-section" aria-labelledby="copyright-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="copyright-title" size="md">Copyright concerns</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is a player, not a content host. If you believe content accessible through NightLight infringes your copyright:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li>Identify the specific content (track, artwork, lyrics)</li>
              <li>Provide proof of rights ownership or authorization</li>
              <li>Specify the requested action (removal, attribution correction)</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              We will respond promptly to valid notices. Note: NightLight does not host music files — it plays from sources you provide or that are available via supported integrations.
            </Body>
          </Reveal>
        </article>

        <article className="contact-section" aria-labelledby="policy-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="policy-title" size="md">Policy questions</Headline>
            <Body style={{ marginTop: '16px' }}>
              Questions about Privacy Policy, Terms of Service, AdSense implementation, or other policies.
            </Body>
          </Reveal>
        </article>

        <article className="contact-section" aria-labelledby="contact-methods-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="contact-methods-title" size="md">How to reach us</Headline>
            <Body style={{ marginTop: '16px' }}>
              NightLight is an independent project without a dedicated support team. The most reliable contact methods:
            </Body>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li><strong>GitHub Issues:</strong> Primary channel for bugs and feature requests. Public, trackable, searchable.</li>
              <li><strong>Email:</strong> For private matters (security, copyright, policy) — see the repository README for the current address.</li>
            </ul>
            <Body style={{ marginTop: '16px' }}>
              We do not have a contact form, live chat, phone support, Discord, or social media DMs. Responses depend on maintainer availability and are not guaranteed.
            </Body>
          </Reveal>
        </article>

        <article className="contact-section" aria-labelledby="security-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="security-title" size="md">Security vulnerabilities</Headline>
            <Body style={{ marginTop: '16px' }}>
              If you discover a security vulnerability, please report it privately via email (see GitHub README) rather than filing a public issue. We will acknowledge receipt within 72 hours and work on a fix.
            </Body>
          </Reveal>
        </article>

        <article className="contact-section" aria-labelledby="what-not-to-contact-title" style={{ marginTop: '48px' }}>
          <Reveal>
            <Headline as="h2" id="what-not-to-contact-title" size="md">What we can't help with</Headline>
            <ul style={{ marginTop: '16px', paddingLeft: '24px', lineHeight: '1.9' }}>
              <li>Music licensing or royalty questions (we don't license music)</li>
              <li>Requests to add specific songs to a catalog (we don't have a catalog)</li>
              <li>Account recovery (no accounts exist)</li>
              <li>Feature requests for services we don't control (Spotify, Apple Music, etc.)</li>
              <li>General music recommendations</li>
            </ul>
          </Reveal>
        </article>
      </main>
    </>
  );
}