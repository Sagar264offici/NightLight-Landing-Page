/**
 * FINAL CTA — deepest black, huge negative space. Emotional, not salesy.
 */
import { DownloadButton } from '../ui/DownloadButton'
import Reveal from '../ui/Reveal'
import { Headline, Body } from '../ui/typography'

export default function FinalCTA() {
  return (
    <section className="finale" id="download" data-section="finale">
      <Reveal className="finale__inner">
        <Headline as="h2" size="xl" className="finale__title">
          Your night.
          <br />
          Your music.
        </Headline>
        <Body className="finale__line">Put your headphones on.</Body>
        <div className="finale__cta">
          <DownloadButton>Download NightLight for Android</DownloadButton>
        </div>
      </Reveal>
    </section>
  )
}