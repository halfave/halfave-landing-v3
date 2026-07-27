// src/analytics.ts
// Custom GA4 events for halfave.co — scroll depth, section visibility, clicks.
// Assumes the gtag snippet in index.html has already run.

const MEASUREMENT_ID = 'G-TCMN0K3S5W';
const DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;

/* ------------------------------------------------------------------ */
/* Opt-out                                                             */
/* ------------------------------------------------------------------ */

// 1. Never collect anything on local dev builds.
if (import.meta.env.DEV || location.hostname === 'localhost') {
  (window as any)[DISABLE_KEY] = true;
}

// 2. Permanent per-browser opt-out for the live site.
//    Turn on:  localStorage.setItem('ha_no_track', '1')
//    Turn off: localStorage.removeItem('ha_no_track')
try {
  if (localStorage.getItem('ha_no_track') === '1') {
    (window as any)[DISABLE_KEY] = true;
  }
} catch {
  // Private browsing can throw on localStorage access — ignore.
}

/* ------------------------------------------------------------------ */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

function track(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window.gtag !== 'function') {
    if (import.meta.env.DEV) console.warn('[analytics] gtag not found:', eventName);
    return;
  }
  window.gtag('event', eventName, {
    page_path: window.location.pathname,
    ...params,
  });
}

// GA4 rejects param values over 100 chars.
function clean(text: string | null | undefined): string {
  if (!text) return '(no label)';
  return text.replace(/\s+/g, ' ').trim().slice(0, 100) || '(no label)';
}

/* ------------------------------------------------------------------ */
/* Clicks                                                              */
/* ------------------------------------------------------------------ */

const CLICKABLE = 'button, a, [role="button"], input[type="submit"]';

export function initClickTracking() {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // closest() so clicks on an icon or span inside a button still register.
      const el = target.closest<HTMLElement>(CLICKABLE);
      if (!el) return;

      // Explicit label wins; otherwise fall back to visible text.
      const label =
        el.dataset.trackLabel ??
        el.getAttribute('aria-label') ??
        el.textContent;

      const section =
        el.closest<HTMLElement>('[data-track-section]')?.dataset.trackSection;

      const href = el instanceof HTMLAnchorElement ? el.href : undefined;

      track('element_click', {
        click_text: clean(label),
        click_id: el.id || undefined,
        click_url: href,
        click_section: section || undefined,
      });
    },
    // Capture phase: fires even if a handler calls stopPropagation().
    { capture: true }
  );
}

/* ------------------------------------------------------------------ */
/* Scroll depth                                                        */
/* ------------------------------------------------------------------ */

const THRESHOLDS = [25, 50, 75, 90, 100];

export function initScrollDepth() {
  const fired = new Set<number>();
  let queued = false;

  const measure = () => {
    queued = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 40) return;

    const pct = (window.scrollY / scrollable) * 100;

    for (const t of THRESHOLDS) {
      if (pct >= t && !fired.has(t)) {
        fired.add(t);
        track('scroll_depth', { percent_scrolled: t });
      }
    }

    if (fired.size === THRESHOLDS.length) {
      window.removeEventListener('scroll', onScroll);
    }
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(measure);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(measure, 1000);
}

/* ------------------------------------------------------------------ */
/* Section visibility                                                  */
/* ------------------------------------------------------------------ */

export function initSectionViews() {
  const sections = document.querySelectorAll<HTMLElement>('[data-track-section]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const name = entry.target.getAttribute('data-track-section');
        if (name) track('section_view', { section_name: name });
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.5 }
  );

  sections.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ */

export function initAnalytics() {
  initScrollDepth();
  initClickTracking();
  setTimeout(initSectionViews, 1500);
}