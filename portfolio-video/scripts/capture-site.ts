/**
 * scripts/capture-site.ts
 *
 * Full production website capture pipeline:
 * 1. Prepares assets directories (clips, stills, diagnostics, audio).
 * 2. Extracts original high-resolution stills using Sharp.
 * 3. Launches mobile Playwright browser (Chromium) at 430x932 @ 2.5x scale.
 * 4. Records scripted, smooth-scrolled 60fps footage for each section.
 * 5. Transcodes raw footage to pristine H.264 High 60fps MP4 clips using FFmpeg.
 * 6. Captures diagnostic screenshots for verification.
 */

import { chromium, type BrowserContext } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const SITE_URL = 'https://www.muhammadhaerul.tech/';

const DIRS = {
  assets: path.resolve('assets'),
  clips: path.resolve('assets/clips'),
  rawClips: path.resolve('assets/clips/raw'),
  stills: path.resolve('assets/stills'),
  diagnostics: path.resolve('assets/diagnostics'),
  audio: path.resolve('assets/audio'),
  out: path.resolve('out'),
};

for (const d of Object.values(DIRS)) {
  fs.mkdirSync(d, { recursive: true });
}

// 1. Extract Stills from verified original assets
async function extractStills() {
  console.log('\n--- [1/3] Extracting Original High-Res Stills ---');

  // Candidate local paths in ../public
  const stillMappings = [
    {
      out: path.join(DIRS.stills, 'hero-portrait.png'),
      source: path.resolve('../public/profile.webp'),
      fallback: path.resolve('../public/profile.png'),
      name: 'Hero Portrait',
    },
    {
      out: path.join(DIRS.stills, 'top-20-ai-talent-hub.png'),
      source: path.resolve('../public/assets/images/awards/award_img_4.jpg'),
      name: 'Top 20 AI Talent Hub Award',
    },
    {
      out: path.join(DIRS.stills, 'talk-01.png'),
      source: path.resolve('../public/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp'),
      fallback: path.resolve('../public/assets/images/gsa-ai-forge-doc-3.jpg'),
      name: 'Talk 01 (GSA AI Forge Speaker)',
    },
    {
      out: path.join(DIRS.stills, 'talk-02.png'),
      source: path.resolve('../public/assets/images/muhammad-haerul-speaker-mindful-ai-hd.jpg'),
      fallback: path.resolve('../public/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp'),
      name: 'Talk 02 (Mindful AI Keynote)',
    },
    {
      out: path.join(DIRS.stills, 'talk-03.png'),
      source: path.resolve('../public/assets/images/muhammad-haerul-speaker-build-with-ai.webp'),
      fallback: path.resolve('../public/assets/images/gsa-ai-forge-doc-2.jpg'),
      name: 'Talk 03 (Build with AI Speaker)',
    },
  ];

  for (const item of stillMappings) {
    let srcPath = item.source;
    if (!fs.existsSync(srcPath) && item.fallback && fs.existsSync(item.fallback)) {
      srcPath = item.fallback;
    }

    if (fs.existsSync(srcPath)) {
      await sharp(srcPath).png({ quality: 100, compressionLevel: 6 }).toFile(item.out);
      const meta = await sharp(item.out).metadata();
      console.log(`✓ Saved ${item.name} -> ${path.basename(item.out)} (${meta.width}x${meta.height})`);
    } else {
      console.warn(`⚠ Could not locate source for ${item.name} at ${srcPath}`);
    }
  }
}

// 2. Browser helper to execute smooth cubic-eased scroll
const EASE_SCROLL_SCRIPT = `
(function() {
  window.__smoothScrollTo = function(targetY, durationMs) {
    return new Promise(function(resolve) {
      var startY = window.scrollY;
      var diff = targetY - startY;
      var startTime = performance.now();
      function tick(now) {
        var elapsed = now - startTime;
        var t = Math.min(elapsed / durationMs, 1);
        // easeInOutCubic
        var ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startY + diff * ease);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, targetY);
          resolve(true);
        }
      }
      requestAnimationFrame(tick);
    });
  };
})();
`;

// Helper for CSS cleanup: remove cookie banners, chat widgets, sticky overlays that clutter screen
const CLEANUP_CSS = `
  /* Hide any potential consent banners or fixed overlays that block view */
  #cookieConsent, .cookie-banner, .chat-widget, #drift-widget, .intercom-lightweight-app {
    display: none !important;
  }
  /* Keep smooth scrolling and hide scrollbars for cinematic recording */
  html, body {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  ::-webkit-scrollbar {
    display: none !important;
  }
`;

