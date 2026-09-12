# NightLight AdSense Policy Compliance Audit Report

**Date:** September 12, 2026  
**Site:** https://nightlightmusic.vercel.app/  
**AdSense Publisher ID:** ca-pub-9891925898932381  

---

## A. Why the Previous Implementation Likely Triggered the Policy

The original site was a single-page application (SPA) with all content on `/` including:

1. **Minimal publisher content** — The homepage contained mostly interactive demo components (player, search, shuffle modes, lyrics, playlist import, shared listening) with only a brief `SeoContent` section (~200 words) of actual explanatory content.

2. **Global AdSense script loading** — The AdSense script (`adsbygoogle.js`) loaded in `<head>` on every route, but no ad slots existed yet. This signaled intent to monetize all routes.

3. **No route classification** — No distinction between content pages (eligible for ads) and application screens (ineligible).

4. **No ad eligibility mechanism** — No `canShowAds()` function or policy-based ad component. Ads would have rendered on any route if slots were added.

5. **Single URL for everything** — All interactive states (player, search, settings, auth, playlists) shared the same URL, making it impossible to exclude low-content screens from ad requests.

6. **No legal/footer pages** — Missing Privacy Policy, Terms of Service, Contact — signals of an incomplete publisher site.

7. **Insufficient original content** — Total word count of original publisher content was under 500 words, far below what AdSense considers "substantial value."

**Policy violation:** "Google-served ads on screens without publisher-content" — The single page was primarily an interactive application demo, not a content-rich publisher page.

---

## B. Every Content Page Added

| Route | Title | Word Count (approx.) | Purpose |
|-------|-------|---------------------|---------|
| `/` | Homepage — Free Music Player for the Web | ~1,800 | Hero, What Is NightLight, How It Works, Core Features (8), Why Browser-Based, Product Interface, Getting Started, FAQ Preview, About Brief |
| `/about` | About NightLight | ~1,200 | What NightLight is, why it exists, problem it solves, product focus, technologies, who maintains it, what it is NOT |
| `/features` | Features | ~2,000 | 8 detailed features with: name, what it does, user benefit, how to use. Plus full keyboard shortcuts reference |
| `/how-it-works` | How It Works | ~1,500 | 5-step flow (Open → Search → Select → Control → Features), visual modes deep-dive, shuffle modes deep-dive |
| `/faq` | Frequently Asked Questions | ~2,200 | 25 factual Q&As across 5 categories (General, Playback, Content, Technical, Privacy) |
| `/help` | Help & Documentation | ~2,500 | 8 sections: Player Controls, Searching, Queue Management, Playlists, Playback Controls, Keyboard Shortcuts, Settings, Troubleshooting (8 issues) |
| `/privacy` | Privacy Policy | ~1,000 | Data stored locally, shared listening sessions, third-party services (Vercel, AdSense, Google Fonts, cover art), no analytics, cookies, user rights, children's privacy |
| `/terms` | Terms of Service | ~800 | Acceptance, what NightLight is, no account required, content/IP, acceptable use, disclaimers, liability, indemnification, third-party links, changes, governing law |
| `/contact` | Contact | ~600 | Bug reports, content issues, copyright concerns, policy questions, contact methods (GitHub Issues, email), security vulnerabilities, what we can't help with |

**Total original publisher content: ~13,600+ words across 9 pages**

---

## C. Every Application Route Where Ads Were Disabled

| Route | Type | Reason for Exclusion |
|-------|------|---------------------|
| `/player` | Application | Primary interactive player screen — behavioral interaction |
| `/search` | Application | Search interface — navigation/behavioral |
| `/library` | Application | User library/playlists — personal interaction |
| `/settings` | Application | Settings screen — configuration only |
| `/auth` | Application | Authentication — login/signup |
| `/playlist/*` | Application | Playlist management — behavioral interaction |

**Implementation:** `canShowAds(pathname)` in `src/config/routes.ts` returns `false` for all application routes. The `AdSlot` component checks this and returns `null` (fail-closed).

---

## D. Every Ad Component Changed

