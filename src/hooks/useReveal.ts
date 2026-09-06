/**
 * Reveal (§30, §45) — IntersectionObserver-driven entrance.
 * Adds .is-visible once; the CSS transition does the motion.
 * Honors reduced motion (elements simply appear via CSS defaults).
 */
import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../perf/quality'

export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--reveal-delay', `${delayMs}ms`)

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delayMs])

  return ref
}

/**
 * Section activation (§27) — true while any part of the element is on screen.
 * Used to pause canvas/animation work for off-screen sections.
 */
export function useInView<T extends HTMLElement>(margin = '20%') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: margin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])

  return { ref, inView }
}

import { useState } from 'react'
