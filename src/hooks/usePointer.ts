/**
 * CURSOR PHYSICS (§12) — desktop, fine-pointer only.
 * Damped lerp toward the normalized (-1..1) pointer position.
 * Writes a shared singleton: no React re-renders on pointermove.
 */
import { lerp } from '../lib/math'
import { prefersReducedMotion } from '../perf/quality'

export interface PointerState {
  /** Raw normalized -1..1 from viewport center. */
  x: number
  y: number
  /** Smoothed (damped) values — use these for environment parallax. */
  sx: number
  sy: number
  /** True once a fine pointer has moved. */
  active: boolean
}

export const pointer: PointerState = { x: 0, y: 0, sx: 0, sy: 0, active: false }

let installed = false

export function installPointerPhysics(): () => void {
  if (installed || typeof window === 'undefined') return () => undefined
  if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) {
    return () => undefined
  }
  installed = true

  let raf = 0
  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    pointer.active = true
  }

  const tick = () => {
    // Damped spring-ish follow (§12: lerp/damped motion, no robot-linear).
    pointer.sx = lerp(pointer.sx, pointer.x, 0.055)
    pointer.sy = lerp(pointer.sy, pointer.y, 0.055)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
  window.addEventListener('pointermove', onMove, { passive: true })

  return () => {
    window.removeEventListener('pointermove', onMove)
    cancelAnimationFrame(raf)
    installed = false
  }
}
