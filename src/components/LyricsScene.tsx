/**
 * LYRICS SCENE (§13) — Lyrics deserve their own cinematic section.
 * Uses "Perfect — Ed Sheeran". Readable lyrics, current line highlighted,
 * subtle scrolling, beautiful typography, dark atmospheric background.
 * PLAY → LYRICS → SYNC → FOLLOW THE SONG.
 */
import { useEffect, useRef, useState } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body } from '../ui/typography'
import { PERFECT_LYRICS } from '../config/site'
import { prefersReducedMotion } from '../perf/quality'

export default function LyricsScene() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lines = PERFECT_LYRICS.length
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % lines)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  // Keep the active line centered inside the lyrics container — without
  // touching the page scroll. The container itself is overflow:hidden, so
  // we adjust scrollTop directly on it.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeEl = container.querySelector<HTMLElement>('.lyrics-scene__line.is-active')
    if (activeEl) {
      const cRect = container.getBoundingClientRect()
      const aRect = activeEl.getBoundingClientRect()
      const offset = aRect.top - cRect.top - (cRect.height - aRect.height) / 2
      container.scrollTo({ top: container.scrollTop + offset, behavior: 'smooth' })
    }
  }, [active])

  return (
    <section className="lyrics-scene" data-section="lyrics">
      <div className="lyrics-scene__inner">
        <Reveal>
          <Eyebrow>Lyrics</Eyebrow>
          <Headline as="h2" size="md">Hear the words.</Headline>
          <Body className="lyrics-scene__body">
            Time-synced lyrics that set like typography — the words belong to the
            darkness, not to a panel. One line at a time, following the song.
          </Body>
        </Reveal>

        <Reveal delay={150}>
          <p className="micro" style={{ marginTop: 'clamp(24px, 4vh, 36px)', textAlign: 'center' }}>
            Perfect — Ed Sheeran · Available when lyrics are provided for the track.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div
            className="lyrics-scene__lines lyrics-scene__scroll"
            ref={containerRef}
            style={{ maxHeight: '360px' }}
          >
            {PERFECT_LYRICS.map((line, i) => {

              return (
                <p
                  key={i}
                  className={`lyrics-scene__line ${
                    i === active ? 'is-active' : i < active ? 'is-past' : ''
                  }`}
                  style={{
                    transitionDelay: `${Math.abs(i - active) * 40}ms`,
                  }}
                >
                  {line}
                </p>
              )
            })}
          </div>
        </Reveal>

        <p className="micro lyrics-scene__note">
          Lyrics · Sync · Follow the song.
        </p>
      </div>
    </section>
  )
}
