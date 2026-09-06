/**
 * CLOUD ENGINE (§10) — blurred gradient meshes on canvas.
 * No cartoon SVG shapes. Multiple velocity fields: some clouds barely move,
 * others drift noticeably. Deterministic layout, GPU-light radial gradients.
 */
import { QUALITY_PROFILE, type QualityTier } from '../perf/quality'
import { pointer } from '../hooks/usePointer'

interface Blob {
  cx: number // 0..1 of width
  cy: number // 0..1 of height
  rx: number
  ry: number
  alpha: number
  vx: number // drift, px/s — the "velocity field"
  phase: number
  /** Parallax depth 0..1 — responds to pointer (§12). */
  depth: number
}

function rnd(i: number, salt: number): number {
  const x = Math.sin(i * 269.5 + salt * 183.3) * 43758.5453
  return x - Math.floor(x)
}

export interface CloudHandle {
  destroy(): void
}

export function createCloudEngine(
  canvas: HTMLCanvasElement,
  tier: QualityTier,
): CloudHandle {
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx || tier === 'verylow') return { destroy: () => undefined }

  const profile = QUALITY_PROFILE[tier]
  const dpr = Math.min(window.devicePixelRatio || 1, profile.dpr)
  let w = 0
  let h = 0
  let blobs: Blob[] = []

  const build = () => {
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const n = profile.clouds
    blobs = new Array(n)
    for (let i = 0; i < n; i++) {
      const r = rnd(i, 1)
      blobs[i] = {
        cx: rnd(i, 2),
        cy: 0.08 + rnd(i, 3) * 0.5,
        rx: w * (0.28 + rnd(i, 4) * 0.3),
        ry: h * (0.1 + rnd(i, 5) * 0.14),
        alpha: 0.05 + rnd(i, 6) * 0.07,
        // Velocity fields: a slow band and a slightly faster band (§58).
        vx: (r < 0.5 ? 1.2 : 4.5) * (0.6 + rnd(i, 7) * 0.8) * (rnd(i, 8) > 0.8 ? -1 : 1),
        phase: rnd(i, 9) * Math.PI * 2,
        depth: 0.2 + rnd(i, 10) * 0.8,
      }
    }
  }

  build()
  const onResize = () => build()
  window.addEventListener('resize', onResize)

  let raf = 0
  let t = 0
  let last = performance.now()

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (document.hidden) return
    t += dt

    ctx.clearRect(0, 0, w, h)

    for (const b of blobs) {
      b.cx += (b.vx / w) * dt
      // Wrap with generous margin so edges never pop.
      if (b.cx > 1.35) b.cx = -0.35
      else if (b.cx < -0.35) b.cx = 1.35

      // Soft distortion: slow breathing of the ellipse (§58).
      const breathe = 1 + Math.sin(t * 0.05 + b.phase) * 0.08
      // Pointer parallax — subtle, damped input from cursor physics (§12).
      const px = pointer.sx * 10 * b.depth
      const py = pointer.sy * 4 * b.depth

      const cx = b.cx * w + px
      const cy = b.cy * h + py + Math.sin(t * 0.03 + b.phase) * 6
      const rx = b.rx * breathe
      const ry = b.ry * (2 - breathe)

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry))
      g.addColorStop(0, `rgba(148,170,205,${b.alpha})`)
      g.addColorStop(0.55, `rgba(120,140,175,${b.alpha * 0.5})`)
      g.addColorStop(1, 'rgba(100,120,155,0)')
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry))
      ctx.translate(-cx, -cy)
      ctx.fillStyle = g
      ctx.fillRect(cx - rx - 4, cy - ry - 4, rx * 2 + 8, ry * 2 + 8)
      ctx.restore()
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
