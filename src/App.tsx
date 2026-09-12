/**
 * APP — Multi-page architecture with React Router.
 * Content routes render publisher content pages.
 * Application routes render the interactive player (future).
 * Currently only content routes are implemented.
 */

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Atmosphere from './components/Atmosphere'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import PageLayout from './components/PageLayout'
import Homepage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import FAQPage from './pages/FAQPage'
import HelpPage from './pages/HelpPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ContactPage from './pages/ContactPage'
import { initCoverArt } from './config/site'
import { SITE_URL } from './config/site'

export default function App() {
  useEffect(() => {
    initCoverArt().catch(console.warn)
  }, [])

  return (
    <>
      <Atmosphere />
      <Navigation />
      <BrowserRouter>
        <Routes>
          {/* CONTENT ROUTES — Public publisher content pages (ad-eligible) */}
          <Route
            path="/"
            element={
              <PageLayout
                title="NightLight — Free Music Player for the Web"
                description="NightLight is a free, modern web music player built for simple, fast and focused music listening directly in your browser."
                canonical={SITE_URL}
              >
                <Homepage />
              </PageLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PageLayout
                title="About NightLight"
                description="Learn what NightLight is, why it exists, and what problem it aims to solve."
                canonical={`${SITE_URL}/about`}
              >
                <AboutPage />
              </PageLayout>
            }
          />
          <Route
            path="/features"
            element={
              <PageLayout
                title="Features | NightLight"
                description="Explore NightLight's features: adaptive visuals, three shuffle modes, time-synced lyrics, smart search, playlist import, and shared listening sessions."
                canonical={`${SITE_URL}/features`}
              >
                <FeaturesPage />
              </PageLayout>
            }
          />
          <Route
            path="/how-it-works"
            element={
              <PageLayout
                title="How It Works | NightLight"
                description="Step-by-step guide to using NightLight: open the player, search or select music, control playback, and use player features."
                canonical={`${SITE_URL}/how-it-works`}
              >
                <HowItWorksPage />
              </PageLayout>
            }
          />
          <Route
            path="/faq"
            element={
              <PageLayout
                title="Frequently Asked Questions | NightLight"
                description="Answers to common questions about NightLight: pricing, installation, device support, music sources, playlists, keyboard controls, and more."
                canonical={`${SITE_URL}/faq`}
              >
                <FAQPage />
              </PageLayout>
            }
          />
          <Route
            path="/help"
            element={
              <PageLayout
                title="Help & Documentation | NightLight"
                description="Documentation for using NightLight: player controls, searching, queue management, playlists, playback, keyboard shortcuts, settings, and troubleshooting."
                canonical={`${SITE_URL}/help`}
              >
                <HelpPage />
              </PageLayout>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageLayout
                title="Privacy Policy | NightLight"
                description="NightLight's privacy policy explaining what data is collected, how it's used, and your rights."
                canonical={`${SITE_URL}/privacy`}
                noIndex={false}
              >
                <PrivacyPage />
              </PageLayout>
            }
          />
          <Route
            path="/terms"
            element={
              <PageLayout
                title="Terms of Service | NightLight"
                description="Terms of service for using NightLight."
                canonical={`${SITE_URL}/terms`}
                noIndex={false}
              >
                <TermsPage />
              </PageLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PageLayout
                title="Contact | NightLight"
                description="Contact NightLight for bugs, content issues, copyright concerns, or policy questions."
                canonical={`${SITE_URL}/contact`}
              >
                <ContactPage />
              </PageLayout>
            }
          />

          {/* APPLICATION ROUTES — Interactive app screens (NOT ad-eligible) */}
          {/* These are placeholders for future implementation */}
          <Route path="/player" element={<AppShell title="Player" />} />
          <Route path="/search" element={<AppShell title="Search" />} />
          <Route path="/library" element={<AppShell title="Library" />} />
          <Route path="/settings" element={<AppShell title="Settings" />} />
          <Route path="/auth" element={<AppShell title="Authentication" />} />
          <Route path="/playlist/*" element={<AppShell title="Playlist" />} />

          {/* Catch-all for undefined routes — redirect to 404 or homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

/**
 * Placeholder shell for application routes.
 * These routes are NOT ad-eligible and should not render AdSlot components.
 * In the future, these will render the actual interactive player UI.
 */
function AppShell({ title }: { title: string }) {
  return (
    <PageLayout
      title={`${title} | NightLight`}
      description={`NightLight ${title.toLowerCase()} interface.`}
      noIndex={true}
      noFollow={true}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: 'clamp(20px, 5vw, 72px)',
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '16px' }}>{title}</h1>
        <p style={{ color: 'var(--c-text-2)', maxWidth: '480px', marginBottom: '24px' }}>
          This is an application route. The interactive {title.toLowerCase()} interface will be implemented here.
          Application routes do not display advertisements.
        </p>
        <a href="/" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>← Back to NightLight</a>
      </div>
    </PageLayout>
  )
}