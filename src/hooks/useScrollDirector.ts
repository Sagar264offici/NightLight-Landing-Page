/**
 * SCROLL DIRECTOR (§11, §19, §29)
 * Native scrolling only — a single rAF loop reads window.scrollY each frame
 * and drives: nav treatment, weather reactivity, section progress variables.
 * No scroll-jacking, no fake scrollbars. One rAF, no per-component listeners.
 */
import { useEffect, useRef, useState } from 'react'
import { clamp, lerp } from '../lib/math'
import { weather } from '../engine/weather'

/* -- internal shared store so many components read without extra listeners -- */

const listeners = new Set<() => void>()

export function subscribeScroll(fn: () => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function emit() {
  for (const fn of listeners) fn()
}

/** Scroll progress through the whole document, 0..1. */
export const documentProgress = { value: 0 }
/** 0 at hero, 1 once the user has scrolled past the hero viewport. */
export const heroExit = { value: 0 }
/** Section progress snapshots, keyed by section id. */
export const sectionProgressMap: Record<string, number> = {}

export function useScrollState(): { scrolled: boolean; progress: number } {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    return subscribeScroll(() => {
      // setState with the same value bails out — no per-frame re-renders (§27).
      setScrolled(documentProgress.value > 0.015)
    })
  }, [])
  return { scrolled, progress: documentProgress.value }
}

/* -- the director: installed once by Atmosphere/App -- */

let installed = false

export function installScrollDirector(): () => void {
  if (installed && typeof window !== 'undefined') return () => undefined
  installed = true

  let raf = 0
  let lastY = -1

  const tick = () => {
    const y = window.scrollY
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const p = clamp(y / max)

    if (y !== lastY) {
      lastY = y
      documentProgress.value = p

      // Hero exit drives nav treatment + early weather shift.
      const heroH = window.innerHeight
      heroExit.value = clamp(y / (heroH * 0.9))

      // Section progress: each [data-section] gets enter→exit progress.
      const sections = document.querySelectorAll<HTMLElement>('[data-section]')
      sections.forEach((s) => {
        const r = s.getBoundingClientRect()
        const vh = window.innerHeight
        const total = r.height + vh
        const seen = vh - r.top
        sectionProgressMap[s.id] = clamp(seen / total)
      })

      emit()
    }

    // ---- WEATHER REACTIVITY (§11) — eased every frame, even when idle ----
    const p2 = documentProgress.value
    // Density: strong in hero, thins through the product story, deepens at the end.
    const targetDensity =
      1 -
      0.65 * clamp(p2 / 0.45) + // thin out toward the middle
      0.55 * clamp((p2 - 0.72) / 0.2) // deepen again for the finale
    weather.density = lerp(weather.density, clamp(targetDensity, 0.18, 1.15), 0.04)

    // Fine rain during the emotional/music middle.
    const midBand = clamp(p2 / 0.35) * clamp((0.78 - p2) / 0.35)
    weather.fine = lerp(weather.fine, clamp(midBand), 0.05)

    // Night depth: deepest at the final CTA.
    weather.glow = lerp(weather.glow, 0.35 + 0.65 * clamp((p2 - 0.7) / 0.3), 0.04)

    raf = requestAnimationFrame(tick)
  }

  raf = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(raf)
    installed = false
  }
}

/** Smoothed hero-exit value for consumers that want eased motion. */
export function useSmoothed(value: { value: number }, amt = 0.1): number {
  const out = useRef(0)
  const [, force] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const next = lerp(out.current, value.value, amt)
      if (Math.abs(next - out.current) > 0.0005) {
        out.current = next
        force((n) => (n + 1) % 1000000)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, amt])
  return out.current
}
