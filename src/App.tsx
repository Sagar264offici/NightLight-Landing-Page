/**
 * APP (§19) — one continuous composition.
 * Atmosphere is fixed behind everything; sections bleed into each other.
 */
import { useEffect } from 'react'
import Atmosphere from './components/Atmosphere'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import PlayerExperience from './components/PlayerExperience'
import FeatureStory from './components/FeatureStory'
import MusicGallery from './components/MusicGallery'
import SmartExperience from './components/SmartExperience'
import TilePlay from './components/TilePlay'
import FinalCTA from './components/FinalCTA'
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
        <Hero />
        <PlayerExperience />
        <MusicGallery />
        <FeatureStory />
        <SmartExperience />
        <TilePlay />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
