/**
 * @license MIT
 * ============================================================================
 * src/entry-server.ts — Isomorphic B2B Product Route Renderer for a11y.raggiesoft.com
 * Property: https://a11y.raggiesoft.com (raggiesoft-a11y-studio)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL STATIC SSG + CARBON WEB COMPONENTS GUIDE):
 *   What does this module do?
 *     Both `scripts/prerender.mjs` (during `npm run build` on Node.js) and
 *     `src/entry-client.ts` (during instant client-side navigation in the
 *     browser) call `renderRoute(pathname)` here!
 *
 *   How IBM Carbon Web Components (`<cds-tile>`, `<cds-tag>`, `<cds-accordion>`,
 *   `<cds-accordion-item>`) Work with Static Pre-Rendering:
 *     - At Build Time: `renderRoute()` outputs complete semantic HTML5 (`<header>`,
 *       `<main id="main-content">`, `<section>`, `<table>` with `<th scope="col/row">`)
 *       alongside `<cds-tile>` and `<cds-accordion>` Custom Element tags so
 *       crawlers, screen readers, and air-gapped browsers receive 100% of every
 *       product spec immediately on first HTTP paint!
 *     - In the Browser: `entry-client.ts` registers `@carbon/web-components`
 *       custom elements, upgrading `<cds-tile>` and `<cds-accordion>` seamlessly
 *       while wiring interactive rule filtering on `/docs` and Light/Dark theme
 *       switching!
 * ============================================================================
 */

import {
  BUILT_IN_RULES,
  CORE_CAPABILITIES,
  HERO_KPIS,
  MSI_GPO_PROPERTIES,
  STUDIO_ASSETS,
  STUDIO_ROUTES
} from './data/studioProductData';

export { STUDIO_ROUTES };

export type RuleCategoryFilter = 'all' | 'html' | 'css' | 'vtt';

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function normalizeStudioPath(rawPath: string): string {
  if (!rawPath || rawPath === '/' || rawPath === '/index.html') return '/';
  const cleaned = rawPath.replace(/\.html$/i, '').replace(/\/+$/, '');
  return STUDIO_ROUTES.some((r) => r.path === cleaned) ? cleaned : '/404';
}

export function renderRuleCatalogTableHtml(
  category: RuleCategoryFilter = 'all',
  query = ''
): string {
  const q = query.trim().toLowerCase();
  const filtered = BUILT_IN_RULES.filter((r) => {
    const catOk = category === 'all' || r.category === category;
    if (!catOk) return false;
    if (!q) return true;
    return (
      r.ruleId.toLowerCase().includes(q) ||
      r.wcag.toLowerCase().includes(q) ||
      r.section508.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.guidedFix.toLowerCase().includes(q)
    );
  });

  if (filtered.length === 0) {
    return `
      <cds-tile class="cs-tile">
        <div>
          <h3>No built-in rules matched that filter</h3>
          <p>Clear the search filter to browse all ${BUILT_IN_RULES.length} deterministic HTML5, WAI-ARIA, CSS, and WebVTT rules.</p>
        </div>
      </cds-tile>`;
  }

  return `
    <div class="cs-table-region" tabindex="0" role="region" aria-labelledby="rules-table-caption">
      <table class="cs-table">
        <caption id="rules-table-caption">
          Showing ${filtered.length} source-level WCAG 2.2 &amp; Revised Section 508 Web rules
        </caption>
        <thead>
          <tr>
            <th scope="col">Rule ID</th>
            <th scope="col">Severity</th>
            <th scope="col">WCAG 2.2 / Section 508</th>
            <th scope="col">Assisted Guided Fix</th>
            <th scope="col">Engineering Verification</th>
          </tr>
        </thead>
        <tbody>
          ${filtered
            .map(
              (r) => `
            <tr id="rule-${esc(r.ruleId)}">
              <th scope="row"><code class="cs-mono">${esc(r.ruleId)}</code></th>
              <td><strong>${esc(r.severity)}</strong></td>
              <td>${esc(r.wcag)}<br /><small>${esc(r.section508)}</small></td>
              <td>${esc(r.guidedFix)}</td>
              <td>${esc(r.summary)}</td>
            </tr>`
            )
            .join('\n')}
        </tbody>
      </table>
    </div>`;
}

