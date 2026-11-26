#!/usr/bin/env node
/**
 * @license MIT
 * ============================================================================
 * scripts/prerender.mjs — Static Site Generator, OpenGraph & Sitemap Compiler
 * Property: https://a11y.raggiesoft.com (raggiesoft-a11y-studio)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL NODE.JS SSG BUILD SCRIPT):
 *   What does this script do at the end of `npm run build`?
 *     1. Compiles `src/entry-server.ts` into a temporary SSR module via Vite
 *        (`vite build --ssr src/entry-server.ts --outDir .ssr-temp`).
 *     2. Pre-renders all 5 commercial product routes (`/`, `/features`,
 *        `/enterprise`, `/reports`, `/docs`) PLUS `/404.html` into static HTML
 *        files inside `dist/`.
 *     3. Enforces `<= 60` character `<title>` and `<= 155` character
 *        `<meta description>`, emits OpenGraph + Twitter Card tags and
 *        Schema.org `SoftwareApplication` JSON-LD, writes `dist/sitemap.xml`,
 *        `dist/robots.txt`, and the IndexNow verification key, and removes
 *        `.ssr-temp/`!
 * ============================================================================
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const ssrDir = path.join(projectRoot, '.ssr-temp');

const SITE_ORIGIN = 'https://raggiesoftstudio.com';
const MOUNT_PREFIX = '/accessibility-studio';
const STUDIO_CANONICAL_BASE = `${SITE_ORIGIN}${MOUNT_PREFIX}`;
const OG_IMAGE = 'https://assets.raggiesoft.com/raggiesoft-a11y-studio/images/og-a11y-studio.jpg';
const FAVICON_SVG = 'https://assets.raggiesoft.com/raggiesoft-a11y-studio/images/studio-logo.svg';
const INDEXNOW_KEY = '726167676965736f6674696e6465786e';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSeoHead({ seoTitle, seoDescription, canonicalUrl, noindex = false }) {
  if (seoTitle.length > 60) {
    throw new Error(`SEO Title exceeds 60 chars (${seoTitle.length}): "${seoTitle}"`);
  }
  if (seoDescription.length > 155) {
    throw new Error(`SEO Description exceeds 155 chars (${seoDescription.length}): "${seoDescription}"`);
  }

  const robots = noindex ? 'noindex,follow' : 'index,follow';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${STUDIO_CANONICAL_BASE}#software`,
        name: 'RaggieSoft Accessibility Studio',
        url: STUDIO_CANONICAL_BASE,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows 11 (x64, ARM64)',
        softwareVersion: '1.0.0',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Person',
          '@id': 'https://michaelpragsdale.com/#michael-ragsdale',
          name: 'Michael P. Ragsdale',
          url: 'https://michaelpragsdale.com'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: 'RaggieSoft Studio'
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seoTitle,
        description: seoDescription,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${STUDIO_CANONICAL_BASE}#software` }
      }
    ]
  };

  return [
    `<title>${escapeHtml(seoTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(seoDescription)}" />`,
    `<meta name="robots" content="${robots}" />`,
    ...(noindex ? [] : [`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`]),
    `<link rel="icon" type="image/svg+xml" href="${escapeHtml(FAVICON_SVG)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="RaggieSoft Accessibility Studio" />`,
    `<meta property="og:title" content="${escapeHtml(seoTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seoDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<meta property="og:image:alt" content="RaggieSoft Accessibility Studio — Enterprise WCAG 2.2 AA and Section 508 Web IDE" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seoTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seoDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  ].join('\n    ');
}

async function main() {
  const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
  execFileSync(
    process.execPath,
    [viteBin, 'build', '--ssr', 'src/entry-server.ts', '--outDir', '.ssr-temp'],
    { cwd: projectRoot, stdio: 'inherit' }
  );

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const ssrEntryUrl = pathToFileURL(path.join(ssrDir, 'entry-server.js')).href;
  const { renderRoute, STUDIO_ROUTES } = await import(ssrEntryUrl);

  for (const route of STUDIO_ROUTES) {
    const { html } = renderRoute(route.path);
    const canonicalUrl = route.path === '/' ? STUDIO_CANONICAL_BASE : `${STUDIO_CANONICAL_BASE}${route.path}`;
    const headMarkup = buildSeoHead({
      seoTitle: route.seoTitle,
      seoDescription: route.seoDescription,
      canonicalUrl,
      noindex: false
    });

    const finalPage = templateHtml
      .replace('<!--SSR_HEAD-->', headMarkup)
      .replace('<!--SSR_OUTLET-->', html);

    if (route.path === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), finalPage, 'utf8');
    } else {
      const subName = route.path.replace(/^\/+/, '');
      const routeFolder = path.join(distDir, subName);
      fs.mkdirSync(routeFolder, { recursive: true });
      fs.writeFileSync(path.join(routeFolder, 'index.html'), finalPage, 'utf8');
      fs.writeFileSync(path.join(distDir, `${subName}.html`), finalPage, 'utf8');
    }
  }

  // Generate genuine `/404.html` (`noindex,follow`)
  const notFoundRender = renderRoute('/404');
  const notFoundHead = buildSeoHead({
    seoTitle: '404 Not Found | RaggieSoft Accessibility Studio',
    seoDescription: 'The requested RaggieSoft Accessibility Studio page was not found.',
    canonicalUrl: `${STUDIO_CANONICAL_BASE}/404`,
    noindex: true
  });
  const notFoundPage = templateHtml
    .replace('<!--SSR_HEAD-->', notFoundHead)
    .replace('<!--SSR_OUTLET-->', notFoundRender.html);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundPage, 'utf8');

  // Generate `sitemap.xml`, `robots.txt`, and IndexNow verification file
  const today = new Date().toISOString().slice(0, 10);
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...STUDIO_ROUTES.map((r) => {
      const loc = r.path === '/' ? STUDIO_CANONICAL_BASE : `${STUDIO_CANONICAL_BASE}${r.path}`;
      const priority = r.path === '/' ? '0.9' : '0.8';
      return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
    }),
    '</urlset>',
    ''
  ].join('\n');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');

  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.join(distDir, `${INDEXNOW_KEY}.txt`), `${INDEXNOW_KEY}\n`, 'utf8');

  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log(`[prerender] Pre-rendered ${STUDIO_ROUTES.length} routes + 404.html + sitemap.xml for ${STUDIO_CANONICAL_BASE}`);
}

main().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
