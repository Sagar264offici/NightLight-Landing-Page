/**
 * WAVEFORM (§21) — "light responding to sound."
 * A low-amplitude composite sine line that breathes. When the prototype is
 * "playing" the amplitude and pace rise slightly. No equalizer bars.
 * Pauses when off-screen or tab hidden (§27).
 */
import { useEffect, useRef } from 'react'
import { player } from '../engine/playerStore'
import { useInView } from '../hooks/useReveal'
import { prefersReducedMotion } from '../perf/quality'

export default function Waveform({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>('0px')

  useEffect(() => {
    if (prefersReducedMotion()) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !inView) return

    let raf = 0
    let t = 0
    let last = performance.now()
    let amp = 0.35 // smoothed playing-state amplitude

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width * dpr))
      canvas.height = Math.max(1, Math.round(r.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (document.hidden) return
      t += dt * (0.6 + amp * 1.1)

      const playing = player.get().playing
      amp += ((playing ? 1 : 0.35) - amp) * 0.02

      const r = canvas.getBoundingClientRect()
      const w = r.width
      const h = r.height
      ctx.clearRect(0, 0, w, h)

      // Two soft passes: a halo + a core line (light, not bars).
      for (const pass of [0, 1]) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 4) {
          const nx = x / w
          const envelope = Math.sin(nx * Math.PI) // fade at edges
          const y =
            h / 2 +
            Math.sin(nx * 9.4 + t * 1.3) * 4.2 * amp * envelope +
            Math.sin(nx * 23.7 - t * 0.9) * 2.1 * amp * envelope +
            Math.sin(nx * 3.1 + t * 0.5) * 5.5 * amp * envelope
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle =
          pass === 0 ? 'rgba(169,200,255,0.10)' : 'rgba(190,214,255,0.28)'
        ctx.lineWidth = pass === 0 ? 6 : 1.4
        ctx.lineCap = 'round'
        ctx.stroke()
      }
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [inView])

  return (
    <div className={`waveform ${className}`} ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
