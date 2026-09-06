/**
 * BUTTONS (§16, §51) — one CTA language across the site.
 * The download CTA reads the single resolved URL. When no destination is
 * configured it never silently fails: it renders an explicit
 * "Download link coming soon." state (§51).
 */
import type { ReactNode } from 'react'
import { RESOLVED_DOWNLOAD_URL, downloadConfigured } from '../config/site'

interface DownloadButtonProps {
  children?: ReactNode
  variant?: 'primary' | 'nav'
  className?: string
}

export function DownloadButton({
  children = 'Download NightLight',
  variant = 'primary',
  className = '',
}: DownloadButtonProps) {
  const cls = `btn ${variant === 'nav' ? 'btn--nav' : 'btn--primary'} ${className}`

  if (downloadConfigured && RESOLVED_DOWNLOAD_URL) {
    return (
      <a className={cls} href={RESOLVED_DOWNLOAD_URL} download data-state="ready">
        {children}
      </a>
    )
  }

  // §51 — explicit, honest fallback state during development.
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
