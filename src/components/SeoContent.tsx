/**
 * SEO CONTENT — semantic product explanation for search engines and accessibility.
 * Provides crawlable, structured content describing the NightLight Android app.
 */
import { Headline, Body } from '../ui/typography'

export default function SeoContent() {
  return (
    <section className="seo-content" aria-labelledby="what-is-nightlight">
      <div className="seo-content__inner">
        <div className="seo-content__section">
          <Headline as="h2" id="what-is-nightlight" size="md">
            What is NightLight?
          </Headline>
          <Body>
            NightLight is a modern Android music player. It pairs a focused, beautiful playback
            experience with contextual discovery — mood-aware shuffle, trending tracks, weather
            and time-aware recommendations, and related-song radio.
          </Body>
        </div>

        <div className="seo-content__section">
          <Headline as="h2" id="simpler-way-to-listen" size="md">
            A music player that adapts to the moment
          </Headline>
          <Body>
            Most music players are built around search and libraries. NightLight is built around
            listening context. The app reads the time of day, weather, mood signals, and your
            listening history to shape recommendations and shuffle — the music fits where you are,
            not the other way around.
          </Body>
        </div>

        <div className="seo-content__section">
          <Headline as="h2" id="why-use-nightlight" size="md">
            Why use NightLight?
          </Headline>
          <ul className="seo-content__features">
            <li>
              <Headline as="h3" size="md">Free and open source</Headline>
              <Body>No subscription, no premium tier. The code is public under the MIT license.</Body>
            </li>
            <li>
              <Headline as="h3" size="md">Contextual discovery</Headline>
              <Body>Trending tracks, weather and time-aware recommendations, and related-song radio keep discovery fresh.</Body>
            </li>
            <li>
              <Headline as="h3" size="md">A complete Android player</Headline>
              <Body>Playlists, favorites, synced lyrics, background playback, and a modern now-playing screen.</Body>
            </li>
            <li>
              <Headline as="h3" size="md">Background playback</Headline>
              <Body>Music keeps playing through locks and app switches via a proper Android media service.</Body>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}