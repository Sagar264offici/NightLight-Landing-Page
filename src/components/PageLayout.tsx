/**
 * PAGE LAYOUT
 * -----------
 * Chrome for every page: skip link, navigation, <main>, footer.
 *
 * The prerendered HTML already carries the correct <head> (see config/seo.ts),
 * so this component only has to keep the head in sync *after* a client-side
 * navigation, when no new document is fetched.
 */
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import { StickyDownloadCta } from '../ui/DownloadButton'
import { APP_NAME, SITE_URL } from '../config/site'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  canonical?: string | null
  ogImage?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function PageLayout({
  children,
  title,
  description,
  canonical,
  ogImage = `${SITE_URL}/og-image.png`,
  ogType = 'website',
  noIndex = false,
}: PageLayoutProps) {
  const url = canonical ?? `${SITE_URL}/`

  // Sticky mobile CTA: hidden at the top (the hero CTA is visible there),
  // revealed once the reader has scrolled past it.
  const [pastHero, setPastHero] = useState(false)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setPastHero(window.scrollY > Math.min(window.innerHeight * 0.85, 760))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.title = title

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, follow' : 'index, follow')

    // A noindex page must not claim a canonical, or it points Google at a
    // different URL and asks that one to be dropped instead.
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (noIndex) {
      link?.remove()
    } else {
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', url)
    }

    const meta: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:site_name': APP_NAME,
      'og:type': ogType,
      'og:image': ogImage,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': `${APP_NAME} — Android music player interface`,
    }
    for (const [property, content] of Object.entries(meta)) {
      setMeta(`meta[property="${property}"]`, 'property', property, content)
    }

    const twitter: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
      'twitter:image:alt': `${APP_NAME} — Android music player interface`,
    }
    for (const [name, content] of Object.entries(twitter)) {
      setMeta(`meta[name="${name}"]`, 'name', name, content)
    }
  }, [title, description, url, ogImage, ogType, noIndex])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      {pastHero && <StickyDownloadCta />}
    </>
  )
}
