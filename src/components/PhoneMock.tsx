/**
 * PHONE MOCK (§13, §15) — the NightLight device presentation.
 * A believable Android player UI rendered in DOM: album art, title/artist,
 * transport, progress, lyrics entry, favorite, queue drawer, smart listening.
 * No fake hardware ornament — one punch-hole camera, nothing else.
 * All controls work visually against the shared player store (§20):
 * no audio exists, so nothing claims to play sound.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { player, type PlayerState } from '../engine/playerStore'
import { SAMPLE_LYRICS } from '../config/site'
import { fmtTime } from '../lib/format'

/* -- icons: minimal inline strokes, aria-hidden everywhere -- */
const IconPlay = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
)
const IconPause = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="7" y="5.5" width="3.4" height="13" rx="1" fill="currentColor" />
    <rect x="13.6" y="5.5" width="3.4" height="13" rx="1" fill="currentColor" />
  </svg>
)
const IconNext = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 6.5v11l8.5-5.5z" fill="currentColor" />
    <rect x="16.4" y="6.5" width="2.2" height="11" rx="1" fill="currentColor" />
  </svg>
)
const IconPrev = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17 6.5v11l-8.5-5.5z" fill="currentColor" />
    <rect x="5.4" y="6.5" width="2.2" height="11" rx="1" fill="currentColor" />
  </svg>
)
const IconHeart = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 20s-7.2-4.6-9-9c-1.1-2.8.7-6 3.8-6 1.9 0 3.4 1 4.2 2.6h2C13.8 6 15.3 5 17.2 5c3.1 0 4.9 3.2 3.8 6-1.8 4.4-9 9-9 9z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
)
const IconQueue = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 6h10M4 11h10M4 16h6" />
    <path d="M16.5 12v6.2M16.5 12l4-1.4v6.4" />
  </svg>
)
const IconLyrics = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M5 7h9M5 12h14M5 17h11" />
  </svg>
)

/* -- store subscription with selector granularity -- */
function usePlayer(): PlayerState {
  const [, force] = useState(0)
  useEffect(() => player.subscribe(() => force((n) => (n + 1) % 1000000)), [])
  return player.get()
}

