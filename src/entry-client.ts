/**
 * @license MIT
 * ============================================================================
 * src/entry-client.ts — IBM Carbon Web Components Registration & Client Router
 * Property: https://a11y.raggiesoft.com (raggiesoft-a11y-studio)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL CARBON WEB COMPONENTS HYDRATION GUIDE):
 *   What happens when this browser module runs on `a11y.raggiesoft.com`?
 *     1. Imports IBM's official `@carbon/web-components` (`<cds-tile>`,
 *        `<cds-accordion>`, `<cds-accordion-item>`) powered by `lit` so every
 *        custom element in our pre-rendered HTML upgrades with Carbon keyboard
 *        and ARIA semantics!
 *     2. Synchronizes `<html data-carbon-theme="white|g100">` and
 *        `<meta name="color-scheme">` with OS `prefers-color-scheme` and our
 *        header theme toggle (`modern-web-guidance` two-state pattern).
 *     3. Wires instant client-side route transitions across `/`, `/features`,
 *        `/enterprise`, `/reports`, and `/docs`, plus live rule filtering on
 *        `/docs`!
 * ============================================================================
 */

import '@carbon/web-components/es/components/tile/index.js';
import '@carbon/web-components/es/components/accordion/index.js';
import { STUDIO_ROUTES } from './data/studioProductData';
import {
  normalizeStudioPath,
  renderRoute,
  renderRuleCatalogTableHtml,
  type RuleCategoryFilter
} from './entry-server';

function getSystemScheme(): 'light' | 'dark' {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getEffectiveScheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('color-scheme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage privacy restrictions
  }
  return getSystemScheme();
}

function syncCarbonThemeAttributes(): void {
  const effective = getEffectiveScheme();
  let saved: string | null = null;
  try {
    saved = localStorage.getItem('color-scheme');
  } catch {}

  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute(
      'data-carbon-theme',
      saved === 'dark' ? 'g100' : 'white'
    );
  } else {
    document.documentElement.removeAttribute('data-carbon-theme');
  }

  const label = document.getElementById('cs-theme-label');
  if (label) {
    if (saved === 'light' || saved === 'dark') {
      label.textContent = effective === 'dark' ? '🌙 Carbon G100' : '☀️ Carbon White';
    } else {
      label.textContent = effective === 'dark' ? '🌓 Auto (G100)' : '🌓 Auto (White)';
    }
  }
}

function toggleCarbonTheme(): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  const current = getEffectiveScheme();
  const target: 'light' | 'dark' = current === 'dark' ? 'light' : 'dark';
  const sys = getSystemScheme();

  try {
    if (target === sys) {
      localStorage.removeItem('color-scheme');
      if (meta) meta.content = 'light dark';
    } else {
      localStorage.setItem('color-scheme', target);
      if (meta) meta.content = target;
    }
  } catch {
    if (meta) meta.content = target;
  }

  syncCarbonThemeAttributes();
}

let activeRuleCat: RuleCategoryFilter = 'all';
let activeRuleQuery = '';

function bindRouteControls(): void {
  syncCarbonThemeAttributes();

  const themeBtn = document.getElementById('cs-theme-toggle');
  themeBtn?.addEventListener('click', toggleCarbonTheme);

  const rulesHost = document.getElementById('cs-rules-results');
  const searchBox = document.getElementById('cs-rule-search') as HTMLInputElement | null;
  const chips = document.querySelectorAll<HTMLButtonElement>('.cs-filter-chip[data-rule-cat]');

  if (rulesHost) {
    const refreshTable = () => {
      rulesHost.innerHTML = renderRuleCatalogTableHtml(activeRuleCat, activeRuleQuery);
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        activeRuleCat = (chip.getAttribute('data-rule-cat') as RuleCategoryFilter) || 'all';
        chips.forEach((c) => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
        refreshTable();
      });
    });

    searchBox?.addEventListener('input', () => {
      activeRuleQuery = searchBox.value;
      refreshTable();
    });
  }
}

function navigateClient(targetPath: string, pushState: boolean): void {
  const appHost = document.getElementById('studio-app');
  if (!appHost) return;

  activeRuleCat = 'all';
  activeRuleQuery = '';

  const { html, normalizedPath } = renderRoute(targetPath);
  appHost.innerHTML = html;

  if (pushState) {
    window.history.pushState({}, '', normalizedPath);
  }

  const routeMeta = STUDIO_ROUTES.find((r) => r.path === normalizedPath);
  if (routeMeta) {
    document.title = routeMeta.seoTitle;
  }

  bindRouteControls();
  const win = window as unknown as { initRaggieSoftNetworkMenu?: () => void };
  win.initRaggieSoftNetworkMenu?.();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

// Intercept internal `data-local-nav="true"` links for instant zero-reload transitions
document.addEventListener('click', (ev) => {
  const anchor = (ev.target as HTMLElement | null)?.closest?.('a[data-local-nav="true"]') as HTMLAnchorElement | null;
  if (!anchor) return;
  if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;

  const href = anchor.getAttribute('href');
  if (!href || !href.startsWith('/')) return;

  ev.preventDefault();
  navigateClient(href, true);
});

window.addEventListener('popstate', () => {
  navigateClient(normalizeStudioPath(window.location.pathname), false);
});

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    syncCarbonThemeAttributes();
  });
}

// Hydrate pre-rendered DOM on initial page load
bindRouteControls();
