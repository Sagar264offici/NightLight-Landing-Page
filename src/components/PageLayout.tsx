/**
 * PAGE LAYOUT COMPONENT
 * --------------------
 * Base layout for all content pages.
 * Provides consistent structure: Navigation, Main, Footer.
 * Handles SEO metadata via react-helmet-async style pattern.
 */

import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { SITE_URL } from '../config/site';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: object | object[];
  noIndex?: boolean;
  noFollow?: boolean;
}

export default function PageLayout({
  children,
  title,
  description,
  canonical,
  ogImage = `${SITE_URL}/og-image.png`,
  ogType = 'website',
  structuredData,
  noIndex = false,
  noFollow = false,
}: PageLayoutProps) {
  // Update document title and meta tags
  useEffect(() => {
    document.title = title;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || `${SITE_URL}${window.location.pathname}`);

    // Update robots
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`);

    // Update Open Graph tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': canonical || `${SITE_URL}${window.location.pathname}`,
      'og:site_name': 'NightLight',
      'og:type': ogType,
      'og:image': ogImage,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'NightLight web music player',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Update Twitter tags
    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
      'twitter:image:alt': 'NightLight web music player',
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Update structured data
    if (structuredData) {
      // Remove existing NightLight structured data
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-nightlight]');
      existingScripts.forEach((s) => s.remove());

      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-nightlight', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [title, description, canonical, ogImage, ogType, structuredData, noIndex, noFollow]);

  return (
    <>
      <Navigation />
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}