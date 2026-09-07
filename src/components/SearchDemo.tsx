/**
 * SEARCH DEMO (§12) — NightLight understands track intent.
 * Interactive example: "Ed Sheeran Perfect" → canonical wins.
 * Then "Ed Sheeran Perfect acoustic" → acoustic moves to top.
 * Variants remain available without hijacking normal searches.
 */
import { useState } from 'react'
import Reveal from '../ui/Reveal'
import { Eyebrow, Headline, Body } from '../ui/typography'
import { SEARCH_DEMO } from '../config/site'

const SearchIcon = () => (
  <svg className="search-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

export default function SearchDemo() {
  const [queryIdx, setQueryIdx] = useState(0)
  const demo = SEARCH_DEMO[queryIdx]

  return (
    <section className="search-demo" data-section="search">
      <div className="search-demo__inner">
        <Reveal>
          <Eyebrow>Search</Eyebrow>
          <Headline as="h2" size="md">It knows what you mean.</Headline>
          <Body className="search-demo__body">
            NightLight understands track intent. Search for a song and the
            original version wins. Add a qualifier and the right variant
            moves to the top — without losing the rest.
          </Body>
        </Reveal>

        <Reveal delay={150}>
          <div className="search-demo__searchbar">
            <SearchIcon />
            <div
              className="search-demo__input"
              role="searchbox"
              aria-label="Search example"
              tabIndex={0}
            >
              {demo.query}
            </div>
          </div>

          <div className="search-demo__results">
            {demo.results.map((r, i) => (
              <div
                key={`${queryIdx}-${r.title}`}
                className={`search-demo__result ${r.canonical ? 'is-canonical' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="search-demo__result-meta">
                  <div className="search-demo__result-title">{r.title}</div>
                  <div className="search-demo__result-artist">{r.artist}</div>
                </div>
                {r.canonical && (
                  <span className="search-demo__result-badge is-canonical">Best match</span>
                )}
                {r.variant && !r.canonical && (
                  <span className="search-demo__result-badge">{r.variant}</span>
                )}
              </div>
            ))}
          </div>

          <div className="search-demo__tabs">
            {SEARCH_DEMO.map((d, i) => (
              <button
                key={i}
                type="button"
                className={`search-demo__tab ${queryIdx === i ? 'is-active' : ''}`}
                onClick={() => setQueryIdx(i)}
              >
                {d.query}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
