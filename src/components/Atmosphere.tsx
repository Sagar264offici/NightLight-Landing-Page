/**
 * ATMOSPHERE (§08, §32, §33) — the fixed environmental backdrop.
 * Stacked layers: sky → clouds canvas → moonlight + city glow → rain canvas
 * → film grain → vignette. Mounted once; everything else scrolls above it.
 * VERY LOW tier (reduced motion / save-data): static gradients only (§26).
 */
import { useEffect, useRef } from 'react'
import { createRainEngine, type RainHandle } from '../engine/rain'
import { createCloudEngine, type CloudHandle } from '../engine/clouds'
import { initLightning } from '../engine/lightning'
import { createTreeShakeEngine } from '../engine/trees'
import { pointer, installPointerPhysics } from '../hooks/usePointer'
import { installScrollDirector } from '../hooks/useScrollDirector'
import { detectQuality } from '../perf/quality'

let grainTile: string | null = null

/** Pre-render one small noise tile; CSS repeats it. Felt, not noticed (§32). */
function getGrainTile(): string {
  if (grainTile) return grainTile
  const size = 120
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')
  if (ctx) {
    const img = ctx.createImageData(size, size)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 110 + Math.random() * 90
      img.data[i] = v
      img.data[i + 1] = v
      img.data[i + 2] = v
      img.data[i + 3] = 14 // extremely low alpha
    }
    ctx.putImageData(img, 0, 0)
    grainTile = c.toDataURL()
  }
  return grainTile ?? ''
}

export default function Atmosphere() {
  const rainRef = useRef<HTMLCanvasElement>(null)
  const cloudRef = useRef<HTMLCanvasElement>(null)
  const stormRef = useRef<HTMLCanvasElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tier = detectQuality()
    const offPointer = installPointerPhysics()
    const offScroll = installScrollDirector()

    const rain: RainHandle | null =
      tier !== 'verylow' && rainRef.current
        ? createRainEngine(rainRef.current, tier)
        : null
    const clouds: CloudHandle | null =
      tier !== 'verylow' && cloudRef.current
        ? createCloudEngine(cloudRef.current, tier)
        : null
    if (tier !== 'verylow' && stormRef.current) {
      initLightning(stormRef.current)
    }
    const trees =
      tier !== 'verylow' && rootRef.current
        ? createTreeShakeEngine(rootRef.current)
        : null

    // Pointer → CSS vars for moonlight/glow drift (§12, §33). rAF-gated,
    // only when the smoothed pointer has actually moved.
    let raf = 0
    if (tier === 'high' || tier === 'medium') {
      const tick = () => {
        const el = rootRef.current
        if (el && pointer.active) {
          el.style.setProperty('--ptr-x', pointer.sx.toFixed(4))
          el.style.setProperty('--ptr-y', pointer.sy.toFixed(4))
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      rain?.destroy()
      clouds?.destroy()
      // lightning has no destroy (runs on setInterval)
      trees?.destroy()
      offPointer()
      offScroll()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="atmosphere" ref={rootRef} aria-hidden="true">
      {/* L01 — deep black/blue sky */}
      <div className="sky" />
      {/* L03/L04 — clouds (canvas, animated) */}
      <canvas className="clouds" ref={cloudRef} />
      {/* L05 — moonlight */}
      <div className="moonlight" />
      {/* L06 — distant city glow on the horizon */}
      <div className="city-glow" />
      {/* L07–L09 — procedural rain */}
      <canvas className="rain" ref={rainRef} />
      {/* L09b — lightning / storm flash */}
      <canvas className="storm" ref={stormRef} aria-hidden="true" />
      {/* L10 — film grain */}
      <div className="grain" style={{ backgroundImage: `url(${getGrainTile()})` }} />
      {/* L11 — vignette */}
      <div className="vignette" />
    </div>
  )
}