function renderOverviewPage(): string {
  return `
    <section class="cs-hero" aria-labelledby="hero-title">
      <div class="cs-container cs-hero-grid">
        <div>
          <span class="cs-eyebrow">Enterprise Workstation IDE &amp; Headless CI/CD CLI</span>
          <h1 id="hero-title">
            <strong>RaggieSoft Accessibility Studio</strong><br />
            Audit, Diff &amp; Refactor WCAG 2.2 at Source Level.
          </h1>
          <p class="cs-lead">
            A purpose-built Windows workstation IDE for engineering, higher-education, and public-sector web teams.
            Inspect <strong>HTML5</strong>, <strong>WAI-ARIA</strong>, <strong>CSS contrast tokens</strong>, and
            <strong>WebVTT captions</strong> with syntax highlighting, side-by-side refactoring diffs, live Chromium
            DOM emulation, and OASIS SARIF 2.1.0 reporting.
          </p>
          <div class="cs-btn-row">
            <a href="${esc(STUDIO_ASSETS.githubRepoUrl)}" class="cs-btn cs-btn-primary">
              <span>View Open-Source Repository (MIT)</span><span aria-hidden="true">→</span>
            </a>
            <a href="/enterprise" data-local-nav="true" class="cs-btn cs-btn-secondary">
              <span>Enterprise MSI &amp; GPO Specs</span><span aria-hidden="true">→</span>
            </a>
            <a href="/reports" data-local-nav="true" class="cs-btn cs-btn-ghost">
              <span>Inspect Sample Reports</span>
            </a>
          </div>
        </div>

        <div class="cs-ide-frame" role="img" aria-label="RaggieSoft Accessibility Studio workstation window showing Monaco side-by-side refactoring diff and WCAG 2.2 Error List">
          <div class="cs-ide-titlebar">
            <span>RaggieSoft Accessibility Studio — SampleCourseModule.html</span>
            <span class="cs-mono" aria-hidden="true">_ □ ×</span>
          </div>
          <div class="cs-ide-toolbar">
            <span class="cs-ide-pill cs-ide-pill--blue">▶ Run Audit (F5)</span>
            <span class="cs-ide-pill">🔍 Preview Diff (Ctrl+D)</span>
            <span class="cs-ide-pill">Forced-Colors HC</span>
            <span class="cs-ide-pill">400% Reflow</span>
            <span class="cs-ide-pill">Tab Order [1..N]</span>
          </div>
          <div class="cs-ide-diff cs-mono">
            <div class="cs-ide-pane">
              <div class="cs-ide-pane-label">Original Markup (Before)</div>
              <code>&lt;tr&gt;</code><br />
              <code class="cs-line-del">- &lt;td style="font-weight:bold"&gt;Week&lt;/td&gt;</code>
              <code class="cs-line-del">- &lt;td style="font-weight:bold"&gt;Topic&lt;/td&gt;</code>
              <code>&lt;/tr&gt;</code>
            </div>
            <div class="cs-ide-pane">
              <div class="cs-ide-pane-label">Guided Fix Preview (After)</div>
              <code>&lt;tr&gt;</code><br />
              <code class="cs-line-add">+ &lt;th scope="col"&gt;Week&lt;/th&gt;</code>
              <code class="cs-line-add">+ &lt;th scope="col"&gt;Topic&lt;/th&gt;</code>
              <code>&lt;/tr&gt;</code>
            </div>
          </div>
          <div class="cs-ide-errors cs-mono">
            <div class="cs-ide-error-row">
              <span><strong>[Serious]</strong> WCAG-TABLE-FAKE-HEADER (1.3.1 / 508 E205.4)</span>
              <span>Ln 22:5 • ⚡ Guided Fix</span>
            </div>
            <div class="cs-ide-error-row">
              <span><strong>[Serious]</strong> WCAG-CSS-CONTRAST (3.08:1 &lt; 4.5:1 AA)</span>
              <span>Ln 6:34 • ⚡ #58606E</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cs-section" aria-label="Key Product Metrics">
      <div class="cs-container">
        <div class="cs-kpi-grid">
          ${HERO_KPIS.map(
            (kpi) => `
            <div class="cs-kpi-cell">
              <span class="cs-kpi-number">${esc(kpi.number)}</span>
              <span class="cs-kpi-label">${esc(kpi.label)}</span>
              <span class="cs-kpi-note">${esc(kpi.note)}</span>
            </div>`
          ).join('\n')}
        </div>
      </div>
    </section>

    <section class="cs-section" aria-labelledby="capabilities-heading">
      <div class="cs-container">
        <div class="cs-section-head">
          <h2 id="capabilities-heading">Engineered for Source-Code Remediation—Not Post-Hoc Overlays</h2>
          <p>
            Browser overlay widgets never repair underlying DOM semantics. RaggieSoft Accessibility Studio gives
            front-end engineers and compliance leads deterministic line-and-column diagnostics where markup lives.
          </p>
        </div>
        <div class="cs-grid-3">
          ${CORE_CAPABILITIES.map(
            (cap) => `
            <cds-tile class="cs-tile">
              <div>
                <span class="cs-tag-badge">${esc(cap.tag)}</span>
                <h3>${esc(cap.title)}</h3>
                <p>${esc(cap.summary)}</p>
                <ul class="cs-list">
                  ${cap.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}
                </ul>
              </div>
            </cds-tile>`
          ).join('\n')}
        </div>
      </div>
    </section>`;
}

