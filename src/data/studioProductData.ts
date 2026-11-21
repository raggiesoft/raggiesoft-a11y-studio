/**
 * @license MIT
 * ============================================================================
 * src/data/studioProductData.ts — Product Specs, Rules, MSI Matrix & SEO Routes
 * Property: https://a11y.raggiesoft.com (raggiesoft-a11y-studio)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL SINGLE SOURCE OF TRUTH GUIDE):
 *   What is this file?
 *     Centralizes every commercial B2B product specification, SEO `<title>` /
 *     `<meta description>` pair, built-in WCAG 2.2 & Revised Section 508 Web
 *     rule descriptor, Enterprise MSI / GPO property row, and CLI pipeline flag
 *     for **RaggieSoft Accessibility Studio (Enterprise Edition v1.0)**.
 *
 *   Strict Product & Brand Guardrails Enforced Here:
 *     1. Every SEO `<title>` is verified `<= 60` characters and every
 *        `<meta description>` is verified `<= 155` characters.
 *     2. 100% Source-Level Web Accessibility scope (`HTML5`, `WAI-ARIA`, `CSS`,
 *        `BCP 47`, `WebVTT`, live rendered Chromium DOM, and OASIS SARIF 2.1.0).
 *     3. Pure commercial enterprise software vendor presentation (`Born in
 *        Production Higher-Education & Public-Sector Web Workflows`).
 * ============================================================================
 */

export interface StudioRouteMeta {
  path: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
}

export interface CapabilityPillar {
  tag: string;
  title: string;
  summary: string;
  bullets: string[];
}

export interface BuiltInRuleSpec {
  ruleId: string;
  severity: 'Critical' | 'Serious' | 'Moderate' | 'Advisory';
  category: 'html' | 'css' | 'vtt';
  wcag: string;
  section508: string;
  guidedFix: string;
  summary: string;
}

export interface MsiPropertySpec {
  property: string;
  defaultValue: string;
  registryTarget: string;
  description: string;
}

export const STUDIO_ASSETS = {
  logoSvg: 'https://assets.raggiesoft.com/raggiesoft-a11y-studio/images/studio-logo.svg',
  ogBanner: 'https://assets.raggiesoft.com/raggiesoft-a11y-studio/images/og-a11y-studio.jpg',
  githubRepoUrl: 'https://github.com/raggiesoft/accessibility-studio'
} as const;

export const STUDIO_ROUTES: readonly StudioRouteMeta[] = [
  {
    path: '/',
    navLabel: 'Overview',
    seoTitle: 'RaggieSoft Accessibility Studio | WCAG & 508 Web IDE',
    seoDescription:
      'Enterprise Windows IDE & CLI for source-level WCAG 2.2 AA and Revised Section 508 web auditing, side-by-side diffs, and SARIF 2.1.0 reporting.'
  },
  {
    path: '/features',
    navLabel: 'IDE & Refactoring',
    seoTitle: 'IDE Features & Diffs | RaggieSoft Accessibility Studio',
    seoDescription:
      'Explore Monaco syntax highlighting, side-by-side WCAG refactoring diffs, live Chromium DOM emulation, and authenticated SSO batch scanning.'
  },
  {
    path: '/enterprise',
    navLabel: 'Enterprise MSI & CLI',
    seoTitle: 'MSI, GPO & CI/CD CLI | RaggieSoft Accessibility Studio',
    seoDescription:
      'Deploy silently across Windows 11 Pro workstations via MSI Group Policy properties, Intune/SCCM, and headless CI/CD SARIF 2.1.0 gates.'
  },
  {
    path: '/reports',
    navLabel: 'Reports & Audit Logs',
    seoTitle: 'WCAG & SARIF Reports | RaggieSoft Accessibility Studio',
    seoDescription:
      'Generate self-contained WCAG 2.2 AA HTML5 executive reports, OASIS SARIF 2.1.0 static analysis artifacts, CSVs, and SHA-256 session logs.'
  },
  {
    path: '/docs',
    navLabel: 'Documentation & Rules',
    seoTitle: 'Docs & Rule Catalog | RaggieSoft Accessibility Studio',
    seoDescription:
      'Browse built-in WCAG 2.2 AA and Revised Section 508 web rules, keyboard shortcuts, and CLI exit codes for RaggieSoft Accessibility Studio.'
  }
] as const;

