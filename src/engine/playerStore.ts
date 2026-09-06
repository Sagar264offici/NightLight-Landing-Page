/**
 * PLAYER STORE (§15, §20)
 * A visual prototype state machine. No audio exists, so none is claimed (§20, §47):
 * the progress clock is a simulated transport, and the UI copy never implies sound.
 * Tiny pub/sub so only subscribed components re-render.
 */
import { TRACKS_MUTABLE as TRACKS } from '../config/site'

export interface PlayerState {
  index: number
  playing: boolean
  /** Simulated transport position, seconds. */
  time: number
  favorited: boolean
  lyricsOpen: boolean
  queueOpen: boolean
  /** Bumped on every state change; cheap equality check for subscribers. */
  version: number
}

let state: PlayerState = {
  index: 0,
  playing: false,
  time: 38,
  favorited: false,
  lyricsOpen: false,
  queueOpen: false,
  version: 0,
}

const subs = new Set<() => void>()

function set(patch: Partial<PlayerState>) {
  state = { ...state, ...patch, version: state.version + 1 }
  for (const fn of subs) fn()
}

export const player = {
  get: () => state,
  get track() {
    return TRACKS[state.index]
  },
  get tracks() {
    return TRACKS
  },
  subscribe(fn: () => void): () => void {
    subs.add(fn)
    return () => {
      subs.delete(fn)
    }
  },
  toggle() {
    set({ playing: !state.playing })
  },
  next() {
    set({ index: (state.index + 1) % TRACKS.length, time: 0, favorited: false })
  },
  prev() {
    set({
      index: (state.index - 1 + TRACKS.length) % TRACKS.length,
      time: 0,
      favorited: false,
    })
  },
  seek(t: number) {
    const dur = TRACKS[state.index].duration
    set({ time: Math.max(0, Math.min(dur, t)) })
  },
  seekRatio(r: number) {
    player.seek(r * TRACKS[state.index].duration)
  },
  toggleFavorite() {
    set({ favorited: !state.favorited })
  },
  toggleLyrics() {
    set({ lyricsOpen: !state.lyricsOpen })
  },
  toggleQueue() {
    set({ queueOpen: !state.queueOpen })
  },
  /** Jump straight to a track from the queue. */
  play(index: number) {
    set({ index, time: 0, favorited: false })
  },
}

/** Simulated transport clock — one global interval, paused when not playing
 *  or when the tab is hidden (§27). Install once from PlayerExperience. */
let clockTimer: number | undefined
export function installPlayerClock() {
  if (clockTimer !== undefined) return
  clockTimer = window.setInterval(() => {
    if (!state.playing || document.hidden) return
    const dur = TRACKS[state.index].duration
    const next = state.time + 0.25
    if (next >= dur) {
      set({ index: (state.index + 1) % TRACKS.length, time: 0, favorited: false })
    } else {
      // Advance time silently without bumping version for every tick —
      // subscribers that need time read player.get().time directly each frame.
      state = { ...state, time: next }
    }
  }, 250)
}