function renderFeaturesPage(): string {
  return `
    <header class="cs-page-header">
      <div class="cs-container">
        <span class="cs-eyebrow">Workstation Architecture</span>
        <h1><strong>IDE Capabilities</strong> &amp; Guided Source Refactoring</h1>
        <p class="cs-lead">
          Built around a multi-pane developer layout: Workspace Solution Explorer on the left, Monaco Syntax &amp;
          Diff Editor + Live Chromium DOM Inspector in the center, and WCAG 2.2 / Section 508 Diagnostics below.
        </p>
      </div>
    </header>

    <section class="cs-section" aria-labelledby="workflow-heading">
      <div class="cs-container">
        <div class="cs-section-head">
          <h2 id="workflow-heading">Four-Stage Engineering Remediation Workflow</h2>
          <p>Every automated fix stays 100% transparent, diff-reviewed, and cryptographically logged.</p>
        </div>
        <div class="cs-grid-2">
          <cds-tile class="cs-tile">
            <div>
              <span class="cs-tag-badge">Stage 01 • Static &amp; Inline Style Analysis</span>
              <h3>Open Any Web Folder, Sitemap, or <code>.a11yproj</code> Workspace</h3>
              <p>
                Scan HTML5 templates (<code>.html</code>, <code>.astro</code>, <code>.svelte</code>, <code>.php</code>),
                stylesheets (<code>.css</code>), embedded <code>&lt;style&gt;</code> blocks with automatic line-offset
                mapping, and synchronized <code>.vtt</code> caption files in milliseconds.
              </p>
            </div>
          </cds-tile>
          <cds-tile class="cs-tile">
            <div>
              <span class="cs-tag-badge">Stage 02 • Visual DOM &amp; Emulation Verification</span>
              <h3>Inspect Live Bounding Boxes, 400% Reflow &amp; High Contrast</h3>
              <p>
                Clicking any row in the Error List draws a high-contrast crimson focus frame around the live DOM node
                while toolbar switches test Windows Forced-Colors High Contrast, 400% WCAG 1.4.10 Reflow, and
                <code>[1..N]</code> sequential keyboard Tab badges.
              </p>
            </div>
          </cds-tile>
          <cds-tile class="cs-tile">
            <div>
              <span class="cs-tag-badge">Stage 03 • Side-by-Side Diff Refactoring</span>
              <h3>Review Before &amp; After Markup Before Touching Disk</h3>
              <p>
                Press <code>Ctrl+D</code> on any Guided Fix finding to launch a split Before/After diff inside the
                Monaco editor. Promote fake bold table rows to <code>&lt;th scope="col"&gt;</code>, restore suppressed
                focus rings, or apply nearest-passing <code>4.5:1</code> AA hex colors with full undo control.
              </p>
            </div>
          </cds-tile>
          <cds-tile class="cs-tile">
            <div>
              <span class="cs-tag-badge">Stage 04 • Authenticated Batch &amp; Audit Sign-Off</span>
              <h3>Scan SSO Staging Portals Politely &amp; Export Proof</h3>
              <p>
                Sign into campus or enterprise SSO portals once in the built-in browser tab, load a <code>.csv</code>
                target list or <code>sitemap.xml</code>, and step through hundreds of pages at a polite
                <code>1,500ms</code> throttle without triggering WAF blocks.
              </p>
            </div>
          </cds-tile>
        </div>
      </div>
    </section>`;
}