interface ClipDefinition {
  name: string;
  sectionId: string;
  startOffset: number; // Y offset relative to section top
  scrollPlan: Array<{
    targetOffset: number; // Y offset relative to section top
    durationMs: number;
    pauseAfterMs: number;
  }>;
  totalDurationMs: number;
}

const SECTION_CLIPS: ClipDefinition[] = [
  {
    name: 'hero',
    sectionId: 'hero',
    startOffset: 0,
    scrollPlan: [
      { targetOffset: 340, durationMs: 2500, pauseAfterMs: 1500 }, // Scroll down to stats
      { targetOffset: 920, durationMs: 2500, pauseAfterMs: 1500 }, // Scroll down to profile card
    ],
    totalDurationMs: 8500,
  },
  {
    name: 'experiences',
    sectionId: 'experience',
    startOffset: 0,
    scrollPlan: [
      { targetOffset: 450, durationMs: 2200, pauseAfterMs: 1400 }, // AksaraHub Co-Founder
      { targetOffset: 1200, durationMs: 2500, pauseAfterMs: 1600 }, // Paper.id AI Engineer
      { targetOffset: 1950, durationMs: 2500, pauseAfterMs: 1600 }, // XL Axiata AIoT Engineer
    ],
    totalDurationMs: 11000,
  },
  {
    name: 'projects',
    sectionId: 'projects',
    startOffset: 0,
    scrollPlan: [
      { targetOffset: 460, durationMs: 2200, pauseAfterMs: 1500 }, // Aksara Lontara Recognition
      { targetOffset: 1520, durationMs: 2500, pauseAfterMs: 1500 }, // AI Split Bills
      { targetOffset: 2580, durationMs: 2500, pauseAfterMs: 1500 }, // Galaxy ALPR
    ],
    totalDurationMs: 11000,
  },
  {
    name: 'publications',
    sectionId: 'publications',
    startOffset: 0,
    scrollPlan: [
      { targetOffset: 280, durationMs: 2000, pauseAfterMs: 1500 }, // Medium Publication
      { targetOffset: 580, durationMs: 2000, pauseAfterMs: 1500 }, // PyPI Package
      { targetOffset: 850, durationMs: 2000, pauseAfterMs: 1500 }, // PPE Detection Thesis
    ],
    totalDurationMs: 9500,
  },
  {
    name: 'talks',
    sectionId: 'talks',
    startOffset: 0,
    scrollPlan: [
      { targetOffset: 350, durationMs: 2200, pauseAfterMs: 1500 }, // RRI Mamuju & Mindful AI
      { targetOffset: 900, durationMs: 2500, pauseAfterMs: 1500 }, // GSA AI Forge
      { targetOffset: 1450, durationMs: 2500, pauseAfterMs: 1500 }, // Build with AI & Unsulbar
    ],
    totalDurationMs: 10500,
  },
  {
    name: 'awards',
    sectionId: 'awards',
    startOffset: 0,
    scrollPlan: [
      { targetOffset: 350, durationMs: 2000, pauseAfterMs: 1800 }, // Top 20 AI Talent Hub
      { targetOffset: 850, durationMs: 2200, pauseAfterMs: 1800 }, // Hackathon awards
    ],
    totalDurationMs: 8000,
  },
  {
    name: 'certifications',
    sectionId: 'certifications',
    startOffset: 0,
    scrollPlan: [
      { targetOffset: 300, durationMs: 2000, pauseAfterMs: 1600 }, // EnglishScore & Hackathons
      { targetOffset: 700, durationMs: 2200, pauseAfterMs: 1600 }, // Prompt Engineering & Deep Learning
    ],
    totalDurationMs: 8000,
  },
];

