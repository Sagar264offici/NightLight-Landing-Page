/**
 * TILE PLAY (§24) — NightLight's playful music-tile moment.
 * Compact, clearly part of NightLight. Tactile: pointer/touch ripples,
 * rhythmic glow pulses, timed transitions. 16 steps at 110 BPM ≈ 218ms.
 * Touch-safe: works via pointerdown without hijacking scroll (§53).
 */
import { useEffect, useRef, useState } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body, Micro } from '../ui/typography'
import { prefersReducedMotion } from '../perf/quality'

const STEP_MS = 60000 / 110 / 4 // 16th note at 110 BPM

export default function TilePlay() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  // Rhythmic pulse: a cursor sweeps the 4×4 grid; tiles light as it passes.
  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
    const id = window.setInterval(() => {
      setActive(i)
      i = (i + 1) % 16
    }, STEP_MS * 2)
    return () => window.clearInterval(id)
  }, [])

  const ripple = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--rx', `${e.clientX - r.left}px`)
    el.style.setProperty('--ry', `${e.clientY - r.top}px`)
    el.classList.remove('is-pressed')
    // Restart the ripple animation.
    void el.offsetWidth
    el.classList.add('is-pressed')
  }

  return (
    <section className="tiles" data-section="tiles">
      <div className="tiles__inner">
        <Reveal className="tiles__copy">
          <Eyebrow>One more thing · Tiles</Eyebrow>
          <Headline as="h2" size="md">Play the night back.</Headline>
          <Body>
            A small, tactile extra: traces of your tracks become tiles you can
            tap along to. Not a separate game — just another way to touch the
            music. Run a finger across the grid.
          </Body>
          <Micro>Best with touch — works with a cursor too.</Micro>
        </Reveal>

        <Reveal className="tiles__visual" delay={120}>
          <div
            className="tiles__grid"
            ref={gridRef}
            role="group"
            aria-label="Music tiles — playful interaction"
          >
            {Array.from({ length: 16 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`tiles__cell ${i === active ? 'is-pulse' : ''}`}
                aria-label={`Tile ${i + 1}`}
                onPointerDown={ripple}
                onPointerEnter={(e) => {
                  if (e.buttons > 0) ripple(e)
                }}
              />
            ))}
          </div>
          <div className="tiles__line" aria-hidden="true">
            <span />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
