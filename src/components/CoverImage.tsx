/**
 * © NightLight — responsive cover art (perf brief §1-4, §22-23).
 *
 * Renders a <picture> (AVIF → WebP → PNG universal fallback) with an explicit
 * srcset per render tier so the browser downloads only the bytes needed at the
 * density/resolution it actually uses — never the 5-KB-for-a-thumbnail problem.
 * width/height are always set (the art box is reserved in layout → CLS stays 0).
 */
import type { CSSProperties } from 'react'

export interface CoverImageProps {
  /** PNG source under /covers, e.g. '/covers/attention-charlie-puth.png' */
  src: string
  /** Decorative art → ''; meaningfully described art keeps its titre/artist text. */
  alt?: string
  /** Rendered width (CSS px). Height defaults to square (aspect-ratio 1). */
  width: number
  height?: number
  /** Above-the-fold hero only. Everything else is lazy + async. */
  eager?: boolean
  /** For the LCP slot only. */
  fetchPriority?: 'high'
  className?: string
  style?: CSSProperties
}

const TIERS = [160, 320, 640]

function widen(png: string, ext: 'webp' | 'avif'): string {
  const base = png.replace(/\.png$/, '')
  return TIERS.map((w) => `${base}-${w}w.${ext} ${w}w`).join(', ')
}

export default function CoverImage({
  src,
  alt = '',
  width,
  height,
  eager = false,
  fetchPriority,
  className,
  style,
}: CoverImageProps) {
  const h = height ?? width
  return (
    <picture className={className} style={style}>
      <source type="image/avif" srcSet={widen(src, 'avif')} sizes={`${width}px`} />
      <source type="image/webp" srcSet={widen(src, 'webp')} sizes={`${width}px`} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={h}
        style={{ aspectRatio: `${width} / ${h}`, width: '100%', height: '100%', objectFit: 'cover' }}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        {...(fetchPriority ? { fetchPriority } : {})}
      />
    </picture>
  )
}