export const HERO_KPIS = [
  {
    number: '17+',
    label: 'Deterministic Source & DOM Rules',
    note: 'Exact 1-based Line & Column coordinates across HTML5, WAI-ARIA, CSS, and WebVTT.'
  },
  {
    number: '4',
    label: 'Enterprise Export Formats',
    note: 'Accessible HTML5, OASIS SARIF 2.1.0, Formula-Safe CSV, and SHA-256 JSON/JSONL.'
  },
  {
    number: '100%',
    label: 'Air-Gapped Workstation Ready',
    note: 'Zero mandatory cloud accounts, local Monaco syntax/diff engine, and GPO telemetry lock.'
  },
  {
    number: 'x64 + ARM64',
    label: 'Windows 11 Enterprise MSI & CLI',
    note: 'Silent msiexec deployment, Explorer folder verbs, and headless CI/CD exit-code gates.'
  }
] as const;

export const CORE_CAPABILITIES: readonly CapabilityPillar[] = [
  {
    tag: 'Monaco Editor + Diffs',
    title: 'True Developer IDE with Side-by-Side Guided Fixes',
    summary:
      'Audit findings never blindly overwrite production markup. Select any violation to preview a green/red side-by-side diff before committing to your buffer.',
    bullets: [
      'Inline red/amber squiggles mapped to exact line and column positions',
      'One-keystroke jump (`Enter` / `F8`) from Error List row to offending tag',
      'Assisted fixes for fake `<td>` headers, missing `scope`, `lang`, focus rings, and AA contrast'
    ]
  },
  {
    tag: 'Live Chromium Inspector',
    title: 'Visual DOM Bounding Boxes & Assistive Emulation',
    summary:
      'Pair static source analysis with a synchronized Chromium surface that highlights selected DOM nodes and tests real visual resilience.',
    bullets: [
      'Forced-Colors Windows High-Contrast palette simulation',
      '400% WCAG 1.4.10 Reflow viewport zoom verification',
      'Sequential `[1..N]` keyboard focus Tab-Order overlays'
    ]
  },
  {
    tag: 'SSO & Polite Batch Queue',
    title: 'Rate-Limited Authenticated Portal & Sitemap Scanning',
    summary:
      'Sign into SSO-protected staging environments or learning portals once, then audit `.csv` schedules or `sitemap.xml` feeds without tripping WAF rate limits.',
    bullets: [
      'Configurable `500ms`–`30,000ms` polite inter-request throttle delay',
      'Captures live post-login DOM through your authenticated workstation session',
      'Aggregates multi-page findings into a unified executive & developer report'
    ]
  },
  {
    tag: 'Audit Trail & SARIF 2.1.0',
    title: 'Tamper-Evident SHA-256 Remediation Logs & CI Gates',
    summary:
      'Every workspace scan and guided source-code fix records before-and-after cryptographic SHA-256 digests for QA review and compliance sign-off.',
    bullets: [
      'Native OASIS SARIF 2.1.0 output for GitHub Code Scanning & Azure DevOps',
      'Self-contained semantic HTML5 reports with `@media print` executive summaries',
      'Spreadsheet-safe CSV export hardened against leading `=`, `+`, `-`, `@` injection'
    ]
  },
  {
    tag: 'Contrast & Token Lab',
    title: 'WCAG 2.2 Relative Luminance & CSS Token Solver',
    summary:
      'Inspect foreground/background CSS pairs and CSS custom properties (`--brand-*`) with deterministic relative-luminance math and auto-tuned AA hex suggestions.',
    bullets: [
      'Verifies 4.5:1 Normal AA, 7.0:1 AAA, and 3.0:1 Large Text / UI 1.4.11 ratios',
      'Computes the nearest brightness-adjusted hex color that clears 4.5:1 AA',
      'Audits both standalone `.css` files and inline `<style>` blocks in HTML'
    ]
  },
  {
    tag: 'Enterprise IT & GPO Ready',
    title: 'Silent MSI Packaging, ProgIds & Group Policy Locks',
    summary:
      'Engineered for managed corporate, public-sector, and higher-education Windows fleets deployed through Microsoft Intune, SCCM, or Active Directory GPO.',
    bullets: [
      'Registers `.a11yproj` workspaces and Explorer "Audit Folder" context verbs',
      'Reads `HKLM\\Software\\Policies\\RaggieSoft\\AccessibilityStudio` policy defaults',
      'Includes `a11y-studio-cli.exe` on system `PATH` for automated build agents'
    ]
  }
];

