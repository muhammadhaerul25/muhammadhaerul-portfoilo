/**
 * inspect-site.ts — Structural inspection of the live website BEFORE recording.
 * Produces assets/diagnostics/inspection.json with per-section text, image inventory,
 * broken images, empty sections, duplicate entries, horizontal overflow and link checks.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { SITE, MOBILE_CONTEXT, SECTION_IDS } from './site-config.js';

const OUT = path.resolve('assets/diagnostics');
fs.mkdirSync(OUT, { recursive: true });

const main = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext(MOBILE_CONTEXT);
  const page = await context.newPage();
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('requestfailed', (r) => failedRequests.push(`${r.failure()?.errorText} ${r.url()}`));
  page.on('response', (r) => r.status() >= 400 && failedRequests.push(`HTTP ${r.status()} ${r.url()}`));

  await page.goto(SITE, { waitUntil: 'networkidle', timeout: 90_000 });
  // Trigger lazy loading by scrolling through the whole page.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 0));

  const report = await page.evaluate((ids) => {
    const vw = window.innerWidth;
    const nav = [...document.querySelectorAll('nav a, header a')].map((a) => ({
      text: (a.textContent || '').trim(),
      href: a.getAttribute('href'),
    }));
    const sections = [...document.querySelectorAll('section[id]')].map((s) => {
      const el = s as HTMLElement;
      const r = el.getBoundingClientRect();
      const imgs = [...el.querySelectorAll('img')].map((i) => ({
        src: i.currentSrc || i.src,
        alt: i.alt,
        natural: `${i.naturalWidth}x${i.naturalHeight}`,
        broken: i.complete && i.naturalWidth === 0,
      }));
      const headings = [...el.querySelectorAll('h2,h3,h4')].map((x) => (x.textContent || '').trim().replace(/\s+/g, ' '));
      const dupes = headings.filter((t, i) => t && headings.indexOf(t) !== i);
      const overflow = [...el.querySelectorAll('*')].filter((n) => {
        const b = (n as HTMLElement).getBoundingClientRect();
        return b.width > 0 && (b.right > vw + 2 || b.left < -2) && getComputedStyle(n).position !== 'fixed';
      }).length;
      return {
        id: el.id,
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        textLength: (el.innerText || '').trim().length,
        headings: headings.slice(0, 60),
        duplicateHeadings: [...new Set(dupes)],
        images: imgs,
        brokenImages: imgs.filter((i) => i.broken).map((i) => i.src),
        overflowingElements: overflow,
        excerpt: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 1500),
        wanted: ids.includes(el.id),
      };
    });
    const links = [...document.querySelectorAll('a[href]')].map((a) => (a as HTMLAnchorElement).href).filter((u) => u.startsWith('http'));
    return {
      title: document.title,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      scrollHeight: document.documentElement.scrollHeight,
      docWidth: document.documentElement.scrollWidth,
      nav,
      sections,
      links: [...new Set(links)],
      fixedElements: [...document.querySelectorAll('body *')]
        .filter((n) => ['fixed', 'sticky'].includes(getComputedStyle(n).position))
        .map((n) => `${n.tagName.toLowerCase()}#${n.id}.${(n as HTMLElement).className?.toString().slice(0, 60)}`),
    };
  }, SECTION_IDS as unknown as string[]);

  // Light link check (HEAD, internal + external), capped for politeness.
  const linkResults: { url: string; status: number | string }[] = [];
  for (const url of report.links.slice(0, 120)) {
    try {
      const r = await context.request.fetch(url, { method: 'GET', timeout: 15_000, maxRedirects: 5 });
      linkResults.push({ url, status: r.status() });
    } catch (e) {
      linkResults.push({ url, status: String((e as Error).message).slice(0, 80) });
    }
  }
  const broken = linkResults.filter((l) => typeof l.status !== 'number' || l.status >= 400);

  await page.screenshot({ path: path.join(OUT, 'full-page-mobile.png'), fullPage: true });
  fs.writeFileSync(
    path.join(OUT, 'inspection.json'),
    JSON.stringify({ ...report, consoleErrors, failedRequests: [...new Set(failedRequests)], linkResults, brokenLinks: broken }, null, 2),
  );
  console.log('Sections:', report.sections.map((s) => `${s.id}(${s.textLength}ch,${s.images.length}img,ovf=${s.overflowingElements})`).join(' '));
  console.log('Broken links:', broken.length, 'Failed requests:', failedRequests.length, 'Console errors:', consoleErrors.length);
  await browser.close();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

