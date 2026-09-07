/**
 * SHARE MUSIC / LISTEN TOGETHER (§14, §15, §16) — MAJOR SECTION.
 * Two devices, one shared session. Host → Share → Link → Join → Sync.
 * Then listening chat appears — secondary to music, part of the session.
 */
import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline } from '../ui/typography'

function MiniPhone({ track, artist, glowing }: { track: string; artist: string; glowing?: boolean }) {
  return (
    <div className="phone share__device-phone">
      <div className="phone__body" style={glowing ? { boxShadow: '0 0 0 2px rgba(216,181,106,0.25), 0 40px 90px -32px rgba(0,0,0,0.85), 0 0 70px -20px rgba(216,181,106,0.3)' } : undefined}>
        <div className="phone__screen">
          <div className="np">
            <header className="np__status">
              <span>11:47</span>
              <span className="np__status-dots" aria-hidden="true" />
            </header>
            <p className="np__context">NOW PLAYING</p>
            <div className="np__stage">
              <div className="np__art" aria-hidden="true" style={{ background: 'linear-gradient(160deg, #1a0a2e 0%, #0a0f18 100%)' }} />
            </div>
            <div className="np__meta">
              <div>
                <h3 className="np__title">{track}</h3>
                <p className="np__artist">{artist}</p>
              </div>
            </div>
          </div>
          <div className="phone__camera" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

const CHAT_MESSAGES = [
  { from: 'host' as const, text: 'this song is crazy', delay: 0 },
  { from: 'guest' as const, text: 'fr 😭', delay: 800 },
]

export default function ShareMusic() {
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="share" id="share" data-section="share">
      <div className="share__inner">
        <Reveal>
          <div className="share__head">
            <Eyebrow>Share Music</Eyebrow>
            <Headline as="h2" size="lg">
              Same song.<br />Different places.
            </Headline>
            <p className="body" style={{ margin: '20px auto 0', textAlign: 'center' }}>
              Start a NightLight session, share a link, and listen to the
              same track — together, in sync. Then talk about it in the
              listening chat.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="share__flow">
            <div className="share__device">
              <span className="share__device-label">Device A · Host</span>
              <MiniPhone track="Perfect" artist="Ed Sheeran" glowing />
            </div>

            <div className="share__center">
              <div className="share__link-label">Share Session</div>
              <div className="share__link-box">nightlight.app/l/ABC123</div>
              <div className="share__sync-line" />
              <div className="share__sync-dot" />
              <div className="share__sync-line" />
              <span className="share__arrow" aria-hidden="true">↓</span>
              <div className="share__sync-dot" />
              <div className="share__link-label">Joined · Synced</div>
            </div>

            <div className="share__device">
              <span className="share__device-label">Device B · Guest</span>
              <MiniPhone track="Perfect" artist="Ed Sheeran" glowing />
            </div>
          </div>
        </Reveal>

        {/* Listening Chat (§16) */}
        <Reveal delay={300}>
          <div className="share__chat">
            <div className="share__chat-head">
              <Eyebrow>Listening Chat</Eyebrow>
              <Headline as="h3" size="md">Listen together. Talk together.</Headline>
              <p className="body" style={{ margin: '14px auto 0', textAlign: 'center' }}>
                Music remains dominant. Chat is secondary — part of the session, not a distraction.
              </p>
            </div>

            {showChat && (
              <div className="share__chat-messages">
                {CHAT_MESSAGES.map((msg, i) => (
                  <div
                    key={i}
                    className={`share__msg share__msg--${msg.from}`}
                    style={{ animationDelay: `${msg.delay}ms` }}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