function renderEnterprisePage(): string {
  return `
    <header class="cs-page-header">
      <div class="cs-container">
        <span class="cs-eyebrow">IT Fleet Deployment &amp; DevSecOps</span>
        <h1><strong>Enterprise MSI, Group Policy</strong> &amp; CI/CD Pipelines</h1>
        <p class="cs-lead">
          Born in production higher-education and public-sector web compliance workflows, RaggieSoft Accessibility
          Studio deploys cleanly across managed Windows 11 Pro workstations (<code>x64</code> &amp; <code>ARM64</code>)
          and headless build runners.
        </p>
      </div>
    </header>

    <section class="cs-section" aria-labelledby="msi-heading">
      <div class="cs-container">
        <div class="cs-section-head">
          <h2 id="msi-heading">Silent Enterprise Setup (<code>/s</code>) &amp; Group Policy Properties</h2>
          <p>
            Deploy the universal <code>x64</code> + <code>ARM64</code> offline setup executable unattended through
            Microsoft Intune, Endpoint Configuration Manager (SCCM), or <code>winget</code> with zero user prompts
            and deterministic Windows Registry policy defaults.
          </p>
        </div>

        <pre class="cs-code-block"><code>raggiesoft-accessibility-studio-setup.exe /s ^
  COMPLIANCE_PROFILE="AdaTitleIIWeb" ^
  BATCH_THROTTLE_MS="1500" ^
  DISABLE_TELEMETRY="1" ^
  ADD_CLI_TO_PATH="1"</code></pre>

        <div style="margin-top: 1.5rem;" class="cs-table-region" tabindex="0" role="region" aria-labelledby="msi-table-caption">
          <table class="cs-table">
            <caption id="msi-table-caption">Public Windows Installer (MSI) &amp; Group Policy Registry Matrix</caption>
            <thead>
              <tr>
                <th scope="col">Public MSI Property</th>
                <th scope="col">Default Value</th>
                <th scope="col">Windows Policy Registry Path</th>
                <th scope="col">Enterprise Behavior</th>
              </tr>
            </thead>
            <tbody>
              ${MSI_GPO_PROPERTIES.map(
                (row) => `
                <tr>
                  <th scope="row"><code class="cs-mono">${esc(row.property)}</code></th>
                  <td><code class="cs-mono">${esc(row.defaultValue)}</code></td>
                  <td><code class="cs-mono">${esc(row.registryTarget)}</code></td>
                  <td>${esc(row.description)}</td>
                </tr>`
              ).join('\n')}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="cs-section" aria-labelledby="cicd-heading">
      <div class="cs-container">
        <div class="cs-section-head">
          <h2 id="cicd-heading">Headless CI/CD Gatekeeper (<code>a11y-studio-cli</code>)</h2>
          <p>
            Fail pull requests automatically when new Critical or Serious WCAG 2.2 / Section 508 regressions enter a
            web repository, and upload SARIF 2.1.0 directly to GitHub Code Scanning or Azure DevOps.
          </p>
        </div>
        <pre class="cs-code-block"><code># Audit a compiled static site or web template tree and fail CI on Serious/Critical regressions:
a11y-studio-cli audit ./dist \\
  --profile Wcag22AA_Section508 \\
  --sarif ./artifacts/a11y-audit.sarif \\
  --html ./artifacts/a11y-executive-report.html \\
  --fail-on Serious</code></pre>
      </div>
    </section>`;
}

