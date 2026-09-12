/**
 * APP (§19, §32) — one continuous composition.
 * Atmosphere is fixed behind everything; sections bleed into each other.
 * Navigation story: Hero → Player → Discovery → Personalization →
 * Shuffle → Lyrics → Playlists/Import → Share/Listen → Chat → Final CTA
 */
import { useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Atmosphere from './components/Atmosphere'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import PlayerExperience from './components/PlayerExperience'
import MusicGallery from './components/MusicGallery'
import FeatureStory from './components/FeatureStory'
import SmartExperience from './components/SmartExperience'
import TilePlay from './components/TilePlay'
import FinalCTA from './components/FinalCTA'
import AtmosphereModes from './components/AtmosphereModes'
import ShuffleModes from './components/ShuffleModes'
import SearchDemo from './components/SearchDemo'
import LyricsScene from './components/LyricsScene'
import ShareMusic from './components/ShareMusic'
import PlaylistImport from './components/PlaylistImport'
import LanguageDemo from './components/LanguageDemo'
import SeoContent from './components/SeoContent'
import Footer from './components/Footer'
import { initCoverArt } from './config/site'

export default function App() {
  useEffect(() => {
    initCoverArt().catch(console.warn)
  }, [])

  return (
    <>
      <Atmosphere />
      <Navigation />
      <main>
        {/* §06 — Hero: atmosphere + device */}
        <Hero />

        {/* SEO Content: crawlable product explanation */}
        <SeoContent />

        {/* §09 — Product Reveal: phone emerges, album art, player controls */}
        <PlayerExperience />

        {/* §08 — Three visual modes as product feature */}
        <AtmosphereModes />

        {/* §22 — Music Discovery: cinematic gallery */}
        <MusicGallery />

        {/* §12 — Search: smart track intent */}
        <SearchDemo />

        {/* §23 — Smart Experience: context-aware listening */}
        <SmartExperience />

        {/* §21 — Language-Aware Recommendations */}
        <LanguageDemo />

        {/* §10, §11 — Three Shuffle Modes */}
        <ShuffleModes />

        {/* §13 — Lyrics: cinematic synced lyrics */}
        <LyricsScene />

        {/* §22 — Feature Story: chapters of the product */}
        <FeatureStory />

        {/* §18, §19 — Playlist Import */}
        <PlaylistImport />

        {/* §14, §15, §16 — Share Music / Listen Together + Chat */}
        <ShareMusic />

        {/* §24 — Tile Play: tactile interaction */}
        <TilePlay />

        {/* §33 — Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <SpeedInsights />
    </>
  )
}
