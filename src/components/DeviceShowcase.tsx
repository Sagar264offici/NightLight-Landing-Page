/**
 * DEVICE SHOWCASE (§13, §14, §12) — the floating product.
 * Idle: multiple low-frequency curves (no infinite bounce feel).
 * Pointer: ≤ ~8px displacement, <1° rotation, damped.
 * Scroll: slight depth shift. Light: ambient glow behind the device (§33).
 */
import { useEffect, useRef } from 'react'
import PhoneMock from './PhoneMock'
import { pointer } from '../hooks/usePointer'
import { heroExit } from '../hooks/useScrollDirector'
import { prefersReducedMotion } from '../perf/quality'

export default function DeviceShowcase() {
  const floatRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = floatRef.current
    if (!el) return

    let raf = 0
    const tick = (now: number) => {
      const t = now / 1000
      // Several low-frequency curves superimposed → organic drift (§14).
      const fy = Math.sin(t * 0.42) * 3.1 + Math.sin(t * 0.23 + 1.7) * 2.3
      const fr = Math.sin(t * 0.19 + 0.6) * 0.42
      // Pointer: tiny displacement, damped input (§12).
      const px = pointer.sx * 6.5
      const py = pointer.sy * 4
      // Scroll: device drifts back slightly as hero leaves (§14).
      const sy = heroExit.value * -30

      el.style.transform = `translate3d(${px.toFixed(2)}px, ${(fy + py + sy).toFixed(2)}px, 0) rotate(${fr.toFixed(3)}deg)`

      if (glowRef.current) {
        // Phone illumination breathing — implies a light source (§33).
        const b = 0.75 + Math.sin(t * 0.32) * 0.12 + Math.sin(t * 0.11) * 0.08
        glowRef.current.style.opacity = b.toFixed(3)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="showcase">
      <div className="showcase__glow" ref={glowRef} aria-hidden="true" />
      <div className="showcase__float" ref={floatRef}>
        <PhoneMock />
        <div className="showcase__shadow" aria-hidden="true" />
      </div>
      <div className="showcase__reflection" aria-hidden="true" />
    </div>
  )
}