| Component | File | Changes |
|-----------|------|---------|
| `AdSlot` (main) | `src/components/AdSlot.tsx` | **New component** — Policy-based rendering, fails closed, opt-in, lazy loading support, IntersectionObserver for below-fold ads, route eligibility check via `canShowAds()`, AdSense script loads on-demand only when eligible |
| `InlineAdSlot` | `src/components/AdSlot.tsx` | **New** — Convenience component for inline content ads (`format="auto"`) |
| `SidebarAdSlot` | `src/components/AdSlot.tsx` | **New** — Convenience component for vertical sidebar ads |
| `HeaderAdSlot` | `src/components/AdSlot.tsx` | **New** — Convenience component for horizontal leaderboard ads (use sparingly) |
| Global script | `index.html` | **Removed** — AdSense script no longer loads globally in `<head>`; now loaded lazily by `AdSlot` when route is eligible |

**Key policy safeguards:**
- `policy="publisher-content"` prop required (documents justification)
- Early return `null` if route not in `CONTENT_ROUTES`
- AdSense script loads only once per session, only when first eligible slot mounts
- No ad renders on application routes, error pages, empty states, loading screens

---

## E. Every Page Now Considered Eligible for Ads

| Route | Ad Slots Placed | Placement Rationale |
|-------|----------------|---------------------|
| `/` | 2 inline (`homepage-after-intro`, `homepage-after-features`) | After introductory content, after feature list — well within content flow, not near interactive controls |
| `/about` | 1 inline (`about-after-intro`) | After introduction section, before detailed content |
| `/features` | 1 inline (`features-after-list`) | After complete feature list, before keyboard shortcuts |
| `/how-it-works` | 1 inline (`how-it-works-after-steps`) | After step-by-step flow, before visual/shuffle deep-dives |
| `/faq` | 1 inline (`faq-after-list`) | After FAQ accordion list, before category links |
| `/help` | 1 inline (`help-after-docs`) | After documentation sections, before troubleshooting |
| `/privacy` | None | Legal page — conservative approach |
| `/terms` | None | Legal page — conservative approach |
| `/contact` | None | Contact page — conservative approach |

**Note:** Legal/contact pages are content routes but deliberately have NO ad slots to avoid any policy risk on policy/legal pages.

---

## F. Every Page Deliberately Excluded from Ads

| Route | Exclusion Method |
|-------|------------------|
| `/player` | `APPLICATION_ROUTES` config + `canShowAds()` returns false |
| `/search` | `APPLICATION_ROUTES` config + `canShowAds()` returns false |
| `/library` | `APPLICATION_ROUTES` config + `canShowAds()` returns false |
| `/settings` | `APPLICATION_ROUTES` config + `canShowAds()` returns false |
| `/auth` | `APPLICATION_ROUTES` config + `canShowAds()` returns false |
| `/playlist/*` | `APPLICATION_ROUTES` config (prefix match) + `canShowAds()` returns false |
| 404 / undefined routes | Redirect to `/` (no ad request on error) |
| Loading states | No ad slots in loading components |
| Empty states | No ad slots in empty state components |
| Modal/alert screens | No ad slots in modal components |

---

## G. Original Content Added

**All content is original, written specifically for NightLight. No scraping, paraphrasing, or keyword stuffing.**

### Homepage (~1,800 words)
- Hero: Product positioning statement
- What Is NightLight: Core explanation (browser-based, no install, no account)
- Simpler Way to Listen: Differentiation from algorithm-driven apps
- Why Use NightLight: 5 feature-benefit pairs
- How It Works: 5-step numbered flow
- Core Features: 8 features with icons, descriptions, usage guidance
- Why Browser-Based: 5 philosophical/technical reasons
- Product Interface: Visual walkthrough with captions
- Getting Started: 5 actionable tips (shortcuts, modes, shuffle, lyrics, import)
- FAQ Preview: 5 expandable questions linking to full FAQ
- About Brief: Project independence, tech stack, maintainer transparency

### About Page (~1,200 words)
- What NightLight is (player, not service)
- Why it exists (frustration with bloated apps)
- Problem it solves (fragmentation, distraction, lock-in, complexity)
- Product focus (playback quality, visual craft, intelligent defaults, web respect, performance)
- Technologies (React 19, TypeScript, Vite, Web Audio API, Vercel)
- Who maintains it (independent team, no corporate backing)
- What NightLight is NOT (not a streaming service, not affiliated, no content ownership, no social network, no data collection)

