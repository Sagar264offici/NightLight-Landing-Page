/**
 * TYPOGRAPHY (§04, §39) — fluid editorial type primitives.
 * Eyebrow → Headline → Body → Micro. Sizes live in CSS; components carry
 * semantics (real h1–h3, real p) so the document outline stays logical (§40).
 */
import type { ElementType, ReactNode } from 'react'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function Headline({
  as: Tag = 'h2',
  size = 'md',
  children,
  className = '',
}: {
  as?: ElementType
  size?: 'xl' | 'lg' | 'md'
  children: ReactNode
  className?: string
}) {
  return <Tag className={`headline headline--${size} ${className}`}>{children}</Tag>
}

export function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`body ${className}`}>{children}</p>
}

export function Micro({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`micro ${className}`}>{children}</p>
}