function renderReportsPage(): string {
  return `
    <header class="cs-page-header">
      <div class="cs-container">
        <span class="cs-eyebrow">Compliance Deliverables &amp; Traceability</span>
        <h1><strong>Executive Reports, SARIF 2.1.0</strong> &amp; SHA-256 Logs</h1>
        <p class="cs-lead">
          Give engineering teams line-accurate SARIF 2.1.0 artifacts while giving compliance officers and program
          directors clean, print-ready HTML5 conformance summaries.
        </p>
      </div>
    </header>

    <section class="cs-section" aria-labelledby="exports-heading">
      <div class="cs-container">
        <div class="cs-section-head">
          <h2 id="exports-heading">Four Built-In Export Artifacts + Cryptographic Session Logs</h2>
          <p>Every exported report is generated locally on your workstation with zero external cloud dependencies.</p>
        </div>
        <div class="cs-grid-2">
          <cds-tile class="cs-tile">
            <div>
              <span class="cs-tag-badge">01 • Standalone Accessible HTML5 (.html)</span>
              <h3>WCAG 2.2 AA Executive &amp; Developer Conformance Report</h3>
              <p>
                Zero-dependency single-file HTML5 deliverable with KPI cards, SHA-256 file inventory, semantic
                <code>&lt;th scope="col/row"&gt;</code> tables, automatic Light/Dark mode, and <code>@media print</code>
                formatting.
              </p>
            </div>
          </cds-tile>
          <cds-tile class="cs-tile">
            <div>
              <span class="cs-tag-badge">02 • OASIS SARIF 2.1.0 (.sarif)</span>
              <h3>GitHub Code Scanning, Azure DevOps &amp; Visual Studio Native</h3>
              <p>
                Emits standard <code>physicalLocation.region</code> coordinates (<code>startLine</code>,
                <code>startColumn</code>) plus WCAG 2.2 and Revised Section 508 rule metadata.
              </p>
            </div>
          </cds-tile>
        </div>

        <h3 style="margin-top: 2rem;">Sample OASIS SARIF 2.1.0 Output Excerpt</h3>
        <pre class="cs-code-block"><code>{
  "version": "2.1.0",
  "runs": [
    {
      "tool": {
        "driver": {
          "name": "RaggieSoft Accessibility Studio",
          "informationUri": "https://a11y.raggiesoft.com",
          "version": "1.0.0"
        }
      },
      "results": [
        {
          "ruleId": "WCAG-TABLE-FAKE-HEADER",
          "level": "error",
          "message": { "text": "First table row uses bold <td> cells instead of semantic <th scope=\\"col\\"> headers." },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": { "uri": "course/syllabus.html" },
                "region": { "startLine": 22, "startColumn": 5 }
              }
            }
          ]
        }
      ]
    }
  ]
}</code></pre>
      </div>
    </section>`;
}

