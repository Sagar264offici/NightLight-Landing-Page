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
          <Eyebrow>Music After Dark.</Eyebrow>
          <Headline as="h1" size="xl">
            Listen
            <br />
            different.
          </Headline>
          <Body className="hero__sub">
            Your music player for the hours that feel different.
          </Body>
          <div className="hero__ctas">
            <DownloadButton>Download NightLight</DownloadButton>
            <SecondaryButton href="#experience">Explore the experience</SecondaryButton>
          </div>
          <Micro className="hero__micro">Free · Built for Android</Micro>
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
