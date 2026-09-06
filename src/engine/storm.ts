/**
 * STORM / LIGHTNING ENGINE (§11 WEATHER REACTIVITY, §57 LIGHTNING).
 *
 * A sparse, quiet engine. Lightning is not frequent; it opens a brief flash,
 * then the scene settles back into the base night. Trees outside the frame
 * shake when a bolt fires; the shake is a damped offset applied through the
 * atmosphere root so UI content feels the hit without re-rendering.
 *
 * Reads shared weather state each frame so it stays in the same reactivity
 * loop as rain/clouds (§11).
 */
import { weather } from './weather'

interface Bolt {
  /** Fires once; active for a few frames. */
  firesAt: number
  /** Peak brightness 0..1 reached near firesAt. */
  peak: number
  /** Branch spread multiplier for this bolt. */
  branchMag: number
  /** Brief secondary flash offset (seconds) for a more dynamic strike. */
  echoAt: number
}

const bolts: Bolt[] = []

/** Deterministic hash in [0,1). */
function rnd(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function pickBoltLine(
  cx: number,
  cy: number,
  toX: number,
  toY: number,
  branchMag: number,
  seed: number,
): Array<{ x: number; y: number }> {
  const pts: Array<{ x: number; y: number }> = [{ x: cx, y: cy }]
  const segs = 8 + Math.floor(branchMag * 6)
  let x = cx
  let y = cy
  for (let i = 1; i <= segs; i++) {
    const t = i / segs
    // main channel drifts toward target with a little wander
    const wander = Math.sin(t * 13 + seed) * 0.18 * (1 - t) * branchMag
    const tt = toX + wander * (toX - cx) * 0.5
    const ty = toY + Math.cos(t * 9 + seed * 2) * 0.16 * (1 - t) * branchMag * 40
    x = cx + (tt - cx) * easeInOut(t)
    y = cy + (ty - cy) * easeInOut(t)
    pts.push({ x, y })
  }
  return pts
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function drawBolt(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bolt: Bolt,
  intensity: number,
  t: number,
) {
  if (intensity < 0.02) return

  const age = t - bolt.firesAt
  // brightness envelope: near-instant rise, slower decay for a more visible flash.
  const peak = bolt.peak
  const rise = Math.max(0, 1 - age / 0.03)
  const decay = Math.max(0, 1 - age / 0.35)
  // Add a brief echo flash for a more dynamic strike.
  const echoAge = t - bolt.echoAt
  const echoRise = bolt.echoAt > 0 ? Math.max(0, 1 - echoAge / 0.03) : 0
  const echoDecay = bolt.echoAt > 0 ? Math.max(0, 1 - echoAge / 0.18) : 0
  const echoEnv = Math.max(echoRise, echoDecay * 0.7) * peak * 0.4
  const env = Math.max(rise, decay * 0.6) * peak + echoEnv
  const alpha = env * intensity * 0.95

  // Origin: upper sky band, a touch off-center.
  const originSeed = Math.floor(bolt.firesAt * 1000) % 997
  const cx = w * 0.72 + Math.sin(bolt.firesAt * 7.3) * w * 0.06
  const cy = h * (0.05 + rnd(originSeed) * 0.12)
  // Strike target: lower third, with branch spread.
  const tx = w * (0.25 + rnd((originSeed + 13) % 997) * 0.5)
  const ty = h * (0.55 + rnd((originSeed + 29) % 997) * 0.32)

  const line = pickBoltLine(cx, cy, tx, ty, bolt.branchMag, bolt.firesAt)

  // Core stroke.
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.strokeStyle = `rgba(235,240,255,${alpha})`
  ctx.lineWidth = 1.6 + env * 2.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  for (let i = 0; i < line.length; i++) {
    const p = line[i]
    if (i === 0) ctx.moveTo(p.x, p.y)
    else ctx.lineTo(p.x, p.y)
  }
  ctx.stroke()

  // Branch arms from a couple of interior points.
  const branchSeeds = [0.35, 0.62]
  for (const bs of branchSeeds) {
    const bIdx = Math.floor(bs * (line.length - 1))
    if (bIdx >= line.length - 1) continue
    const p = line[bIdx]
    const dir = bs < 0.5 ? 1 : -1
    const len = 0.2 + bolt.branchMag * 0.5
    const branch = pickBoltLine(
      p.x,
      p.y,
      p.x + dir * (w * 0.08),
      p.y + len * h,
      bolt.branchMag * 0.8,
      bolt.firesAt + bs * 100,
    )
    ctx.strokeStyle = `rgba(210,222,255,${alpha * 0.7})`
    ctx.lineWidth = 0.8 + env * 1.1
    ctx.beginPath()
    for (let i = 0; i < branch.length; i++) {
      const bp = branch[i]
      if (i === 0) ctx.moveTo(bp.x, bp.y)
      else ctx.lineTo(bp.x, bp.y)
    }
    ctx.stroke()
  }

  // Soft glow around the core channel.
  ctx.shadowColor = `rgba(190,210,255,${alpha * 0.6})`
  ctx.shadowBlur = 20 + env * 28
  ctx.strokeStyle = `rgba(235,240,255,${alpha * 0.3})`
  ctx.lineWidth = 6 + env * 10
  ctx.beginPath()
  for (let i = 0; i < line.length; i++) {
    const p = line[i]
    if (i === 0) ctx.moveTo(p.x, p.y)
    else ctx.lineTo(p.x, p.y)
  }
  ctx.stroke()
  ctx.restore()
}

/**
 * Create a storm overlay canvas + lightning scheduler.
 * The canvas is rendered behind UI but above rain/clouds via z-index in CSS.
 * Returns a handle to destroy the animation loop.
 */
export interface StormHandle {
  destroy(): void
}

export function createStormEngine(
  canvas: HTMLCanvasElement,
): StormHandle {
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return { destroy: () => undefined }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let w = 0
  let h = 0

  const build = () => {
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
  }

  build()
  let onResize = () => build()
  window.addEventListener('resize', onResize)

  let raf = 0
  let t = 0
  let last = performance.now()

  // Bolt scheduling: lightning fires when weather is active enough.
  // Conditions are deliberately permissive so bolts are visible.
  let nextBoltAt = 1.5

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (document.hidden) return
    t += dt

    // Update weather lightning intensity for downstream readers.
    const activeBolts = bolts.filter((b) => now / 1000 - b.firesAt < 0.35)
    let intensity = 0
    for (const b of activeBolts) {
      drawBolt(ctx, w, h, b, 1, now / 1000)
      intensity = Math.max(intensity, b.peak)
    }
    weather.lightning = intensity

    // Re-clear each frame so we can draw a fresh flash.
    ctx.clearRect(0, 0, w, h)

    // Schedule next bolt when weather is stormy or we're in the deeper sections.
    // Lower thresholds make lightning more visible throughout.
    const stormThreshold = Math.min(weather.density, weather.glow)
    if (
      stormThreshold > 0.3 &&
      bolts.length < 3
    ) {
      if (t >= nextBoltAt) {
        scheduleBolt(t)
        // Pace bolts 1.5-5s apart for a stormy feel.
        nextBoltAt = t + 1.5 + rnd(Math.floor(t * 1000) % 997) * 3.5
      }
    } else {
      nextBoltAt = Math.max(nextBoltAt, t + 0.4)
    }

    // Prune finished bolts.
    for (let i = bolts.length - 1; i >= 0; i--) {
      if (t - bolts[i].firesAt > 0.45) bolts.splice(i, 1)
    }
  }

  raf = requestAnimationFrame(frame)

  return {
    destroy() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      bolts.length = 0
      weather.lightning = 0
    },
  }
}

function scheduleBolt(t: number) {
  const mag = 0.5 + rnd(Math.floor(t * 1000 + 5) % 997) * 0.5
  bolts.push({
    firesAt: t,
    peak: 0.85 + rnd(Math.floor(t * 1000 + 11) % 997) * 0.15,
    branchMag: mag,
    echoAt: t + 0.06 + rnd(Math.floor(t * 1000 + 31) % 997) * 0.04,
  })
}