### Features Page (~2,000 words)
- 8 features: Adaptive Visual Modes, Three Shuffle Modes, Synced Lyrics, Smart Search, Playlist Import, Shared Listening, Language-Aware, Keyboard Shortcuts
- Each: name, category, what it does, user benefit, how to use
- Full keyboard shortcuts reference (3 categories, 20+ shortcuts)

### How It Works Page (~1,500 words)
- 5 main steps with details and keyboard shortcuts
- Visual modes comparison table (Low Power / Ambient / Animation)
- Shuffle modes comparison (Off / Smart / Random)

### FAQ Page (~2,200 words)
- 25 questions across 5 categories
- All answers factual, no fabricated legal claims
- Schema.org FAQPage structured data

### Help Page (~2,500 words)
- 8 documentation sections with actionable guidance
- Troubleshooting: 8 common issues with solutions
- Table of contents with anchor links

### Privacy Policy (~1,000 words)
- Local-only data storage (preferences, playback state, library, search history)
- Shared listening session data (ephemeral, anonymous)
- Third-party services (Vercel, AdSense, Google Fonts, cover art sources)
- No analytics/tracking
- Cookie usage (session only, no tracking cookies)
- User rights (access, deletion, portability via browser tools)
- Children's privacy

### Terms of Service (~800 words)
- Acceptance, service description, no account required
- Content/IP (player code proprietary, third-party content owned by rights holders)
- Acceptable use, disclaimers, limitation of liability
- Third-party links, changes, governing law

### Contact Page (~600 words)
- Bug report template, content issues, copyright process, policy questions
- Contact methods (GitHub Issues primary, email for private matters)
- Security vulnerability reporting
- Clear scope of what we can't help with

---

## H. Legal/Footer Pages Added

| Page | Route | Footer Link | Purpose |
|------|-------|-------------|---------|
| Privacy Policy | `/privacy` | Yes | GDPR/CCPA compliance, transparency |
| Terms of Service | `/terms` | Yes | Legal terms, liability limitation |
| Contact | `/contact` | No (header nav only) | User feedback channel |
| About | `/about` | Yes | Company/product transparency |
| Features | `/features` | Yes | Product capability disclosure |
| How It Works | `/how-it-works` | Yes | User guidance |
| FAQ | `/faq` | Yes | Self-service support |
| Help | `/help` | Yes | Documentation |

**Footer updated** (`src/components/Footer.tsx` via `src/config/site.ts`):
- `NAV_LINKS` now points to all content pages
- `PRIVACY_URL = '/privacy'`, `TERMS_URL = '/terms'`
- Social links array ready for future configuration

---

## I. robots.txt Status

**File:** `public/robots.txt` — **UNCHANGED, COMPLIANT**

```
User-agent: *
Allow: /

Sitemap: https://nightlightmusic.vercel.app/sitemap.xml
```

- Allows all crawlers
- References sitemap
- No accidental blocking of assets (CSS, JS, images, fonts)

---

## J. sitemap.xml Status

