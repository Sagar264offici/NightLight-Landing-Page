/**
 * NAVIGATION (§05) — minimal, initially almost invisible.
 * Scrolled: slightly darker/opaque + soft blur. Mobile: cinematic
 * full-screen menu overlay (no dropdown), accessible and focus-safe.
 */
import { useEffect, useRef, useState } from 'react'
import { APP_NAME, NAV_LINKS } from '../config/site'
import { useScrollState } from '../hooks/useScrollDirector'
import { DownloadButton } from '../ui/DownloadButton'

export default function Navigation() {
  const { scrolled } = useScrollState()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Lock scroll + Escape + simple focus management while the menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    const first = panelRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label={`${APP_NAME} — back to top`}>
          <svg className="nav__mark" viewBox="0 0 24 24" aria-hidden="true">
            <mask id="nl-moon-mask">
              <rect width="24" height="24" fill="#fff" />
              <circle cx="17" cy="9" r="6.4" fill="#000" />
            </mask>
            <circle cx="12" cy="13" r="7" fill="currentColor" mask="url(#nl-moon-mask)" />
          </svg>
          <span className="nav__wordmark">NightLight</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} className="nav__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <DownloadButton variant="nav" className="nav__cta">
            Download
          </DownloadButton>
          <button
            ref={triggerRef}
            type="button"
            className="nav__trigger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__trigger-lines" aria-hidden="true" />
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {/* Cinematic overlay menu — near-full-screen, staggered links. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className="nav__menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <nav className="nav__menu-links" aria-label="Menu">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              className="nav__menu-link"
              href={l.href}
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="nav__menu-cta" style={{ '--i': NAV_LINKS.length } as React.CSSProperties}>
            <DownloadButton>Download NightLight</DownloadButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
