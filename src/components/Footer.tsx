/**
 * FOOTER (§37) — minimal. Brand, small nav, legal/social only when real
 * links exist. One honest microcopy line about the prototype assets.
 */
import { APP_NAME, NAV_LINKS, PRIVACY_URL, TERMS_URL, SOCIAL_LINKS } from '../config/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <svg className="footer__mark" viewBox="0 0 24 24" aria-hidden="true">
            <mask id="nl-foot-moon">
              <rect width="24" height="24" fill="#fff" />
              <circle cx="17" cy="9" r="6.4" fill="#000" />
            </mask>
            <circle cx="12" cy="13" r="7" fill="currentColor" mask="url(#nl-foot-moon)" />
          </svg>
          <span>{APP_NAME}</span>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
          {PRIVACY_URL && <a href={PRIVACY_URL}>Privacy</a>}
          {TERMS_URL && <a href={TERMS_URL}>Terms</a>}
          {SOCIAL_LINKS.map((s) => (
            <a key={s.href} href={s.href} rel="noopener noreferrer" target="_blank">
              {s.label}
            </a>
          ))}
        </nav>

        <p className="footer__note">
          Songs, artwork and lyrics shown are placeholders — the prototype runs
          without audio.
        </p>
        <p className="footer__legal">© {new Date().getFullYear()} {APP_NAME}</p>
      </div>
    </footer>
  )
}