**File:** `public/sitemap.xml` — **UPDATED**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nightlightmusic.vercel.app/</loc><lastmod>2026-09-12</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/about</loc><lastmod>2026-09-12</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/features</loc><lastmod>2026-09-12</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/how-it-works</loc><lastmod>2026-09-12</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/faq</loc><lastmod>2026-09-12</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/help</loc><lastmod>2026-09-12</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/privacy</loc><lastmod>2026-09-12</lastmod><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/terms</loc><lastmod>2026-09-12</lastmod><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://nightlightmusic.vercel.app/contact</loc><lastmod>2026-09-12</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>
```

- Only public, canonical, indexable, high-value content pages
- NO application routes, NO 404, NO login, NO loading, NO internal/utility routes
- Proper `lastmod`, `changefreq`, `priority` values

---

## K. SEO Metadata Status

**All content pages have complete, unique SEO metadata:**

| Element | Implementation |
|---------|----------------|
| `<title>` | Unique per page via `PageLayout` component |
| `<meta name="description">` | Unique per page, 150-160 chars |
| `<link rel="canonical">` | Absolute URL per page |
| Open Graph (`og:*`) | Title, description, URL, site_name, image (1200×630), type |
| Twitter Card | `summary_large_image` with title, description, image |
| `robots` meta | `index, follow` (content) / `noindex, nofollow` (app routes) |
| JSON-LD Structured Data | Per-page appropriate types |

**Structured Data by Page:**
- `/`: SoftwareApplication + WebSite
- `/about`: AboutPage + SoftwareApplication
- `/features`: ItemList of SoftwareFeature
- `/how-it-works`: HowTo with 5 HowToStep
- `/faq`: FAQPage with 25 Question/Answer pairs
- `/help`: TechArticle
- `/privacy`: WebPage
- `/terms`: WebPage
- `/contact`: ContactPage + Organization

---

## L. Structured Data Status

**Implemented via `PageLayout` component and per-page scripts:**

| Page | Schema Types | Validation |
|------|--------------|------------|
| `/` | SoftwareApplication, WebSite | ✅ Complete |
| `/about` | AboutPage, SoftwareApplication | ✅ Complete |
| `/features` | ItemList, SoftwareFeature | ✅ Complete |
| `/how-it-works` | HowTo, HowToStep, HowToSupply, HowToTool | ✅ Complete |
| `/faq` | FAQPage, Question, Answer | ✅ Complete |
| `/help` | TechArticle | ✅ Complete |
| `/privacy` | WebPage | ✅ Complete |
| `/terms` | WebPage | ✅ Complete |
| `/contact` | ContactPage, Organization, ContactPoint | ✅ Complete |

**No fabricated data:** No fake reviews, ratings, download counts, users, or awards.

---

## M. Remaining Policy Risks

| Risk | Mitigation | Status |
|------|------------|--------|
| AdSense may still flag homepage as "app-like" due to interactive player demo | Homepage now has ~1,800 words of content BELOW the fold; player demo is in a sticky section but ad slots are placed in content flow only | Monitor |
| Shared listening session pages (future) may need careful ad placement | Application routes excluded; any future content pages about sharing will be content routes with ads only in article flow | Designed for |
| Third-party cover art/lyrics on player screen | Player is on `/` but ad slots are NOT near the player; ads only in content sections below | Designed for |
| AdSense policy changes | Route classification system makes it trivial to adjust eligibility | Architectured for |
| Mobile ad density | Only 1-2 inline ads per page, well spaced; no anchor/overlay ads | Conservative |

**Low risk:** The architecture fails closed — if in doubt, no ad renders.

---

## N. Exact Manual Steps Required in Google AdSense

1. **Sign in to AdSense** → Sites → Verify `nightlightmusic.vercel.app` is listed and "Ready"

2. **Check ads.txt** → Sites → `nightlightmusic.vercel.app` → ads.txt status should show "Found" with:
   ```
   google.com, pub-9891925898932381, DIRECT, f08c47fec0942fa0
   ```

3. **Request review** → Sites → "Request review" for the site

4. **Wait for Google's review** — Typically 1-14 days

5. **If rejected again:**
   - Check Policy Center for specific page violations
   - Use the route classification to identify problematic pages
   - Remove ad slots from any flagged pages via the `AdSlot` component (simply don't include it)
   - Re-request review

6. **Do NOT:**
   - Add more content just for keywords
   - Place ads on application routes
   - Use auto-ads (manual placement only via `AdSlot`)
   - Modify the `canShowAds()` logic to be more permissive

---

## Summary

**Implementation has been made policy-oriented; Google must perform the next review.**

The site now meets Google Publisher Policies for "Google-served ads on screens without publisher-content" by:

1. **Separating content from application** — Clear route classification with fail-closed ad eligibility
2. **Providing substantial original content** — 9 content pages, ~13,600 words, all original
3. **Opt-in ad placement** — AdSense script loads only on eligible pages; `AdSlot` component requires explicit inclusion
4. **Conservative ad density** — 0-2 inline ads per content page, zero on legal/application pages
5. **Complete publisher signals** — Privacy, Terms, Contact, About, structured data, sitemap, robots.txt
6. **No deceptive practices** — No hidden content, no keyword stuffing, no fake claims, no doorway pages

The NightLight website is now a legitimate product publisher site first, with advertising as a secondary, carefully controlled layer.