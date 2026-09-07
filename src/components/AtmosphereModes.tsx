/**
 * ATMOSPHERE MODES (§08) — Three visual/performance modes as a product feature.
 * LOW POWER / AMBIENT / ANIMATION. Switching visibly changes the environment.
 * Not website animation settings — a real NightLight product capability.
 */
import { useState } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body } from '../ui/typography'

type Mode = 'low' | 'ambient' | 'animation'

const MODES = [
  {
    id: 'low' as Mode,
    name: 'Low Power',
    icon: '🔋',
    desc: 'Minimal particles. Subtle static atmosphere. Battery efficient.',
  },
  {
    id: 'ambient' as Mode,
    name: 'Ambient',
    icon: '🌙',
    desc: 'Slow clouds. Light rain. Soft lighting. Calm atmosphere.',
  },
  {
    id: 'animation' as Mode,
    name: 'Animation',
    icon: '⚡',
    desc: 'Full rain depth. Cloud movement. Parallax. Maximum immersion.',
  },
]

export default function AtmosphereModes() {
  const [mode, setMode] = useState<Mode>('ambient')

  return (
    <section className="modes" data-section="modes">
      <div className="modes__inner">
        <Reveal>
          <Eyebrow>Adaptive Visuals</Eyebrow>
          <Headline as="h2" size="md">Three ways to see the night.</Headline>
          <Body className="modes__body">
            NightLight adapts the visual experience to what the listener wants.
            Choose how immersive the environment feels — from battery-efficient
            calm to full atmospheric depth.
          </Body>
        </Reveal>

        <Reveal delay={150}>
          <div className="modes__toggle" role="radiogroup" aria-label="Visual mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={mode === m.id}
                className={`modes__btn ${mode === m.id ? 'is-active' : ''}`}
                onClick={() => setMode(m.id)}
              >
                {m.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="modes__preview">
            {MODES.map((m) => (
              <div
                key={m.id}
                className={`modes__card ${mode === m.id ? 'is-active' : ''}`}
              >
                <div className="modes__card-icon">{m.icon}</div>
                <div className="modes__card-name">{m.name}</div>
                <div className="modes__card-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
