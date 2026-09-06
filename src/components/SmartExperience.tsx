/**
 * SMART EXPERIENCE (§23) — intelligence communicated as atmosphere.
 * A quiet field of contexts (time / mood / weather / patterns) with a soft
 * selector pulse. No ML diagrams, no "AI understands you" claims.
 */
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body } from '../ui/typography'
import { DownloadButton } from '../ui/DownloadButton'
import { SMART_WORDS } from '../config/site'

export default function SmartExperience() {
  return (
    <section className="smart" id="experience" data-section="smart">
      <div className="smart__inner">
        <Reveal>
          <Eyebrow>Smart listening</Eyebrow>
          <Headline as="h2" size="md">It knows the hour you’re in.</Headline>
          <Body className="smart__body">
            NightLight pays attention to context — time, mood, weather, the
            shape of your listening — and quietly adjusts what it offers. The
            intelligence is invisible. You simply notice the night fits better.
          </Body>
        </Reveal>

        <Reveal delay={150}>
          <ul className="smart__field" aria-label="Contexts NightLight responds to">
            {SMART_WORDS.map((w, i) => (
              <li
                key={w}
                className={`smart__word ${i === 4 ? 'is-selected' : ''}`}
                style={{ '--d': `${(i * 1.37) % 5}s` } as React.CSSProperties}
              >
                {w}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* §50 — one mid-page CTA, placed where desire has been built. */}
        <Reveal delay={250}>
          <div className="smart__cta">
            <DownloadButton>Download NightLight</DownloadButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
