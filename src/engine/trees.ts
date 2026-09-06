/**\n * TREE SHAKE (§57 LIGHTNING).\n *\n * Outside the viewport there are trees. When lightning fires, the ground\n * shivers: a short, strong offset with damped follow-through. This module\n * applies that shake to the atmosphere root as CSS transforms, eased each\n * frame, so it feels physical without any React re-render.\n */
import { weather } from './weather'
import { lerp } from '../lib/math'

export interface TreeShakeHandle {
  destroy(): void
}

export function createTreeShakeEngine(root: HTMLElement): TreeShakeHandle {
  let raf = 0
  let last = performance.now()
  let tx = 0
  let ty = 0

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (document.hidden) return

    // Lightning intensity drives a brief horizontal/vertical shiver.
    const targetX = weather.lightning * (Math.random() - 0.5) * 14
    const targetY = weather.lightning * (Math.random() - 0.5) * 6

    tx = lerp(tx, targetX, 0.18)
    ty = lerp(ty, targetY, 0.18)

    const decay = Math.pow(0.45, dt * 14)
    tx *= decay
    ty *= decay

    root.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`
  }

  raf = requestAnimationFrame(tick)

  return {
    destroy() {
      cancelAnimationFrame(raf)
      tx = 0
      ty = 0
      root.style.transform = ''
    },
  }
}
