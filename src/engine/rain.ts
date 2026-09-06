/**
 * RAIN ENGINE (§09) — procedural, depth-layered, canvas-based.
 * No GIF, no video. Deterministic randomness (no visual popping).
 * Reads the shared weather state each frame (§11) and the quality budget (§26).
 */
import { QUALITY_PROFILE, type QualityTier } from '../perf/quality'
import { weather } from './weather'

interface Drop {
  x: number
  y: number
  len: number
  speed: number
  depth: 0 | 1 | 2 // 0 background, 1 midground, 2 foreground
  drift: number
  alpha: number
  heavy: boolean
}

/** Deterministic hash → [0,1). Same seed → same rain, no popping. */
function rnd(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

export interface RainHandle {
  destroy(): void
}

export function createRainEngine(
  canvas: HTMLCanvasElement,
  tier: QualityTier,
): RainHandle {
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return { destroy: () => undefined }

  const profile = QUALITY_PROFILE[tier]
  const dpr = Math.min(window.devicePixelRatio || 1, profile.dpr)
  let w = 0
  let h = 0
  let drops: Drop[] = []

  const build = () => {
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const n = profile.rain
    drops = new Array(n)
    for (let i = 0; i < n; i++) {
      // Depth bands: 50% background, 33% mid, 17% foreground.
      const r = rnd(i, 1)
      const depth: 0 | 1 | 2 = r < 0.5 ? 0 : r < 0.83 ? 1 : 2
      const lenBase = depth === 0 ? 8 : depth === 1 ? 16 : 26
      drops[i] = {
        x: rnd(i, 2) * (w + 200) - 100,
        y: rnd(i, 3) * h,
        len: lenBase * (0.6 + rnd(i, 4) * 0.8),
        speed: (depth === 0 ? 340 : depth === 1 ? 560 : 780) * (0.7 + rnd(i, 5) * 0.6),
        depth,
        drift: weather.drift * (0.4 + rnd(i, 6) * 0.9),
        alpha: (depth === 0 ? 0.1 : depth === 1 ? 0.16 : 0.26) * (0.6 + rnd(i, 7) * 0.7),
        heavy: rnd(i, 8) > 0.955, // occasional stronger streaks (§09)
      }
    }
    ctx.clearRect(0, 0, w, h)
  }

  build()
  let onResize = () => build()
  window.addEventListener('resize', onResize)

  let raf = 0
  let last = performance.now()

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (document.hidden) return
    if (weather.density < 0.02) return // nothing to draw — skip the work (§27)

    const density = Math.min(1, weather.density)
    const fine = weather.fine
    const active = Math.floor(drops.length * density)
    const wind = weather.drift

    ctx.clearRect(0, 0, w, h)
    ctx.lineCap = 'round'

    for (let i = 0; i < active; i++) {
      const d = drops[i]
      d.y += d.speed * dt
      d.x += (d.drift + wind) * dt

      if (d.y - d.len > h) {
        // Re-enter above the viewport, deterministic per-index jitter.
        d.y = -d.len - rnd(i, Math.floor(now / 1000)) * h * 0.3
        d.x = rnd(i, 2 + Math.floor(now / 977)) * (w + 200) - 100
      }
      if (d.x < -120) d.x += w + 220
      else if (d.x > w + 120) d.x -= w + 220

      // Fine weather → shorter, fainter streaks (§11 emotional sections).
      const len = d.len * (1 - 0.55 * fine)
      const alpha = d.alpha * (1 - 0.45 * fine)
      const x2 = d.x + (d.drift + wind) * (len / d.speed)
      const y2 = d.y - len

      if (d.depth === 2) {
        // Foreground halo pass = cheap "atmospheric blur" illusion.
        ctx.strokeStyle = `rgba(169,200,255,${alpha * 0.28})`
        ctx.lineWidth = 3.2
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      ctx.strokeStyle = `rgba(190,214,255,${d.heavy ? alpha * 1.8 : alpha})`
      ctx.lineWidth = d.depth === 0 ? 0.8 : d.depth === 1 ? 1.2 : 1.5
      ctx.beginPath()
      ctx.moveTo(d.x, d.y)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
  }

  raf = requestAnimationFrame(frame)

  return {
    destroy() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    },
  }
}