export const BUILT_IN_RULES: readonly BuiltInRuleSpec[] = [
  {
    ruleId: 'WCAG-HTML-LANG',
    severity: 'Serious',
    category: 'html',
    wcag: '3.1.1 Language of Page (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Injects `lang="en"` on `<html>`',
    summary: 'Detects missing, empty, or malformed BCP 47 `lang` attributes on the root `<html>` element so screen readers load the right pronunciation rules.'
  },
  {
    ruleId: 'WCAG-HTML-TITLE',
    severity: 'Serious',
    category: 'html',
    wcag: '2.4.2 Page Titled (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Inserts `<title>` in `<head>`',
    summary: 'Flags HTML documents missing a non-empty `<title>` element announced first when users switch browser tabs or windows.'
  },
  {
    ruleId: 'WCAG-LANDMARK-MAIN',
    severity: 'Moderate',
    category: 'html',
    wcag: '1.3.1 / 2.4.1 Bypass Blocks (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Manual structural landmark wrap',
    summary: 'Verifies full HTML5 documents expose a primary `<main>` landmark so assistive technology users can jump straight past repeated chrome.'
  },
  {
    ruleId: 'WCAG-LANDMARK-DUP-NAV',
    severity: 'Moderate',
    category: 'html',
    wcag: '1.3.1 Info & Relationships (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Adds `aria-label` to `<nav>`',
    summary: 'Detects multiple `<nav>` regions on the same page that lack distinct `aria-label` or `aria-labelledby` names.'
  },
  {
    ruleId: 'WCAG-HEADING-SKIP',
    severity: 'Moderate',
    category: 'html',
    wcag: '1.3.1 / 2.4.6 Headings & Labels (AA)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Normalizes skipped `<hN>` tag',
    summary: 'Flags skipped heading ranks (such as jumping from `<h1>` directly to `<h4>`) and empty heading elements.'
  },
  {
    ruleId: 'WCAG-TABLE-FAKE-HEADER',
    severity: 'Serious',
    category: 'html',
    wcag: '1.3.1 Info & Relationships (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Converts bold `<td>` row to `<th scope="col">`',
    summary: 'Catches data tables whose first row uses visual bolding (`<td><strong>` or `font-weight: bold`) instead of programmatic `<th>` headers.'
  },
  {
    ruleId: 'WCAG-TABLE-TH-SCOPE',
    severity: 'Moderate',
    category: 'html',
    wcag: '1.3.1 Info & Relationships (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Adds `scope="col"` to `<th>`',
    summary: 'Ensures `<th>` header cells declare explicit `scope="col"` or `scope="row"` attributes for unambiguous cell announcements.'
  },
  {
    ruleId: 'WCAG-IMG-MISSING-ALT',
    severity: 'Critical',
    category: 'html',
    wcag: '1.1.1 Non-text Content (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Adds `alt=""` or descriptive `alt`',
    summary: 'Flags `<img>` tags missing `alt` attributes or containing raw camera/file-extension filenames (`IMG_4021.jpg`).'
  },
  {
    ruleId: 'WCAG-SVG-UNLABELED',
    severity: 'Serious',
    category: 'html',
    wcag: '1.1.1 / 4.1.2 Name, Role, Value (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Adds `aria-hidden="true" focusable="false"`',
    summary: 'Detects inline `<svg>` graphics that neither hide decorative vectors nor provide `role="img"` with an accessible title.'
  },
  {
    ruleId: 'WCAG-FORM-MISSING-LABEL',
    severity: 'Critical',
    category: 'html',
    wcag: '1.3.1 / 4.1.2 Name, Role, Value (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Injects programmatic `aria-label`',
    summary: 'Verifies `<input>`, `<select>`, and `<textarea>` controls have an associated `<label for="...">`, wrapping `<label>`, or ARIA label.'
  },
  {
    ruleId: 'WCAG-INPUT-AUTOCOMPLETE',
    severity: 'Moderate',
    category: 'html',
    wcag: '1.3.5 Identify Input Purpose (AA)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Adds `autocomplete="email"` / `"tel"`',
    summary: 'Checks personal email and telephone inputs for WCAG 2.1/2.2 AA `autocomplete` tokens aiding users with cognitive or motor disabilities.'
  },
  {
    ruleId: 'WCAG-LINK-GENERIC-TEXT',
    severity: 'Serious',
    category: 'html',
    wcag: '2.4.4 Link Purpose in Context (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Manual descriptive link copy',
    summary: 'Flags empty anchors (`<a></a>`) and ambiguous `"click here"` / `"read more"` links lacking descriptive accessible names.'
  },
  {
    ruleId: 'WCAG-ARIA-HIDDEN-FOCUSABLE',
    severity: 'Critical',
    category: 'html',
    wcag: '4.1.2 Name, Role, Value (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Removes `aria-hidden="true"`',
    summary: 'Catches focusable `<button>`, `<a>`, or `<input>` controls marked `aria-hidden="true"`, preventing "ghost focus" traps for screen readers.'
  },
  {
    ruleId: 'WCAG-TABINDEX-POSITIVE',
    severity: 'Serious',
    category: 'html',
    wcag: '2.4.3 Focus Order (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Normalizes to `tabindex="0"`',
    summary: 'Flags positive `tabindex="1+"` attributes that hijack natural DOM keyboard reading order.'
  },
  {
    ruleId: 'WCAG-MEDIA-CAPTIONS',
    severity: 'Critical',
    category: 'html',
    wcag: '1.2.2 Captions Prerecorded (A)',
    section508: 'Revised 508 E205.4 / ADA Title II',
    guidedFix: 'Inserts `<track kind="captions">`',
    summary: 'Ensures HTML5 `<video>` players include synchronized WebVTT `<track kind="captions">` tracks and disables `autoplay` audio.'
  },
  {
    ruleId: 'WCAG-CSS-CONTRAST',
    severity: 'Serious',
    category: 'css',
    wcag: '1.4.3 Contrast Minimum (AA)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Replaces hex with nearest `>= 4.5:1` AA color',
    summary: 'Evaluates CSS foreground/background pairs (including `:root` custom property tokens) against WCAG 2.2 4.5:1 AA relative luminance.'
  },
  {
    ruleId: 'WCAG-CSS-FOCUS-SUPPRESSED',
    severity: 'Serious',
    category: 'css',
    wcag: '2.4.7 Focus Visible (AA)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Restores `3px solid currentColor` focus ring',
    summary: 'Detects CSS rules setting `outline: none` or `outline: 0` without a visible high-contrast focus replacement.'
  },
  {
    ruleId: 'WCAG-VTT-TIMING',
    severity: 'Serious',
    category: 'vtt',
    wcag: '1.2.2 Captions Prerecorded (A)',
    section508: 'Revised 508 E205.4',
    guidedFix: 'Prepends `WEBVTT` header & flags cue overlaps',
    summary: 'Validates WebVTT caption tracks for the mandatory `WEBVTT` header, monotonic `start --> end` cue timestamps, overlapping cues, and empty blocks.'
  }
];

