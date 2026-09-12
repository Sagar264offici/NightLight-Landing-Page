/**
 * HERO (§06, §07, §16) — consumes the first screen (min 100svh).
 * Left: eyebrow / headline / copy / CTAs. Right: floating device.
 * Deliberately asymmetric; mobile stacks without overcrowding (§25).
 */
import DeviceShowcase from './DeviceShowcase'
import { DownloadButton, SecondaryButton } from '../ui/DownloadButton'
import { Eyebrow, Headline, Body, Micro } from '../ui/typography'

export default function Hero() {
  return (
    <section className="hero" id="top" data-section="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <Eyebrow>Free Music Player for the Web</Eyebrow>
          <Headline as="h1" size="xl">
            NightLight
            <br />
            — Free Music Player for the Web
          </Headline>
          <Body className="hero__sub">
            NightLight is a free, modern web music player built for simple, fast and focused music listening directly in your browser.
          </Body>
          <div className="hero__ctas">
            <DownloadButton>Download NightLight</DownloadButton>
            <SecondaryButton href="#experience">Explore the experience</SecondaryButton>
          </div>
          <Micro className="hero__micro">Free · Works in your browser</Micro>
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
