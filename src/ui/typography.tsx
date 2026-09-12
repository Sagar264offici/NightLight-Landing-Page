/**
 * TYPOGRAPHY (§04, §39) — fluid editorial type primitives.
 * Eyebrow → Headline → Body → Micro. Sizes live in CSS; components carry
 * semantics (real h1–h3, real p) so the document outline stays logical (§40).
 */
import type { ElementType, ReactNode } from 'react'

export function Eyebrow({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <p className={`eyebrow ${className}`} style={style}>{children}</p>
}

export function Headline({
  as: Tag = 'h2',
  size = 'md',
  children,
  className = '',
  id,
  style,
}: {
  as?: ElementType
  size?: 'xl' | 'lg' | 'md'
  children: ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}) {
  return <Tag id={id} className={`headline headline--${size} ${className}`} style={style}>{children}</Tag>
}

export function Body({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <p className={`body ${className}`} style={style}>{children}</p>
}

export function Micro({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <p className={`micro ${className}`} style={style}>{children}</p>
}