function renderDocsPage(): string {
  return `
    <header class="cs-page-header">
      <div class="cs-container">
        <span class="cs-eyebrow">Technical Reference</span>
        <h1><strong>Rule Catalog</strong>, Keyboard Shortcuts &amp; Exit Codes</h1>
        <p class="cs-lead">
          Filter all built-in HTML5, WAI-ARIA, CSS contrast/focus, and WebVTT caption verification rules, or inspect
          workstation keyboard accelerators and headless CLI exit codes.
        </p>
      </div>
    </header>

    <section class="cs-section" aria-labelledby="catalog-heading">
      <div class="cs-container">
        <div class="cs-section-head">
          <h2 id="catalog-heading">Interactive Built-In Rule Catalog</h2>
          <p>Search by Rule ID, WCAG 2.2 Success Criterion, Section 508 citation, or Guided Fix behavior.</p>
        </div>

        <div class="cs-filter-bar" role="search" aria-label="Filter built-in accessibility rules">
          <label for="cs-rule-search" class="cs-mono" style="font-size:0.85rem;">Filter:</label>
          <input
            id="cs-rule-search"
            type="search"
            class="cs-search-input"
            placeholder="Search rule ID, WCAG 1.4.3, table, vtt…"
          />
          <button type="button" class="cs-filter-chip" data-rule-cat="all" aria-pressed="true">All (${BUILT_IN_RULES.length})</button>
          <button type="button" class="cs-filter-chip" data-rule-cat="html" aria-pressed="false">HTML5 &amp; ARIA</button>
          <button type="button" class="cs-filter-chip" data-rule-cat="css" aria-pressed="false">CSS &amp; Contrast</button>
          <button type="button" class="cs-filter-chip" data-rule-cat="vtt" aria-pressed="false">WebVTT Captions</button>
        </div>

        <div id="cs-rules-results">
          ${renderRuleCatalogTableHtml('all', '')}
        </div>
      </div>
    </section>

    <section class="cs-section" aria-labelledby="faq-heading">
      <div class="cs-container">
        <div class="cs-section-head">
          <h2 id="faq-heading">Engineering &amp; Licensing FAQ</h2>
          <p>Key architectural boundaries for enterprise compliance teams.</p>
        </div>
        <cds-accordion>
          <cds-accordion-item title="Does automated source scanning replace manual screen-reader testing?">
            <p>
              No—and RaggieSoft Accessibility Studio states this explicitly in every exported HTML5 report. Automated
              source and DOM checks catch deterministic structural, contrast, labeling, focus-suppression, and WebVTT
              timing defects rapidly so engineers can focus manual keyboard (<code>Tab</code>, <code>Shift+Tab</code>,
              <code>Escape</code>) and assistive-technology verification (<code>JAWS</code>, <code>NVDA</code>,
              <code>VoiceOver</code>) on real user workflows.
            </p>
          </cds-accordion-item>
          <cds-accordion-item title="What are the CLI exit codes for CI/CD build pipelines?">
            <p>
              <code>0</code> = Audit passed threshold; <code>1</code> = Usage or I/O error; <code>2</code> = One or
              more accessibility findings met or exceeded your <code>--fail-on</code> severity gate
              (<code>Critical</code>, <code>Serious</code>, <code>Moderate</code>, or <code>Advisory</code>).
            </p>
          </cds-accordion-item>
          <cds-accordion-item title="How is RaggieSoft Accessibility Studio licensed?">
            <p>
              All C#/.NET 10 IDE, analyzer, reporting, and CLI source code in
              <code>raggiesoft/accessibility-studio</code> is open-source under the permissive <strong>MIT
              License</strong>, suitable for commercial, educational, and public-sector workstation deployment.
            </p>
          </cds-accordion-item>
        </cds-accordion>
      </div>
    </section>`;
}

function renderNotFoundPage(): string {
  return `
    <section class="cs-section" aria-labelledby="not-found-title">
      <div class="cs-container">
        <span class="cs-eyebrow">HTTP 404 — Route Not Found</span>
        <h1 id="not-found-title">Requested Documentation or Product Route Not Found</h1>
        <p class="cs-lead">
          Return to the RaggieSoft Accessibility Studio product overview or browse the global RaggieSoft directory.
        </p>
        <div class="cs-btn-row">
          <a href="/" data-local-nav="true" class="cs-btn cs-btn-primary">Return to Product Overview →</a>
          <a href="https://waystation.raggiesoft.com" class="cs-btn cs-btn-ghost">Open RaggieSoft Global Directory</a>
        </div>
      </div>
    </section>`;
}