/** Progress bar that updates via ref each frame — zero re-renders (§27). */
function Progress() {
  const fillRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let lastV = ''
    const tick = () => {
      const { time } = player.get()
      const dur = player.track.duration
      const ratio = dur > 0 ? time / dur : 0
      const v = ratio.toFixed(4)
      if (v !== lastV) {
        lastV = v
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${ratio})`
        if (timeRef.current) timeRef.current.textContent = fmtTime(time)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const seekFromEvent = (clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    player.seekRatio(Math.max(0, Math.min(1, (clientX - r.left) / r.width)))
  }

  return (
    <div className="np__progress">
      <span className="np__time" ref={timeRef} aria-hidden="true" />
      <div
        className="np__track"
        ref={trackRef}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          seekFromEvent(e.clientX)
        }}
        onPointerMove={(e) => {
          if (e.buttons > 0) seekFromEvent(e.clientX)
        }}
        role="slider"
        aria-label="Seek position"
        aria-valuemin={0}
        aria-valuemax={player.track.duration}
        aria-valuenow={Math.round(player.get().time)}
        aria-valuetext={`${fmtTime(player.get().time)} of ${fmtTime(player.track.duration)}`}
        tabIndex={0}
        onKeyDown={(e) => {
          const s = player.get().time
          if (e.key === 'ArrowRight') player.seek(s + 5)
          if (e.key === 'ArrowLeft') player.seek(s - 5)
        }}
      >
        <div className="np__fill" ref={fillRef} />
      </div>
      <span className="np__time np__time--dur">{fmtTime(player.track.duration)}</span>
    </div>
  )
}

/** Lyrics overlay — lines highlight with the simulated transport position. */
function Lyrics() {
  const { lyricsOpen, time } = usePlayer()
  const dur = player.track.duration
  const active = Math.min(
    SAMPLE_LYRICS.length - 1,
    Math.floor((time / dur) * SAMPLE_LYRICS.length),
  )
  return (
    <div className={`np__lyrics ${lyricsOpen ? 'is-open' : ''}`} aria-hidden={!lyricsOpen}>
      <div className="np__lyrics-inner">
        {SAMPLE_LYRICS.map((line, i) => (
          <p key={i} className={`np__lyric ${i === active ? 'is-active' : ''}`}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

/** Queue drawer — the real sample catalog, current track highlighted. */
function Queue() {
  const { index, queueOpen } = usePlayer()
  return (
    <div className={`np__queue ${queueOpen ? 'is-open' : ''}`} aria-hidden={!queueOpen}>
      <div className="np__queue-inner">
        {player.tracks.map((t, i) => (
          <button
            key={t.title}
            type="button"
            className={`np__queue-item ${i === index ? 'is-current' : ''}`}
            onClick={() => player.play(i)}
          >
            <span
              className="np__queue-art"
              aria-hidden="true"
              style={
                {
                  background: t.gradient,
                  ...(t.coverUrl
                    ? { backgroundImage: `url(${t.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : {}),
                } as CSSProperties
              }
            />
            <span className="np__queue-meta">
              <span className="np__queue-title">{t.title}</span>
              <span className="np__queue-artist">{t.artist}</span>
            </span>
            <span className="np__queue-dur">{fmtTime(t.duration)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function PhoneMock({ interactive = false }: { interactive?: boolean }) {
  const s = usePlayer()
  const track = player.track

  return (
    <div className={`phone ${interactive ? 'phone--lg' : ''}`} data-lyrics={s.lyricsOpen}>
      <div className="phone__body">
        <div className="phone__screen">
          <div className="np">
            <header className="np__status">
              <span>11:47</span>
              <span className="np__status-dots" aria-hidden="true" />
            </header>
            <p className="np__context">{track.context}</p>

            <div className="np__stage">
              <div
                className="np__art"
                aria-hidden="true"
                style={
                  {
                    background: track.gradient,
                    ...(track.coverUrl
                      ? { backgroundImage: `url(${track.coverUrl})` }
                      : {}),
                  } as CSSProperties
                }
              />
              <Lyrics />
              <Queue />
            </div>

            <div className="np__meta">
              <div className="np__meta-text">
                <h3 className="np__title">{track.title}</h3>
                <p className="np__artist">{track.artist}</p>
              </div>
              <button
                type="button"
                className={`np__icon-btn ${s.favorited ? 'is-on' : ''}`}
                aria-pressed={s.favorited}
                aria-label={s.favorited ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => player.toggleFavorite()}
              >
                <IconHeart filled={s.favorited} />
              </button>
            </div>

            <Progress />

            <div className="np__transport">
              <button type="button" className="np__icon-btn" aria-label="Previous track" onClick={() => player.prev()}>
                <IconPrev />
              </button>
              <button
                type="button"
                className={`np__play ${s.playing ? 'is-playing' : ''}`}
                aria-label={s.playing ? 'Pause (visual prototype — no audio)' : 'Play (visual prototype — no audio)'}
                onClick={() => player.toggle()}
              >
                {s.playing ? <IconPause /> : <IconPlay />}
              </button>
              <button type="button" className="np__icon-btn" aria-label="Next track" onClick={() => player.next()}>
                <IconNext />
              </button>
            </div>

            <footer className="np__smart">
              <button
                type="button"
                className={`np__icon-btn np__smart-btn ${s.lyricsOpen ? 'is-on' : ''}`}
                aria-pressed={s.lyricsOpen}
                aria-label="Show lyrics"
                onClick={() => player.toggleLyrics()}
              >
                <IconLyrics />
                <span>Lyrics</span>
              </button>
              <button
                type="button"
                className={`np__icon-btn np__smart-btn ${s.queueOpen ? 'is-on' : ''}`}
                aria-pressed={s.queueOpen}
                aria-label="Open queue"
                onClick={() => player.toggleQueue()}
              >
                <IconQueue />
                <span>Queue</span>
              </button>
              <span className="np__smart-pill" aria-hidden="true">Smart mix · on</span>
            </footer>
          </div>
          <div className="phone__camera" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
