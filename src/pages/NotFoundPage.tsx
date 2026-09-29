/**
 * NOT FOUND
 * ---------
 * Rendered for every URL that is not in CONTENT_ROUTES. Served to crawlers
 * and users as `dist/404.html`, so a bad link gets a real 404 status instead
 * of a soft-404 homepage.
 */
import { Eyebrow, Headline, Body } from '../ui/typography';
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton';

const SUGGESTIONS = [
  { href: '/features', label: 'Features', note: 'What the player can do' },
  { href: '/how-it-works', label: 'How It Works', note: 'Install, discover, play' },
  { href: '/faq', label: 'FAQ', note: 'Short answers to common questions' },
  { href: '/help', label: 'Help', note: 'Guides and troubleshooting' },
  { href: '/contact', label: 'Contact', note: 'Report a broken link' },
] as const;

export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="page__inner">
        <Eyebrow>Error 404</Eyebrow>
        <Headline as="h1">This page has gone quiet.</Headline>
        <Body>
          The address you followed doesn&apos;t exist on this site. Nothing is broken on your
          end — the page just isn&apos;t here. Try one of these instead.
        </Body>

        <ul className="notfound__links">
          {SUGGESTIONS.map((item) => (
            <li key={item.href}>
              <a className="notfound__link" href={item.href}>
                <span className="notfound__link-label">{item.label}</span>
                <span className="notfound__link-note">{item.note}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="notfound__actions">
          <SecondaryButton href="/">Back to home</SecondaryButton>
          <DownloadButton>Get NightLight for Android</DownloadButton>
        </div>
      </div>
    </div>
  );
}
