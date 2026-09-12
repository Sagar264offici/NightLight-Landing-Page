/**
 * SEO CONTENT — semantic product explanation for search engines and accessibility.
 * Provides crawlable, structured content about what NightLight is and why use it.
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
            NightLight is a free music player that runs entirely in your web browser. No installation required — just open the page and start listening. It's designed for people who want a simple, focused music experience without the complexity of traditional streaming apps.
          </Body>
        </div>

        <div className="seo-content__section">
          <Headline as="h2" id="simpler-way-to-listen" size="md">
            A simpler way to listen to music
          </Headline>
          <Body>
            Most music players are built around playlists, algorithms, and social features. NightLight takes a different approach: it's a lightweight, distraction-free player that puts your music first. The interface stays out of your way so you can focus on the listening experience.
          </Body>
        </div>

        <div className="seo-content__section">
          <Headline as="h2" id="why-use-nightlight" size="md">
            Why use NightLight?
          </Headline>
          <ul className="seo-content__features">
            <li>
              <Headline as="h3" size="md">Free and open</Headline>
              <Body>No subscription, no account required. Just music.</Body>
            </li>
            <li>
              <Headline as="h3" size="md">Works in any browser</Headline>
              <Body>Runs on desktop, mobile, tablet — anywhere with a modern browser.</Body>
            </li>
            <li>
              <Headline as="h3" size="md">Focused on the music</Headline>
              <Body>Clean interface, album artwork, synced lyrics, and smart shuffle modes — all designed around the listening experience.</Body>
            </li>
            <li>
              <Headline as="h3" size="md">Lightweight and fast</Headline>
              <Body>No heavy electron wrapper, no background processes. Loads instantly and uses minimal resources.</Body>
            </li>
            <li>
              <Headline as="h3" size="md">Modern web technology</Headline>
              <Body>Built with React 19, optimized for performance with code splitting and lazy loading.</Body>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}