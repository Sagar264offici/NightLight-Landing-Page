/**
 * Reveal wrapper — declarative entrance primitive (§30, §45-C).
 * CSS transitions do the work; JS only flips a class.
 */
import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>(delay)
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
