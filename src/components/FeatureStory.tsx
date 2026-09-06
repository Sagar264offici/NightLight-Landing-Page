/**
 * FEATURE STORY (§22) — four visually distinct chapters, four compositions.
 * No repeated card grid. Motion language shifts per chapter:
 * 01 slow drift · 02 typographic reveal · 03 horizontal shelf · 04 fast/decisive.
 */
import { useState, type CSSProperties } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body, Micro } from '../ui/typography'
import { TRACKS_MUTABLE } from '../config/site'

function ArtTile({
  title,
  artist,
  idx,
}: {
  title: string
  artist: string
  idx: number
}) {
  return (
    <figure
      className="ch1__tile"
      style={{ '--i': idx } as React.CSSProperties}
    >
      <figcaption>
        <span className="ch1__t">{title}</span>
        <span className="ch1__a">{artist}</span>
      </figcaption>
    </figure>
  )
}

export default function FeatureStory() {
  const [instantIdx, setInstantIdx] = useState(0)

  return (
    <section className="features" id="features" data-section="features">
      {/* ---------- CHAPTER 01 — FIND YOUR NIGHT ---------- */}
      <div className="chapter chapter--01">
        <div className="chapter__copy">
          <Reveal>
            <Eyebrow>Chapter 01 · Discovery</Eyebrow>
            <Headline as="h3" size="md">Find your night.</Headline>
            <Body>
              Mood, hour, weather, the pace of your week — NightLight reads the
              room and lines up records for it. You just pick one and sink in.
            </Body>
          </Reveal>
        </div>
        <Reveal className="chapter__visual" delay={120}>
          <div className="ch1__shelf" aria-label="Album discovery shelf">
            {[
              ...TRACKS_MUTABLE.map((t) => ({ title: t.title, artist: t.artist })),
              { title: 'Half-Lit Rooms', artist: 'Ora Meridian' },
              { title: 'Gravel & Gold', artist: 'Field Notes' },
            ].map((a, i) => (
              <ArtTile key={a.title} idx={i} {...a} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* ---------- CHAPTER 02 — HEAR THE WORDS ---------- */}
      <div className="chapter chapter--02">
        <Reveal>
          <Eyebrow>Chapter 02 · Lyrics</Eyebrow>
          <Headline as="h3" size="md">Hear the words.</Headline>
        </Reveal>
        <div className="ch2__lyrics">
          {[
            'streetlights on the ceiling again',
            'the city hums in a lower key',
            'and the chorus arrives like rain',
          ].map((line, i) => (
            <Reveal key={line} delay={i * 260}>
              <p className={`ch2__line ${i === 1 ? 'is-quiet' : ''}`}>{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <Body className="ch2__note">
            Time-synced lyrics set like typography — the words belong to the
            darkness, not to a panel.
          </Body>
        </Reveal>
      </div>

      {/* ---------- CHAPTER 03 — KEEP THE FEELING GOING ---------- */}
      <div className="chapter chapter--03">
        <Reveal className="chapter__copy">
          <Eyebrow>Chapter 03 · Continuous</Eyebrow>
          <Headline as="h3" size="md">Keep the feeling going.</Headline>
          <Body>
            Favorites, history and playlists that connect into one unbroken
            evening. When a record ends, the night doesn't.
          </Body>
        </Reveal>
        <Reveal className="chapter__visual" delay={140}>
          <ul className="ch3__shelf" aria-label="Playlists">
            {[
              { name: 'After Midnight', meta: 'Built from your late hours', spine: 'linear-gradient(180deg,#24344f,#0d1420)' },
              { name: 'Rainy Hours', meta: 'For the sound on the window', spine: 'linear-gradient(180deg,#1f3b44,#0b1216)' },
              { name: 'Night Drive', meta: 'Headlights and low end', spine: 'linear-gradient(180deg,#2c2a4a,#0e0d1c)' },
              { name: 'Slow Static', meta: 'Songs you keep rediscovering', spine: 'linear-gradient(180deg,#3a2f42,#120e16)' },
            ].map((p) => (
              <li key={p.name} className="ch3__row">
                <span className="ch3__spine" style={{ background: p.spine }} aria-hidden="true" />
                <span className="ch3__meta">
                  <span className="ch3__name">{p.name}</span>
                  <span className="ch3__sub">{p.meta}</span>
                </span>
                <span className="ch3__arrow" aria-hidden="true">→</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* ---------- CHAPTER 04 — PLAY. DON'T WAIT. ---------- */}
      <div className="chapter chapter--04">
        <Reveal className="chapter__copy">
          <Eyebrow>Chapter 04 · Instant</Eyebrow>
          <Headline as="h3" size="md">Play. Don’t wait.</Headline>
          <Body>
            Tap a song and it plays — no spinner, no ceremony. The rest of the
            interface catches up while the first second is already in the air.
          </Body>
          <Micro>Try it — pick a track.</Micro>
        </Reveal>
        <Reveal className="chapter__visual" delay={100}>
          <div className="ch4__list" role="listbox" aria-label="Instant playback demo">
            {TRACKS_MUTABLE.map((t, i) => {
              const active = i === instantIdx
              return (
                <button
                  key={t.title}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`ch4__row ${active ? 'is-playing' : ''}`}
                  onClick={() => setInstantIdx(i)}
                >
                  <span
                    className="ch4__art"
                    aria-hidden="true"
                    style={
                      {
                        background: t.gradient,
                        ...(t.coverUrl ? { backgroundImage: `url(${t.coverUrl})` } : {}),
                      } as CSSProperties
                    }
                  />
                  <span className="ch4__meta">
                    <span className="ch4__t">{t.title}</span>
                    <span className="ch4__a">{t.artist}</span>
                  </span>
                  <span className="ch4__state" aria-hidden="true">
                    {active ? <span className="ch4__pulse" /> : '▶'}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
