/**
 * HERO — first screen. Leads with the Android product identity.
 * Eyebrow / H1 / copy / CTAs on the left; floating device on the right.
 */
import DeviceShowcase from './DeviceShowcase'
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton'
import { Eyebrow, Headline, Body, Micro } from '../ui/typography'
import { REPO_URL } from '../config/site'

export default function Hero() {
  return (
    <section className="hero" id="top" data-section="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <Eyebrow>Android Music Player</Eyebrow>
          <Headline as="h1" size="xl">
            Music for
            <br />
            the moment you're in.
          </Headline>
          <Body className="hero__sub">
            NightLight is a modern Android music player built around smarter
            discovery and a beautifully focused listening experience — mood-aware
            shuffle, contextual recommendations, trending tracks, lyrics, and
            background playback.
          </Body>
          <div className="hero__ctas">
            <DownloadButton>Download for Android</DownloadButton>
            <SecondaryButton href="#what-is-nightlight">Explore the experience</SecondaryButton>
          </div>
          <Micro className="hero__micro">
            Free · Android 8.0+ · Open source on{' '}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)' }}>
              GitHub
            </a>
          </Micro>
        </div>

        <div className="hero__device">
          <DeviceShowcase />
        </div>
      </div>

      <div className="hero__scrollcue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}