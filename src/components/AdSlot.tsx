/**
 * AD SLOT COMPONENT (§11, §12, §31)
 * --------------------------------
 * Policy-safe ad component that only renders on eligible content routes.
 * 
 * Design principles:
 * - Fails closed: if route is not explicitly ad-eligible, nothing renders
 * - Opt-in: content pages must explicitly include <AdSlot />
 * - Separation: ads never appear next to primary interaction controls
 * - No global ad script loading - script loads only when AdSlot mounts
 * 
 * Usage:
 *   <AdSlot policy="publisher-content" slotName="content-top" />
 * 
 * The policy prop documents the justification for ad placement on this page.
 * Only "publisher-content" is currently supported.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { canShowAds } from '../config/routes';

interface AdSlotProps {
  /** Policy justification for this ad placement. Must be 'publisher-content'. */
  policy: 'publisher-content';
  /** Unique identifier for this ad slot (for reporting/debugging). */
  slotName: string;
  /** Optional custom className for styling. */
  className?: string;
  /** AdSense ad client (publisher ID). */
  client?: string;
  /** AdSense ad slot ID. */
  slot?: string;
  /** Ad format: 'auto' for responsive, or specific format. */
  format?: 'auto' | 'fluid' | 'horizontal' | 'vertical' | 'rectangle';
  /** Whether this slot should be lazy-loaded (below fold). */
  lazy?: boolean;
}

const ADSENSE_CLIENT = 'ca-pub-9891925898932381';
const ADSENSE_SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

/**
 * Real ad-unit IDs, one per placement. Empty string = "not configured yet".
 * An unconfigured slot renders NOTHING and does not load the AdSense script —
 * that keeps Core Web Vitals clean and avoids adsbygoogle console errors on
 * pages without a sold unit. Fill these in from the AdSense dashboard.
 */
const AD_UNIT_IDS: Record<string, string> = {
  'homepage-after-intro': '',
  'homepage-after-features': '',
  'features-after-list': '',
  'how-it-works-after-steps': '',
  'about-after-intro': '',
  'faq-after-list': '',
  'help-after-guides': '',
  'download-after-steps': '',
};

let scriptLoaded = false;
let scriptLoading = false;
const scriptLoadPromises: Array<(success: boolean) => void> = [];

/**
 * Load the AdSense script once per session.
 * Returns a promise that resolves when the script is ready.
 */
function loadAdSenseScript(): Promise<boolean> {
  if (scriptLoaded) return Promise.resolve(true);
  if (scriptLoading) {
    return new Promise((resolve) => {
      scriptLoadPromises.push(resolve);
    });
  }

  scriptLoading = true;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = ADSENSE_SCRIPT_URL;
    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      scriptLoadPromises.forEach((cb) => cb(true));
      scriptLoadPromises.length = 0;
      resolve(true);
    };
    script.onerror = () => {
      scriptLoading = false;
      scriptLoadPromises.forEach((cb) => cb(false));
      scriptLoadPromises.length = 0;
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Try to push an ad to the adsbygoogle queue.
 * Returns true if the ad was requested, false otherwise.
 */
function requestAd(_slotElement: HTMLElement): boolean {
  if (typeof window === 'undefined') return false;
  if (!(window as any).adsbygoogle) return false;

  try {
    (window as any).adsbygoogle.push({});
    return true;
  } catch {
    return false;
  }
}

export default function AdSlot({
  policy,
  slotName,
  className = '',
  client = ADSENSE_CLIENT,
  slot,
  format = 'auto',
  lazy = false,
}: AdSlotProps) {
  // Router location, not window.location — keeps this correct on the server
  // render and on a client-side navigation.
  const { pathname } = useLocation();
  const [scriptReady, setScriptReady] = useState(false);
  const [adRequested, setAdRequested] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Policy check - fail closed (runs on every render, not conditional)
  const isPolicyValid = policy === 'publisher-content';

  // Resolve the real ad-unit id: explicit `slot` prop wins, otherwise the
  // per-placement map above. No id → render nothing, load nothing.
  const resolvedSlot = slot || AD_UNIT_IDS[slotName] || '';
  const configured = resolvedSlot.trim() !== '';

  const requestAdIfReady = useCallback(() => {
    if (insRef.current && requestAd(insRef.current)) {
      setAdRequested(true);
    }
  }, []);

  // Load AdSense once this slot is on an ad-eligible route. Eligibility itself
  // is read during render (cheap string compare) rather than stored in state.
  // Unconfigured slots never trigger a download of the ad script.
  const eligible = isPolicyValid && configured && canShowAds(pathname);

  useEffect(() => {
    if (!eligible) return;
    let active = true;
    loadAdSenseScript().then((success) => {
      if (active) setScriptReady(success);
    });
    return () => {
      active = false;
    };
  }, [eligible]);

  // Handle lazy loading via IntersectionObserver
  useEffect(() => {
    if (!isPolicyValid || !eligible || !scriptReady || !lazy || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !adRequested) {
            requestAdIfReady();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Load 200px before entering viewport
    );

    intersectionObserverRef.current = observer;
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isPolicyValid, eligible, scriptReady, lazy, adRequested, requestAdIfReady]);

  // Request ad immediately if not lazy
  useEffect(() => {
    if (!isPolicyValid || !eligible || !scriptReady || lazy || adRequested) return;
    requestAdIfReady();
  }, [isPolicyValid, eligible, scriptReady, lazy, adRequested, requestAdIfReady]);

  // Fail closed - no ad, no placeholder, no empty div. Reserving layout
  // space for an ad that can never fill would only hurt CLS for no revenue.
  if (!isPolicyValid || !eligible) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`ad-slot ad-slot--${slotName} ${className}`}
      data-ad-slot-name={slotName}
      data-ad-policy={policy}
      aria-hidden="true"
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: format === 'fluid' ? '0' : '250px' }}
        data-ad-client={client}
        data-ad-slot={resolvedSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * Convenience component for inline content ads.
 * Use within article/content flow where appropriate.
 * Lazy by default: inline slots sit below the fold, so the ad request waits
 * until the reader scrolls near — better LCP/INP, zero layout shift.
 */
export function InlineAdSlot(props: Omit<AdSlotProps, 'policy'> & { slotName?: string }) {
  const { slotName = 'inline', lazy = true, ...rest } = props;
  return <AdSlot policy="publisher-content" slotName={slotName} lazy={lazy} {...rest} />;
}

/**
 * Convenience component for sidebar/content-aside ads.
 */
export function SidebarAdSlot(props: Omit<AdSlotProps, 'policy'> & { slotName?: string }) {
  const { slotName = 'sidebar', ...rest } = props;
  return <AdSlot policy="publisher-content" slotName={slotName} format="vertical" {...rest} />;
}

/**
 * Convenience component for header/leaderboard ads.
 * Use sparingly and only on content pages with sufficient content above.
 */
export function HeaderAdSlot(props: Omit<AdSlotProps, 'policy'> & { slotName?: string }) {
  const { slotName = 'header', ...rest } = props;
  return <AdSlot policy="publisher-content" slotName={slotName} format="horizontal" {...rest} />;
}