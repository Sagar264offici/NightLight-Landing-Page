/**
 * MUSIC GALLERY — the collection as big circulating cards.
 * An infinite marquee drifting left→right, pausing on hover, each card
 * showing cover art (local thumbnail, gradient fallback), song name and
 * artist. Tapping a card loads it into the phone player below.
 * Reduced motion: the row becomes a normal scrollable strip (§26).
 */
import type { CSSProperties } from 'react'
import { player } from '../engine/playerStore'
import { TRACKS_MUTABLE } from '../config/site'
import { Eyebrow, Headline, Body } from '../ui/typography'
import type { Track } from '../config/site'

function GalleryCard({ track, index }: { track: Track; index: number }) {
  const style = {
    background: track.gradient,
    ...(track.coverUrl ? { backgroundImage: `url(${track.coverUrl})` } : {}),
  } as CSSProperties

  return (
    <button
      type="button"
      className="gal__card"
      aria-label={`Play ${track.title} by ${track.artist}`}
      onClick={() => player.play(index % TRACKS_MUTABLE.length)}
    >
      <span className="gal__art" aria-hidden="true" style={style} />
      <span className="gal__meta">
        <span className="gal__t">{track.title}</span>
        <span className="gal__a">{track.artist}</span>
      </span>
    </button>
  )
}

export default function MusicGallery() {
  // Two copies of the strip back-to-back; the -50% keyframe loop makes the
  // wrap seamless. Index modulo keeps queue clicks pointing at real tracks.
  return (
    <section className="gal" id="gallery" data-section="gallery">
      <div className="gal__head">
        <Eyebrow>The collection</Eyebrow>
        <Headline as="h2" size="md">
          Every cover, in orbit.
        </Headline>
        <Body className="gal__body">
          The night's soundtrack drifting past — hover to hold a card, tap to
          load it into the player.
        </Body>
      </div>

      <div className="gal__viewport">
        <div className="gal__strip" aria-hidden="false">
          {[0, 1].map((copy) => (
            <div className="gal__group" key={copy} aria-hidden={copy === 1}>
              {TRACKS_MUTABLE.map((t, i) => (
                <GalleryCard key={`${copy}-${t.title}`} track={t} index={i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
