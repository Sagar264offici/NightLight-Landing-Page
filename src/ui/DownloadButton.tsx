/**
 * BUTTONS — one CTA language across the site.
 * The download CTA reads the single resolved URL from config/site.ts and is
 * always a real, same-origin APK download with an honest fallback only if no
 * destination is configured at all.
 */
import type { ReactNode } from 'react'
import {
  RESOLVED_DOWNLOAD_URL,
  downloadConfigured,
  APK_FILE_NAME,
  APK_FILE_SIZE,
  APK_VERSION,
} from '../config/site'

interface DownloadButtonProps {
  children?: ReactNode
  variant?: 'primary' | 'nav'
  className?: string
  /** Show the version + size microcopy under the label. Defaults on for primary. */
  showMeta?: boolean
}

export function DownloadButton({
  children = 'Download NightLight for Android',
  variant = 'primary',
  className = '',
  showMeta,
}: DownloadButtonProps) {
  const cls = `btn ${variant === 'nav' ? 'btn--nav' : 'btn--primary btn--download'} ${className}`
  const withMeta = showMeta ?? variant === 'primary'

  if (downloadConfigured && RESOLVED_DOWNLOAD_URL) {
    return (
      <a
        className={cls}
        href={RESOLVED_DOWNLOAD_URL}
        download={APK_FILE_NAME}
        data-state="ready"
        aria-label={`Download NightLight version ${APK_VERSION} for Android (${APK_FILE_SIZE})`}
      >
        <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="btn__content">
          <span className="btn__label">{children}</span>
          {withMeta && (
            <span className="btn__meta">
              v{APK_VERSION} · {APK_FILE_SIZE} · Free
            </span>
          )}
        </span>
      </a>
    )
  }

  // Honest fallback — only reachable if the URL config is emptied.
  return (
    <span className={`${cls} btn--unavailable`} data-state="unavailable" title="Download link coming soon.">
      {children}
      <span className="btn__note">Download link coming soon.</span>
    </span>
  )
}

export function SecondaryButton({
  href,
  children,
  className = '',
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <a className={`btn btn--ghost ${className}`} href={href} onClick={onClick}>
      {children}
    </a>
  )
}

/** Sticky bottom CTA shown on small screens after scrolling past the hero. */
export function StickyDownloadCta() {
  if (!downloadConfigured || !RESOLVED_DOWNLOAD_URL) return null
  return (
    <div className="sticky-cta" data-sticky-cta>
      <a
        className="btn btn--primary btn--download sticky-cta__btn"
        href={RESOLVED_DOWNLOAD_URL}
        download={APK_FILE_NAME}
        aria-label={`Download NightLight version ${APK_VERSION} for Android (${APK_FILE_SIZE})`}
      >
        <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="btn__content">
          <span className="btn__label">Download · {APK_FILE_SIZE}</span>
        </span>
      </a>
    </div>
  )
}