export const MSI_GPO_PROPERTIES: readonly MsiPropertySpec[] = [
  {
    property: 'INSTALLDIR',
    defaultValue: 'C:\\Program Files\\RaggieSoft\\Accessibility Studio\\',
    registryTarget: 'HKLM\\Software\\RaggieSoft\\AccessibilityStudio\\InstallDir',
    description: 'Target workstation installation directory for `AccessibilityStudio.exe` and headless `a11y-studio-cli.exe`.'
  },
  {
    property: 'COMPLIANCE_PROFILE',
    defaultValue: 'Wcag22AA_Section508',
    registryTarget: 'HKLM\\Software\\Policies\\RaggieSoft\\AccessibilityStudio\\ComplianceProfile',
    description: 'Sets organization-wide default rule profile (`Wcag22AA_Section508`, `Wcag22LevelA`, `AdaTitleIIWeb`, or `StrictEnterpriseAll`).'
  },
  {
    property: 'BATCH_THROTTLE_MS',
    defaultValue: '1500',
    registryTarget: 'HKLM\\Software\\Policies\\RaggieSoft\\AccessibilityStudio\\BatchThrottleMs',
    description: 'Default polite inter-request delay (`0`–`30000` ms) for authenticated portal and sitemap batch queues.'
  },
  {
    property: 'DISABLE_TELEMETRY',
    defaultValue: '1',
    registryTarget: 'HKLM\\Software\\Policies\\RaggieSoft\\AccessibilityStudio\\DisableTelemetry',
    description: 'Enforces 100% air-gapped zero-telemetry workstation operation across regulated public-sector and enterprise fleets.'
  },
  {
    property: 'ADD_CLI_TO_PATH',
    defaultValue: '1',
    registryTarget: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment\\Path',
    description: 'Appends the CLI directory to system `PATH` so PowerShell, GitHub Actions, and Azure DevOps runners can invoke `a11y-studio-cli` directly.'
  }
];
