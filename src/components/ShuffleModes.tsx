/**
 * SHUFFLE MODES (§10, §11) — A MAJOR product feature.
 * Three distinct shuffle modes with interactive queue visualization.
 * OFF / SMART SHUFFLE / RANDOM SHUFFLE. Each mode transforms the queue visibly.
 */
import { useState, useMemo } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body, Micro } from '../ui/typography'

type ShuffleMode = 'off' | 'smart' | 'random'

const SONGS = [
  'Perfect',
  'Attention',
  'Levitating',
  'Paaro',
  'Pal Pal',
  'Closer',
  'Chal Bombay',
  'Timeless',
  'Lonely',
  'Piano Man',
]

/** Deterministic shuffle for random mode — same seed gives same result. */
function seededShuffle(arr: string[], seed: number): string[] {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const SMART_ORDER = ['Perfect', 'Levitating', 'Attention', 'Paaro', 'Closer', 'Timeless', 'Lonely', 'Pal Pal', 'Piano Man', 'Chal Bombay']
const RANDOM_ORDER = seededShuffle(SONGS, 42)

export default function ShuffleModes() {
  const [mode, setMode] = useState<ShuffleMode>('off')

  const queue = useMemo(() => {
    if (mode === 'off') return SONGS
    if (mode === 'smart') return SMART_ORDER
    return RANDOM_ORDER
  }, [mode])

  return (
    <section className="shuffle" id="shuffle" data-section="shuffle">
      <div className="shuffle__inner">
        <div className="shuffle__copy">
          <Reveal>
            <Eyebrow>Three shuffle modes</Eyebrow>
            <Headline as="h2" size="md">Every song gets its turn.</Headline>
            <Body className="shuffle__body">
              NightLight doesn't treat shuffle as one thing. Three distinct modes
              give you control over how the queue plays — from sequential order
              to context-aware listening to true random.
            </Body>
          </Reveal>

          <Reveal delay={150}>
            <div className="shuffle__controls">
              <button
                type="button"
                className={`shuffle__mode-btn ${mode === 'off' ? 'is-active' : ''}`}
                onClick={() => setMode('off')}
              >
                Off
              </button>
              <button
                type="button"
                className={`shuffle__mode-btn ${mode === 'smart' ? 'is-active' : ''}`}
                onClick={() => setMode('smart')}
              >
                Smart
              </button>
              <button
                type="button"
                className={`shuffle__mode-btn ${mode === 'random' ? 'is-active' : ''}`}
                onClick={() => setMode('random')}
              >
                Random
              </button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <Micro className="shuffle__note">
              {mode === 'off' && 'Sequential — queue plays in its normal order.'}
              {mode === 'smart' && 'Context-aware — relevance, mood, language, history.'}
              {mode === 'random' && 'True shuffle — every eligible song gets its turn.'}
            </Micro>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="shuffle__visual">
            <div className="shuffle__queue" role="list" aria-label="Queue visualization">
              {queue.map((song, i) => (
                <div
                  key={`${mode}-${song}`}
                  className={`shuffle__track ${i === 0 ? 'is-current' : ''}`}
                  style={{ transitionDelay: `${i * 30}ms` }}
                  role="listitem"
                >
                  <span className="shuffle__track-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="shuffle__track-name">{song}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