async function captureWebsiteClips() {
  console.log('\n--- [2/3] Capturing Website Section Recordings ---');

  const browser = await chromium.launch();

  for (const clip of SECTION_CLIPS) {
    console.log(`\nRecording clip: ${clip.name} (Section #${clip.sectionId})...`);

    const clipVideoDir = path.join(DIRS.rawClips, clip.name);
    fs.mkdirSync(clipVideoDir, { recursive: true });

    // Clean existing webm in raw dir
    for (const f of fs.readdirSync(clipVideoDir)) {
      if (f.endsWith('.webm')) fs.unlinkSync(path.join(clipVideoDir, f));
    }

    const context: BrowserContext = await browser.newContext({
      viewport: { width: 430, height: 932 },
      deviceScaleFactor: 2.5,
      isMobile: true,
      hasTouch: true,
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
      recordVideo: {
        dir: clipVideoDir,
        size: { width: 1075, height: 2330 },
      },
    });

    await context.addInitScript(() => {
      (globalThis as any).__name = (f: any) => f;
    });

    const page = await context.newPage();

    try {
      await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 60000 });
      await page.addStyleTag({ content: CLEANUP_CSS });
      await page.evaluate(EASE_SCROLL_SCRIPT);

      // Pre-scroll the entire page to trigger lazy loaded images and animations
      await page.evaluate(async () => {
        const total = document.documentElement.scrollHeight;
        for (let y = 0; y < total; y += 800) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1000);

      // Locate target section top coordinate
      const sectionTop = await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return Math.round(rect.top + window.scrollY);
      }, clip.sectionId);

      const initialY = Math.max(0, sectionTop + clip.startOffset);
      await page.evaluate((y) => window.scrollTo(0, y), initialY);
      await page.waitForTimeout(1000); // Settle

      // Save diagnostic screenshot of initial frame
      const diagPath = path.join(DIRS.diagnostics, `${clip.name}.png`);
      await page.screenshot({ path: diagPath });
      console.log(`  Saved diagnostic screenshot: ${path.basename(diagPath)}`);

      // Execute smooth scrolling steps
      for (const step of clip.scrollPlan) {
        const targetY = sectionTop + step.targetOffset;
        await page.evaluate(
          ({ y, dur }) => {
            return (window as any).__smoothScrollTo(y, dur);
          },
          { y: targetY, dur: step.durationMs },
        );
        await page.waitForTimeout(step.pauseAfterMs);
      }

      // Close page to flush video recording
      const video = page.video();
      const rawWebmPath = await video?.path();
      await page.close();
      await context.close();

      if (rawWebmPath && fs.existsSync(rawWebmPath)) {
        const outMp4 = path.join(DIRS.clips, `${clip.name}.mp4`);
        console.log(`  Transcoding ${path.basename(rawWebmPath)} -> ${path.basename(outMp4)} (60fps, H.264 High)...`);

        // FFmpeg command to produce crystal-clear H.264 High profile 60fps yuv420p video
        execSync(
          `ffmpeg -y -i "${rawWebmPath}" -vf "crop=430:932:0:0,scale=1076:2330:flags=lanczos,format=yuv420p" -c:v libx264 -profile:v high -pix_fmt yuv420p -r 60 -crf 16 -preset slow -movflags +faststart "${outMp4}"`,
          { stdio: 'pipe' },
        );

        console.log(`  ✓ Successfully generated ${path.basename(outMp4)}`);
      } else {
        console.error(`  ✗ Video recording path missing for ${clip.name}`);
      }
    } catch (err: any) {
      console.error(`  ✗ Error recording clip ${clip.name}:`, err.message);
      await page.close();
      await context.close();
    }
  }

  await browser.close();
}

async function verifyAssets() {
  console.log('\n--- [3/3] Verifying Captured Assets ---');
  const expectedClips = ['hero.mp4', 'experiences.mp4', 'projects.mp4', 'publications.mp4', 'talks.mp4', 'awards.mp4', 'certifications.mp4'];
  const expectedStills = ['hero-portrait.png', 'top-20-ai-talent-hub.png', 'talk-01.png', 'talk-02.png', 'talk-03.png'];

  let allOk = true;

  for (const c of expectedClips) {
    const p = path.join(DIRS.clips, c);
    if (fs.existsSync(p)) {
      const stats = fs.statSync(p);
      console.log(`✓ Clip: ${c} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    } else {
      console.error(`✗ Missing clip: ${c}`);
      allOk = false;
    }
  }

  for (const s of expectedStills) {
    const p = path.join(DIRS.stills, s);
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      console.log(`✓ Still: ${s} (${meta.width}x${meta.height})`);
    } else {
      console.error(`✗ Missing still: ${s}`);
      allOk = false;
    }
  }

  if (allOk) {
    console.log('\n✨ ALL WEBSITE ASSETS CAPTURED AND VERIFIED SUCCESSFULLY!');
  } else {
    console.warn('\n⚠ Some assets are missing.');
  }
}

async function main() {
  console.log('=== STARTING WEBSITE ASSET CAPTURE PIPELINE ===');
  await extractStills();
  await captureWebsiteClips();
  await verifyAssets();
  console.log('=== ASSET CAPTURE PIPELINE FINISHED ===\n');
}

main().catch((err) => {
  console.error('Fatal error in capture-site:', err);
  process.exit(1);
});

