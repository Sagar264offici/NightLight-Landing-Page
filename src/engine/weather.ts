/**
 * Shared, mutable weather state (§11 WEATHER REACTIVITY).
 * The scroll director writes it; the rain/cloud canvases read it every frame.
 * No React state involved — atmosphere never re-renders the UI tree.
 */
export interface WeatherState {
  /** Rain density multiplier, 0–1. */
  density: number
  /** 0 = normal rain, 1 = finer, quieter rain. */
  fine: number
  /** Horizontal wind, px/s. */
  drift: number
  /** Ambient glow response (scroll-linked "night depth"), 0–1. */
  glow: number
  /** Lightning intensity for this frame, 0..1. Driven by the storm engine. */
  lightning: number
}

export const weather: WeatherState = {
  density: 1,
  fine: 0,
  drift: -14,
  glow: 0.35,
  lightning: 0,
}
