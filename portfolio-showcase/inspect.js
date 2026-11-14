const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://www.muhammadhaerul.tech/';

const PROFILES = [
  {
    name: 'laptop',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  },
  {
    name: 'ipad',
    viewport: { width: 820, height: 1180 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'mobile',
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  }
];

async function inspectWebsite() {
  console.log('=== Starting Website QA & Technical Inspection ===');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });

  const auditReport = {
    url: TARGET_URL,
    timestamp: new Date().toISOString(),
    profiles: {},
    issuesAE: {},
    networkFailures: [],
    consoleErrors: [],
    touchTargetViolations: {},
    brokenImages: [],
    layoutIssues: {},
    sectionStatus: {}
  };

  for (const profile of PROFILES) {
    console.log(`\n--- Inspecting profile: ${profile.name} (${profile.viewport.width}x${profile.viewport.height}) ---`);
    const context = await browser.newContext({
      viewport: profile.viewport,
      deviceScaleFactor: profile.deviceScaleFactor,
      isMobile: profile.isMobile,
      hasTouch: profile.hasTouch,
      userAgent: profile.userAgent
    });

    const page = await context.newPage();

    // Listen to network failures and console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        auditReport.consoleErrors.push({ device: profile.name, text });
        console.warn(`[Console Error - ${profile.name}]`, text);
      }
    });

    page.on('requestfailed', req => {
      const failure = req.failure();
      auditReport.networkFailures.push({
        device: profile.name,
        url: req.url(),
        errorText: failure ? failure.errorText : 'unknown'
      });
      console.warn(`[Request Failed - ${profile.name}]`, req.url(), failure ? failure.errorText : '');
    });

    page.on('response', resp => {
      if (resp.status() >= 400) {
        auditReport.networkFailures.push({
          device: profile.name,
          url: resp.url(),
          status: resp.status()
        });
        console.warn(`[HTTP ${resp.status()} - ${profile.name}]`, resp.url());
      }
    });

    // Navigate to target
    console.log(`Navigating to ${TARGET_URL}...`);
    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      console.log('Networkidle timeout or fallback to domcontentloaded, continuing...');
    }

    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => document.fonts.ready);

    // Scroll progressively through page to trigger lazy loading & IntersectionObservers
    console.log('Progressive scrolling to hydrate all sections...');
    await page.evaluate(async () => {
      const scrollStep = 400;
      const totalHeight = document.body.scrollHeight;
      for (let y = 0; y < totalHeight; y += scrollStep) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
    });

    // Poll for dynamic projects (at least 3 cards, 15s timeout)
    console.log('Checking #projects hydration...');
    try {
      await page.waitForFunction(() => {
        const grid = document.getElementById('projects-dynamic-grid');
        return grid && grid.children.length >= 3;
      }, { timeout: 15000 });
      console.log('Dynamic projects successfully hydrated!');
    } catch (e) {
      console.error('Projects hydration timed out or failed:', e.message);
    }

    // Inspect section presence and bounding rects
    const sections = [
      '#hero', '#about', '#education', '#experience', '#skills',
      '#projects', '#publications', '#talks', '#awards',
      '#certifications', '#blog', '#gallery', '#testimonials', '#contact'
    ];

    const sectionResults = await page.evaluate((secList) => {
      const res = {};
      for (const s of secList) {
        const el = document.querySelector(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          res[s] = {
            found: true,
            visible: rect.height > 0 && rect.width > 0,
            rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
          };
        } else {
          res[s] = { found: false };
        }
      }
      return res;
    }, sections);

    auditReport.sectionStatus[profile.name] = sectionResults;

    // Check horizontal overflow
    const overflowCheck = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const elementsWithOverflow = [];
      const allEls = document.querySelectorAll('*');
      for (const el of allEls) {
        const r = el.getBoundingClientRect();
        if (r.right > docWidth + 2) {
          elementsWithOverflow.push({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            right: r.right,
            docWidth
          });
          if (elementsWithOverflow.length >= 10) break;
        }
      }
      return {
        hasHorizontalScroll: scrollWidth > docWidth + 2,
        docWidth,
        scrollWidth,
        elementsWithOverflow
      };
    });
    auditReport.layoutIssues[profile.name] = overflowCheck;

    // Check touch targets smaller than 44x44px for iPad and Mobile
    if (profile.isMobile) {
      const touchAudit = await page.evaluate(() => {
        const targets = document.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="tab"]');
        const violations = [];
        for (const t of targets) {
          // Ignore hidden or zero size elements
          const r = t.getBoundingClientRect();
          if (r.width === 0 || r.height === 0 || window.getComputedStyle(t).display === 'none') continue;
          if (r.width < 44 || r.height < 44) {
            // Filter out inline text links inside paragraphs if natural
            const isInline = window.getComputedStyle(t).display.includes('inline') && t.tagName === 'A' && t.closest('p');
            violations.push({
              tag: t.tagName,
              id: t.id || null,
              className: (typeof t.className === 'string' ? t.className : ''),
              text: (t.textContent || '').trim().substring(0, 30),
              width: Math.round(r.width * 10) / 10,
              height: Math.round(r.height * 10) / 10,
              isInlineParagraphLink: !!isInline
            });
          }
        }
        return violations;
      });
      auditReport.touchTargetViolations[profile.name] = touchAudit;
      console.log(`Touch targets < 44x44 on ${profile.name}: ${touchAudit.length} found`);
    }

    // Check images in DOM for broken images (naturalWidth === 0)
    const imgAudit = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayedWidth: img.width,
        displayedHeight: img.height
      })).filter(i => i.complete && i.naturalWidth === 0);
    });
    if (imgAudit.length > 0) {
      auditReport.brokenImages.push({ device: profile.name, broken: imgAudit });
      console.warn(`Broken images on ${profile.name}:`, imgAudit);
    }

    // Specific Issues Investigation on Laptop profile (to avoid duplicate queries)
    if (profile.name === 'laptop') {
      const specificCheck = await page.evaluate(() => {
        // A. Gallery duplication
        const track0 = document.getElementById('galleryTrack0');
        const track0Cards = track0 ? Array.from(track0.querySelectorAll('.gallery-card')) : [];
        const track0Thumbs = track0Cards.map(c => {
          const img = c.querySelector('img');
          return img ? img.getAttribute('src') : null;
        });

        // B. Certificate duplication
        const pubSection = document.getElementById('publications');
        const kemenpanInPub = pubSection ? Array.from(pubSection.querySelectorAll('[src*="kemenpan"], [onclick*="kemenpan"]')).length : 0;
        const awardSection = document.getElementById('awards');
        const kemenpanInAwards = awardSection ? Array.from(awardSection.querySelectorAll('[src*="kemenpan"], [onclick*="kemenpan"]')).length : 0;

        // C. Medium publication title
        const pubTitles = pubSection ? Array.from(pubSection.querySelectorAll('.pub-title')).map(el => el.textContent.trim()) : [];
        const mediumTitle = pubTitles.find(t => t.toLowerCase().includes('medium'));

        // D. Awards counter vs actual listed unique awards
        const awardCounterEl = document.querySelector('.award-metric-count, .section-awards .counter, #awards .award-counter, .section-eyebrow, #awards');
        const awardCards = awardSection ? Array.from(awardSection.querySelectorAll('.award-card')) : [];
        const awardCardTitles = awardCards.map(c => {
          const h = c.querySelector('.award-title');
          return h ? h.textContent.trim().replace(/\s+/g, ' ') : '';
        }).filter(Boolean);
        const uniqueAwardTitles = Array.from(new Set(awardCardTitles));

        // E. Open Graph image metadata tags
        const ogImages = Array.from(document.querySelectorAll('meta[property="og:image"]')).map(el => el.getAttribute('content'));

        return {
          gallery: {
            totalTrack0Cards: track0Cards.length,
            uniqueTrack0Thumbs: Array.from(new Set(track0Thumbs)),
            allTrack0Thumbs: track0Thumbs
          },
          certificates: {
            kemenpanInPub,
            kemenpanInAwards
          },
          mediumPublication: {
            mediumTitle,
            allPubTitles: pubTitles
          },
          awards: {
            totalCards: awardCards.length,
            uniqueCount: uniqueAwardTitles.length,
            uniqueTitles: uniqueAwardTitles
          },
          ogImages
        };
      });
      auditReport.issuesAE = specificCheck;
    }

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, 'audit-results.json'),
    JSON.stringify(auditReport, null, 2),
    'utf8'
  );
  console.log('\n=== Inspection complete! Saved results to portfolio-showcase/audit-results.json ===');
}

inspectWebsite().catch(err => {
  console.error('Inspection failed:', err);
  process.exit(1);
});

