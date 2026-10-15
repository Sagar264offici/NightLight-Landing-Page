/**
 * APP
 * ---
 * The whole site is nine content pages plus a 404. Routes, page titles and
 * meta descriptions all come from `config/routes.ts`, and the <head> that
 * Google reads is generated from the same table by `config/seo.ts` at build
 * time — so a page can never be reachable without being described.
 */

import type { ComponentType } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Atmosphere from './components/Atmosphere'
import PageLayout from './components/PageLayout'
import Homepage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import DownloadPage from './pages/DownloadPage'
import FaqPage from './pages/FaqPage'
import HelpPage from './pages/HelpPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import { CONTENT_ROUTES } from './config/routes'
import { pageSeo } from './config/seo'

/** Which component serves which path. Adding a route means adding one line here. */
const PAGE_COMPONENTS: Record<string, ComponentType> = {
  '/': Homepage,
  '/about': AboutPage,
  '/features': FeaturesPage,
  '/how-it-works': HowItWorksPage,
  '/download': DownloadPage,
  '/faq': FaqPage,
  '/help': HelpPage,
  '/contact': ContactPage,
  '/privacy': PrivacyPage,
  '/terms': TermsPage,
}

/** Routes only — the router is supplied by the caller so this renders on the server too. */
export function AppRoutes() {
  return (
    <Routes>
      {CONTENT_ROUTES.map((route) => {
        const Page = PAGE_COMPONENTS[route.path]
        const seo = pageSeo(route.path)
        if (!Page) return null
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PageLayout title={seo.title} description={seo.description} canonical={seo.canonical ?? undefined}>
                <Page />
              </PageLayout>
            }
          />
        )
      })}

      {/* Anything else is a genuine 404, served with a noindex head. */}
      <Route
        path="*"
        element={
          <PageLayout title={pageSeo('/404').title} description={pageSeo('/404').description} noIndex>
            <NotFoundPage />
          </PageLayout>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <>
      <Atmosphere />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}
