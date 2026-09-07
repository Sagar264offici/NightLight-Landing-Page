/**
 * LANGUAGE-AWARE RECOMMENDATIONS (§21) — NightLight respects what you want to hear.
 * Show English results, then switch to Hindi. Different sets, same intelligence.
 */
import { useState } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body } from '../ui/typography'
import { LANG_EN, LANG_HI, TRACKS_MUTABLE } from '../config/site'
import type { CSSProperties } from 'react'

type Lang = 'en' | 'hi'

export default function LanguageDemo() {
  const [lang, setLang] = useState<Lang>('en')
  const tracks = lang === 'en' ? LANG_EN : LANG_HI

  // Find matching cover art from the track list
  const getCover = (title: string) => {
    const t = TRACKS_MUTABLE.find((tr) => tr.title === title)
    return t
      ? {
          background: t.gradient,
          ...(t.coverUrl ? { backgroundImage: `url(${t.coverUrl})` } : {}),
        }
      : { background: 'linear-gradient(160deg, #1a1a2e, #0a0f18)' }
  }

  return (
    <section className="lang" data-section="language">
      <div className="lang__inner">
        <Reveal>
          <Eyebrow>Language-Aware</Eyebrow>
          <Headline as="h2" size="md">Respect what you actually want to hear.</Headline>
          <Body className="lang__body">
            NightLight adapts recommendations to your language preferences.
            Switch between English and Hindi — the suggestions change, but
            the quality stays the same.
          </Body>
        </Reveal>

        <Reveal delay={150}>
          <div className="lang__switcher" role="radiogroup" aria-label="Language preference">
            <button
              type="button"
              role="radio"
              aria-checked={lang === 'en'}
              className={`lang__btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => setLang('en')}
            >
              English
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={lang === 'hi'}
              className={`lang__btn ${lang === 'hi' ? 'is-active' : ''}`}
              onClick={() => setLang('hi')}
            >
              Hindi
            </button>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="lang__results" key={lang}>
            {tracks.map((t, i) => (
              <div
                key={t.title}
                className="lang__result"
                style={{
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: `msg-in 400ms var(--e-out) ${i * 80}ms forwards`,
                }}
              >
                <span
                  className="lang__result-art"
                  aria-hidden="true"
                  style={getCover(t.title) as CSSProperties}
                />
                <div className="lang__result-meta">
                  <div className="lang__result-title">{t.title}</div>
                  <div className="lang__result-artist">{t.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="micro" style={{ marginTop: 'clamp(20px, 3vh, 32px)', textAlign: 'center' }}>
          YOUR NIGHT changes based on your language preference.
        </p>
      </div>
    </section>
  )
}
