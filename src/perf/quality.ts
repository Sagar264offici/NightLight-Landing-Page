/**
 * Adaptive quality (§26). One place decides how heavy the atmosphere gets.
 */
export type QualityTier = 'high' | 'medium' | 'low' | 'verylow'

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches
}

export function detectQuality(): QualityTier {
  if (typeof window === 'undefined') return 'medium'
  if (prefersReducedMotion()) return 'verylow'

  const w = window.innerWidth
  const dpr = window.devicePixelRatio || 1
  const cores = navigator.hardwareConcurrency ?? 4
  const conn = (navigator as { connection?: { saveData?: boolean } }).connection
  if (conn?.saveData) return 'verylow'

  let score = 0
  if (w >= 1024) score += 2
  else if (w >= 768) score += 1
  if (cores >= 8) score += 2
  else if (cores >= 4) score += 1
  if (dpr > 1 && dpr <= 2.5) score += 1

  if (score >= 4) return 'high'
  if (score >= 2) return 'medium'
  if (score >= 1) return 'low'
  return 'verylow'
}

export const QUALITY_PROFILE: Record<
  QualityTier,
  { rain: number; clouds: number; dpr: number }
> = {
  high: { rain: 240, clouds: 8, dpr: 2 },
  medium: { rain: 150, clouds: 5, dpr: 1.5 },
  low: { rain: 70, clouds: 3, dpr: 1.25 },
  verylow: { rain: 0, clouds: 0, dpr: 1 },
}
