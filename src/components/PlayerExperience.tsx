/**
 * PLAYER EXPERIENCE (§18, §19, §20) — the product reveal.
 * A tall native-scroll section with a sticky stage. Scroll progress sets one
 * CSS variable per frame; all reveal styling derives from it in CSS:
 * the phone brightens/scales, captions fade in, ambient light shifts.
 * The phone is the SAME interactive prototype — controls already work.
 */
import { useEffect, useRef } from 'react'
import PhoneMock from './PhoneMock'
import Waveform from './Waveform'
import { clamp } from '../lib/math'
import { prefersReducedMotion } from '../perf/quality'
import { Eyebrow, Headline, Body, Micro } from '../ui/typography'

export default function PlayerExperience() {
  const secRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const sec = secRef.current
    const stage = stageRef.current
    if (!sec || !stage) return

    let raf = 0
    const tick = () => {
      const r = sec.getBoundingClientRect()
      const total = Math.max(1, r.height - window.innerHeight)
      const p = clamp(-r.top / total)
      stage.style.setProperty('--rx-p', p.toFixed(4))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="rx" id="product" data-section="product" ref={secRef}>
      <div className="rx__stage" ref={stageRef}>
        <div className="rx__copy">
          <Eyebrow>The player</Eyebrow>
          <Headline as="h2" size="lg">
            Music should feel
            <br />
            like something.
          </Headline>
          <Body className="rx__body">
            Not a dashboard. Not a file browser. A room where your music lives —
            artwork that breathes, lyrics that arrive with the line, light that
            follows the sound.
          </Body>

          <div className="rx__captions" aria-hidden="false">
            <p className="rx__caption" style={{ '--at': 0.22 } as React.CSSProperties}>
              Artwork first — the album sets the light.
            </p>
            <p className="rx__caption" style={{ '--at': 0.42 } as React.CSSProperties}>
              Controls where your thumb already is.
            </p>
            <p className="rx__caption" style={{ '--at': 0.62 } as React.CSSProperties}>
              Lyrics, one line at a time.
            </p>
          </div>

          <Micro className="rx__micro">
            Interactive prototype — try the controls.
          </Micro>
        </div>

        <div className="rx__device">
          <div className="rx__glow" aria-hidden="true" />
          <PhoneMock interactive />
        </div>

        <Waveform className="rx__wave" />
      </div>
    </section>
  )
}
