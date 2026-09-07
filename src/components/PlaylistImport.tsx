/**
 * PLAYLIST IMPORT (§18, §19) — Dedicated section.
 * Supported: Spotify, Apple Music, YouTube / YouTube Music.
 * Visual sequence: Paste Link → Read Playlist → Match Songs → Create → Ready.
 * Simulated UI only — no fake backend calls.
 */
import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body } from '../ui/typography'

const STEPS = [
  { icon: '📋', label: 'Paste Link', detail: 'Spotify playlist URL' },
  { icon: '📖', label: 'Read Playlist', detail: '"Late Night" · 24 tracks' },
  { icon: '🔍', label: 'Match Songs', detail: '21 matched · 3 unavailable' },
  { icon: '✨', label: 'Create Playlist', detail: 'Building your NightLight playlist...' },
  { icon: '✅', label: 'Ready to Play', detail: 'Added to your library' },
]

export default function PlaylistImport() {
  const [step, setStep] = useState(-1)

  useEffect(() => {
    let current = 0
    const advance = () => {
      setStep(current)
      current++
      if (current <= STEPS.length) {
        setTimeout(advance, 1200)
      }
    }
    const timer = setTimeout(advance, 800)
    return () => clearTimeout(timer)
  }, [])

  const progress = step >= 0 ? Math.min(100, ((step + 1) / STEPS.length) * 100) : 0

  return (
    <section className="import" id="import" data-section="import">
      <div className="import__inner">
        <div className="import__head">
          <Reveal>
            <Eyebrow>Playlist Import</Eyebrow>
            <Headline as="h2" size="md">Bring your music over.</Headline>
            <Body className="import__body">
              Paste a playlist link from your current music app. NightLight
              matches available tracks to your library — no rebuilding
              from scratch.
            </Body>
          </Reveal>

          <Reveal delay={150}>
            <div className="import__supported">
              <span className="import__badge">Spotify</span>
              <span className="import__badge">Apple Music</span>
              <span className="import__badge">YouTube Music</span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="micro" style={{ marginTop: 'clamp(16px, 2vh, 24px)' }}>
              Matches available tracks to your NightLight library.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="import__flow">
            <div className="import__panel">
              <div className="import__panel-header">
                <div className="import__panel-icon" style={{ background: 'rgba(30, 215, 96, 0.12)', border: '1px solid rgba(30, 215, 96, 0.25)' }}>
                  🟢
                </div>
                <div>
                  <div className="import__panel-title">Spotify</div>
                  <div className="import__panel-sub">"Late Night" · 24 tracks</div>
                </div>
              </div>

              <div className="import__steps">
                {STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`import__step ${
                      i === step ? 'is-active' : i < step ? 'is-done' : ''
                    }`}
                  >
                    <div className="import__step-icon">
                      {i < step ? '✓' : s.icon}
                    </div>
                    <div>
                      <div className="import__step-text">{s.label}</div>
                      <div className="import__step-detail">
                        {i === step ? s.detail : i < step ? 'Done' : 'Waiting...'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="import__progress">
                <div className="import__progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