export function renderRoute(rawPath: string): { html: string; normalizedPath: string } {
  const normalizedPath = normalizeStudioPath(rawPath);

  let pageBody: string;
  switch (normalizedPath) {
    case '/':
      pageBody = renderOverviewPage();
      break;
    case '/features':
      pageBody = renderFeaturesPage();
      break;
    case '/enterprise':
      pageBody = renderEnterprisePage();
      break;
    case '/reports':
      pageBody = renderReportsPage();
      break;
    case '/docs':
      pageBody = renderDocsPage();
      break;
    default:
      pageBody = renderNotFoundPage();
      break;
  }

  const shellHtml = `
    <header class="cs-shell-header">
      <div class="cs-shell-inner">
        <a href="/" data-local-nav="true" class="cs-brand">
          <img src="${esc(STUDIO_ASSETS.logoSvg)}" alt="" width="24" height="24" />
          <span>
            <span class="cs-brand-prefix">RaggieSoft</span>
            <span class="cs-brand-product">Accessibility Studio</span>
          </span>
        </a>

        <button
          type="button"
          class="rs-mobile-header-toggle cs-mobile-toggle"
          data-rs-mobile-toggle
          data-open-label="Open navigation and theme menu"
          data-close-label="Close navigation and theme menu"
          aria-expanded="false"
          aria-controls="header-navigation-panel"
          aria-label="Open navigation and theme menu"
        >
          <svg class="rs-icon-bars" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg class="rs-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div id="header-navigation-panel" class="cs-nav-panel" data-rs-collapsible="true">
          <nav aria-label="RaggieSoft Accessibility Studio Product Navigation">
            <ul class="cs-nav-list">
              ${STUDIO_ROUTES.map(
                (r) => `
                <li>
                  <a
                    href="${esc(r.path)}"
                    data-local-nav="true"
                    class="cs-nav-link"
                    ${r.path === normalizedPath ? 'aria-current="page"' : ''}
                  >${esc(r.navLabel)}</a>
                </li>`
              ).join('\n')}
            </ul>
          </nav>

          <div class="cs-header-actions">
            <button
              type="button"
              id="cs-theme-toggle"
              class="cs-theme-btn"
              aria-label="Toggle Light or Dark color theme"
            >
              <span id="cs-theme-label">🌓 Theme</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main id="main-content" tabindex="-1">
      ${pageBody}
    </main>

    <footer class="cs-footer">
      <div class="cs-container">
        <div class="cs-footer-grid">
          <div>
            <h2>RaggieSoft Accessibility Studio</h2>
            <p>
              Enterprise Windows workstation IDE &amp; CI/CD CLI for source-level WCAG 2.2 Level AA and Revised Section
              508 web compliance engineering. Created by <a href="https://michaelpragsdale.com">Michael P. Ragsdale</a>.
            </p>
            <p>
              Open-source software code licensed under the <strong>MIT License</strong>; editorial documentation licensed
              under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
            </p>
          </div>
          <div>
            <h3>Product Documentation</h3>
            <ul>
              <li><a href="/" data-local-nav="true">Product Overview</a></li>
              <li><a href="/features" data-local-nav="true">IDE &amp; Guided Diffs</a></li>
              <li><a href="/enterprise" data-local-nav="true">Enterprise MSI, GPO &amp; CLI</a></li>
              <li><a href="/reports" data-local-nav="true">Sample WCAG &amp; SARIF Reports</a></li>
              <li><a href="/docs" data-local-nav="true">Rule Catalog &amp; Exit Codes</a></li>
            </ul>
          </div>
          <div>
            <h3>RaggieSoft Ecosystem</h3>
            <ul>
              <li><a href="${esc(STUDIO_ASSETS.githubRepoUrl)}">GitHub Source Repository</a></li>
              <li><a href="https://raggiesoft.com">RaggieSoft Front Door</a></li>
              <li><a href="https://launcher.raggiesoft.com">RaggieSoft Launcher</a></li>
              <li><a href="https://jessica.raggiesoft.com">Jessica — Stories Behind the Projects</a></li>
              <li><a href="https://waystation.raggiesoft.com">Global Ecosystem Directory</a></li>
            </ul>
          </div>
        </div>

        <p class="cs-disclaimer">
          <strong>Fictitious Persons &amp; Entities Notice:</strong> RaggieSoft, RaggieSoft Media, Engine Room Records,
          Ocean View Archives, and RaggieSoft Story Crossroads are unincorporated creative &amp; software imprints of
          Michael P. Ragsdale. Any narrative characters, bands, fictional universities (CPI, VDU), fictional
          corporations (OmniCorp, Apex Records, Prairie Coachworks, Sainte-Claire), fictional transit agencies (BRT,
          CVTA), or in-universe entities bearing &ldquo;LLC&rdquo;, &ldquo;Trust&rdquo;, or &ldquo;Holdings&rdquo; across
          the broader RaggieSoft ecosystem and sample test fixtures are works of fiction. Any resemblance to actual
          persons, living or dead, or real-world organizations is purely coincidental.
        </p>
      </div>
    </footer>`;

  return { html: shellHtml, normalizedPath };
}
