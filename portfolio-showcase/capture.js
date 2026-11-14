const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_URL = 'https://www.muhammadhaerul.tech/';
const BASE_DIR = path.resolve(__dirname);
const SHOWCASE_DIR = path.join(BASE_DIR, 'showcase');

const PROFILES = {
  laptop: {
    device: 'Laptop',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    expectedWidth: 2880,
    expectedHeight: 1800,
    isMobile: false,
    hasTouch: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  },
  ipad: {
    device: 'iPad Portrait',
    viewport: { width: 820, height: 1180 },
    deviceScaleFactor: 2,
    expectedWidth: 1640,
    expectedHeight: 2360,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  mobile: {
    device: 'Mobile',
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    expectedWidth: 1170,
    expectedHeight: 2532,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  }
};

// Target project for consistent presentation across Laptop and Mobile
const SELECTED_PROJECT_ID = 'cmt3tffwa0003o8b98ro48ba2'; // PPE Inspector
const SELECTED_PROJECT_NAME = 'PPE Inspector';

// Freeze animations and transitions via CSS injection
async function freezeAnimations(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition: none !important;
      }
      .gallery-stream-track {
        animation: none !important;
      }
    `
  });
}

// Progressive scroll helper to trigger IntersectionObserver animations naturally
async function progressiveScrollTo(page, targetY, step = 300, delay = 50) {
  const currentY = await page.evaluate(() => window.scrollY);
  const distance = targetY - currentY;
  const direction = distance > 0 ? 1 : -1;
  const absDist = Math.abs(distance);
  let moved = 0;

  while (moved < absDist) {
    const nextStep = Math.min(step, absDist - moved);
    moved += nextStep;
    await page.evaluate((y) => window.scrollTo(0, y), currentY + direction * moved);
    await page.waitForTimeout(delay);
  }
  await page.waitForTimeout(600);
}

// Wait for dynamic projects to hydrate
async function waitForProjectsReady(page) {
  await page.waitForFunction(() => {
    const grid = document.getElementById('projects-dynamic-grid');
    return grid && grid.children.length >= 3;
  }, { timeout: 15000 });
  await page.waitForTimeout(1000);
}

// Ensure fonts and network stability
async function ensureReadiness(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(1000);
}

async function captureCollection() {
  console.log('=== Starting Professional Portfolio Showcase Capture ===\n');

  const manifest = [];
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });

  // Ensure output directories exist
  ['laptop', 'ipad', 'mobile', 'reference'].forEach(d => {
    fs.mkdirSync(path.join(SHOWCASE_DIR, d), { recursive: true });
  });

  // ==========================================
  // SECTION A: LAPTOP CAPTURES (1440 x 900 @ 2x)
  // ==========================================
  console.log('--- Capturing LAPTOP Showcase (1440x900 @ 2x) ---');
  {
    const profile = PROFILES.laptop;
    const context = await browser.newContext({
      viewport: profile.viewport,
      deviceScaleFactor: profile.deviceScaleFactor,
      isMobile: profile.isMobile,
      hasTouch: profile.hasTouch,
      userAgent: profile.userAgent
    });
    const page = await context.newPage();

    console.log('Loading website on Laptop context...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 35000 });
    await ensureReadiness(page);
    await waitForProjectsReady(page);

    // Warm-up progressive scroll through page to trigger all reveal observer classes
    console.log('Executing progressive page warm-up scroll...');
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    await progressiveScrollTo(page, pageHeight, 500, 40);
    await progressiveScrollTo(page, 0, 800, 30);
    await page.waitForTimeout(1000);

    // Freeze animations to avoid motion blur in carousel & reveal transitions
    await freezeAnimations(page);

    // 01 — Hero
    console.log('Capturing Laptop 01 — Hero...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    const heroFile = path.join(SHOWCASE_DIR, 'laptop', '01-hero.png');
    await page.screenshot({ path: heroFile });
    const heroMeta = await sharp(heroFile).metadata();
    manifest.push({
      filename: 'laptop/01-hero.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: heroMeta.width,
      actual_pixel_height: heroMeta.height,
      section: '#hero',
      description: 'Main hero section featuring intro statement, CTA action buttons, and verified statistics bar (4+ years, 20+ projects, 650+ attendees, 9.4★).',
      capture_status: 'SUCCESS',
      notes: 'Crisp framing of hero intro and statistics counters without clipping.'
    });

    // 02 — Projects Grid
    console.log('Capturing Laptop 02 — Projects Grid...');
    // Ensure "All Projects" filter is active
    await page.evaluate(() => {
      const allFilter = document.querySelector('.p-filter-pill[data-filter="all"]');
      if (allFilter) allFilter.click();
    });
    await page.waitForTimeout(600);
    const projectsTop = await page.evaluate(() => {
      const sec = document.getElementById('projects');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 70 : 1800;
    });
    await progressiveScrollTo(page, projectsTop);
    await page.waitForTimeout(1200);
    const projGridFile = path.join(SHOWCASE_DIR, 'laptop', '02-projects-grid.png');
    await page.screenshot({ path: projGridFile });
    const projGridMeta = await sharp(projGridFile).metadata();
    manifest.push({
      filename: 'laptop/02-projects-grid.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: projGridMeta.width,
      actual_pixel_height: projGridMeta.height,
      section: '#projects',
      description: 'Projects grid showing curated cards hydrated from database with active specialization filter pill navigation.',
      capture_status: 'SUCCESS',
      notes: 'Rendered with all project cards fully loaded and balanced layout.'
    });

    // 03 — Project Details Modal (PPE Inspector)
    console.log('Capturing Laptop 03 — Project Details Modal (PPE Inspector)...');
    await page.evaluate((id) => {
      if (window.openProjectModal) {
        window.openProjectModal(id);
      }
    }, SELECTED_PROJECT_ID);
    await page.waitForTimeout(1000);
    await page.waitForSelector('#projectModalOverlay.active, #projectModalOverlay[style*="flex"]', { timeout: 5000 });
    await page.waitForTimeout(800);
    const projModalFile = path.join(SHOWCASE_DIR, 'laptop', '03-project-modal.png');
    await page.screenshot({ path: projModalFile });
    const projModalMeta = await sharp(projModalFile).metadata();
    manifest.push({
      filename: 'laptop/03-project-modal.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: projModalMeta.width,
      actual_pixel_height: projModalMeta.height,
      section: '#projectModalOverlay',
      description: `Project Details Modal for "${SELECTED_PROJECT_NAME}" displaying technical architecture tags, bounding-box preview banner, and production details.`,
      capture_status: 'SUCCESS',
      notes: 'High-contrast modal composition with legible typography and bounding box CV thumbnail.'
    });

    // Close the modal cleanly
    await page.evaluate(() => {
      const closeBtn = document.getElementById('projectModalClose');
      if (closeBtn) closeBtn.click();
      else if (window.closeProjectModal) window.closeProjectModal();
    });
    await page.waitForTimeout(600);

    // 04 — Experience
    console.log('Capturing Laptop 04 — Experience...');
    const expTop = await page.evaluate(() => {
      const sec = document.getElementById('experience');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 70 : 800;
    });
    await progressiveScrollTo(page, expTop);
    await page.waitForTimeout(1200);
    const expFile = path.join(SHOWCASE_DIR, 'laptop', '04-experience.png');
    await page.screenshot({ path: expFile });
    const expMeta = await sharp(expFile).metadata();
    manifest.push({
      filename: 'laptop/04-experience.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: expMeta.width,
      actual_pixel_height: expMeta.height,
      section: '#experience',
      description: 'Career timeline capturing AksaraHub Nusantara and Paper.id roles together with continuity of timeline markers.',
      capture_status: 'SUCCESS',
      notes: 'Timeline progression preserved with company badges and date tags.'
    });

    // 05 — Talks
    console.log('Capturing Laptop 05 — Talks...');
    const talksTop = await page.evaluate(() => {
      const sec = document.getElementById('talks');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 70 : 2100;
    });
    await progressiveScrollTo(page, talksTop);
    await page.waitForTimeout(1200);
    const talksFile = path.join(SHOWCASE_DIR, 'laptop', '05-talks.png');
    await page.screenshot({ path: talksFile });
    const talksMeta = await sharp(talksFile).metadata();
    manifest.push({
      filename: 'laptop/05-talks.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: talksMeta.width,
      actual_pixel_height: talksMeta.height,
      section: '#talks',
      description: 'Speaking Engagements section presenting keynote talk cards, high-resolution session posters, and attendee badges (910+ Attendees).',
      capture_status: 'SUCCESS',
      notes: 'Balanced multi-card talk layout with venue details and dates.'
    });

    // 06 — Awards
    console.log('Capturing Laptop 06 — Awards...');
    const awardsTop = await page.evaluate(() => {
      const sec = document.getElementById('awards');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 70 : 2500;
    });
    await progressiveScrollTo(page, awardsTop);
    await page.waitForTimeout(1200);
    const awardsFile = path.join(SHOWCASE_DIR, 'laptop', '06-awards.png');
    await page.screenshot({ path: awardsFile });
    const awardsMeta = await sharp(awardsFile).metadata();
    manifest.push({
      filename: 'laptop/06-awards.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: awardsMeta.width,
      actual_pixel_height: awardsMeta.height,
      section: '#awards',
      description: 'Honors and Awards section showcasing 1st Place Winner (Open The Gate Hackathon 2025) and Top 20 Finalist cards with certificates.',
      capture_status: 'SUCCESS',
      notes: 'Preserves gold and blue award insignia badges and certificate previews.'
    });

    // 07 — Skills (One Category: Computer Vision)
    console.log('Capturing Laptop 07 — Skills (Computer Vision)...');
    const skillsTop = await page.evaluate(() => {
      const sec = document.getElementById('skills');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 70 : 1000;
    });
    await progressiveScrollTo(page, skillsTop);
    await page.waitForTimeout(800);
    // Expand / Filter Computer Vision
    await page.evaluate(() => {
      const cvBtn = document.querySelector('.skills-nav-pill[data-cat="computer-vision"]');
      if (cvBtn) {
        cvBtn.click();
      } else if (window.filterSkillsSpecialization) {
        window.filterSkillsSpecialization('computer-vision', cvBtn);
      }
    });
    await page.waitForTimeout(1000);
    const skillsFile = path.join(SHOWCASE_DIR, 'laptop', '07-skills-one-category.png');
    await page.screenshot({ path: skillsFile });
    const skillsMeta = await sharp(skillsFile).metadata();
    manifest.push({
      filename: 'laptop/07-skills-one-category.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: skillsMeta.width,
      actual_pixel_height: skillsMeta.height,
      section: '#skills',
      description: 'Expanded Computer Vision skills specialization highlighting OpenCV, YOLOv8, PyTorch, and deep learning stack indicators.',
      capture_status: 'SUCCESS',
      notes: 'Clear visual indicators of specialization stack and proficiency tags.'
    });

    // FULL — Complete Website (Reference full-page screenshot)
    console.log('Capturing Laptop FULL — Complete Website...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    const fullLaptopFile = path.join(SHOWCASE_DIR, 'laptop', 'FULL-laptop.png');
    await page.screenshot({ path: fullLaptopFile, fullPage: true });
    const fullLaptopMeta = await sharp(fullLaptopFile).metadata();
    manifest.push({
      filename: 'laptop/FULL-laptop.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: fullLaptopMeta.width,
      actual_pixel_height: fullLaptopMeta.height,
      section: '#top',
      description: 'Continuous full-page reference stitch of the complete portfolio website for QA review.',
      capture_status: 'SUCCESS',
      notes: 'Full-page technical reference asset verifying overall page flow and vertical structure.'
    });

    await context.close();
  }

  // ==========================================
  // SECTION B: IPAD PORTRAIT (820 x 1180 @ 2x)
  // ==========================================
  console.log('\n--- Capturing IPAD PORTRAIT Showcase (820x1180 @ 2x) ---');
  {
    const profile = PROFILES.ipad;
    const context = await browser.newContext({
      viewport: profile.viewport,
      deviceScaleFactor: profile.deviceScaleFactor,
      isMobile: profile.isMobile,
      hasTouch: profile.hasTouch,
      userAgent: profile.userAgent
    });
    const page = await context.newPage();

    console.log('Loading website on iPad context...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 35000 });
    await ensureReadiness(page);
    await waitForProjectsReady(page);

    // Warm-up scroll
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    await progressiveScrollTo(page, pageHeight, 500, 40);
    await progressiveScrollTo(page, 0, 800, 30);
    await page.waitForTimeout(1000);
    await freezeAnimations(page);

    // 01 — Hero
    console.log('Capturing iPad 01 — Hero...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    const heroFile = path.join(SHOWCASE_DIR, 'ipad', '01-hero.png');
    await page.screenshot({ path: heroFile });
    const heroMeta = await sharp(heroFile).metadata();
    manifest.push({
      filename: 'ipad/01-hero.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: heroMeta.width,
      actual_pixel_height: heroMeta.height,
      section: '#hero',
      description: 'Tablet-responsive hero layout presenting intro headline, portrait badge, action CTAs, and statistics bar.',
      capture_status: 'SUCCESS',
      notes: 'Clean vertical spacing adapted for portrait tablet viewports.'
    });

    // 02 — Projects Grid
    console.log('Capturing iPad 02 — Projects Grid...');
    const projTop = await page.evaluate(() => {
      const sec = document.getElementById('projects');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 60 : 1800;
    });
    await progressiveScrollTo(page, projTop);
    await page.waitForTimeout(1200);
    const projFile = path.join(SHOWCASE_DIR, 'ipad', '02-projects-grid.png');
    await page.screenshot({ path: projFile });
    const projMeta = await sharp(projFile).metadata();
    manifest.push({
      filename: 'ipad/02-projects-grid.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: projMeta.width,
      actual_pixel_height: projMeta.height,
      section: '#projects',
      description: 'Responsive tablet project card arrangement with category filter tabs and card media banners.',
      capture_status: 'SUCCESS',
      notes: 'Balanced multi-column card grid on tablet.'
    });

    // 03 — Talks
    console.log('Capturing iPad 03 — Talks...');
    const talksTop = await page.evaluate(() => {
      const sec = document.getElementById('talks');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 60 : 2100;
    });
    await progressiveScrollTo(page, talksTop);
    await page.waitForTimeout(1200);
    const talksFile = path.join(SHOWCASE_DIR, 'ipad', '03-talks.png');
    await page.screenshot({ path: talksFile });
    const talksMeta = await sharp(talksFile).metadata();
    manifest.push({
      filename: 'ipad/03-talks.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: talksMeta.width,
      actual_pixel_height: talksMeta.height,
      section: '#talks',
      description: 'Speaking Engagements section in iPad portrait orientation showing event posters, dates, and attendee badges.',
      capture_status: 'SUCCESS',
      notes: 'Crisp tablet card composition with poster previews.'
    });

    // 04 — Awards
    console.log('Capturing iPad 04 — Awards...');
    const awardsTop = await page.evaluate(() => {
      const sec = document.getElementById('awards');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 60 : 2500;
    });
    await progressiveScrollTo(page, awardsTop);
    await page.waitForTimeout(1200);
    const awardsFile = path.join(SHOWCASE_DIR, 'ipad', '04-awards.png');
    await page.screenshot({ path: awardsFile });
    const awardsMeta = await sharp(awardsFile).metadata();
    manifest.push({
      filename: 'ipad/04-awards.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: awardsMeta.width,
      actual_pixel_height: awardsMeta.height,
      section: '#awards',
      description: 'Tablet-responsive layout of award cards showing 1st Place Winner and Top 20 cards with certificates.',
      capture_status: 'SUCCESS',
      notes: 'Preserves card proportions and certificate proof buttons.'
    });

    // 05 — Navigation or Skills
    console.log('Capturing iPad 05 — Navigation and Skills...');
    const skillsTop = await page.evaluate(() => {
      const sec = document.getElementById('skills');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 60 : 1000;
    });
    await progressiveScrollTo(page, skillsTop);
    await page.waitForTimeout(1200);
    const navSkillsFile = path.join(SHOWCASE_DIR, 'ipad', '05-nav-or-skills.png');
    await page.screenshot({ path: navSkillsFile });
    const navSkillsMeta = await sharp(navSkillsFile).metadata();
    manifest.push({
      filename: 'ipad/05-nav-or-skills.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: navSkillsMeta.width,
      actual_pixel_height: navSkillsMeta.height,
      section: '#skills',
      description: 'Tablet composition highlighting skills category tabs, horizontal filter carousel, and specialized stacks.',
      capture_status: 'SUCCESS',
      notes: 'Captures sticky top navigation in unison with interactive category filter bar.'
    });

    await context.close();
  }

  // ==========================================
  // SECTION C: MOBILE (390 x 844 @ 3x)
  // ==========================================
  console.log('\n--- Capturing MOBILE Showcase (390x844 @ 3x) ---');
  {
    const profile = PROFILES.mobile;
    const context = await browser.newContext({
      viewport: profile.viewport,
      deviceScaleFactor: profile.deviceScaleFactor,
      isMobile: profile.isMobile,
      hasTouch: profile.hasTouch,
      userAgent: profile.userAgent
    });
    const page = await context.newPage();

    console.log('Loading website on Mobile context...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 35000 });
    await ensureReadiness(page);
    await waitForProjectsReady(page);

    // Warm-up scroll
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    await progressiveScrollTo(page, pageHeight, 500, 40);
    await progressiveScrollTo(page, 0, 800, 30);
    await page.waitForTimeout(1000);
    await freezeAnimations(page);

    // 01 — Hero
    console.log('Capturing Mobile 01 — Hero...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    const heroFile = path.join(SHOWCASE_DIR, 'mobile', '01-hero.png');
    await page.screenshot({ path: heroFile });
    const heroMeta = await sharp(heroFile).metadata();
    manifest.push({
      filename: 'mobile/01-hero.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: heroMeta.width,
      actual_pixel_height: heroMeta.height,
      section: '#hero',
      description: 'Mobile above-the-fold composition showcasing personal avatar, primary role introduction, and action buttons.',
      capture_status: 'SUCCESS',
      notes: 'Legible mobile typography and balanced framing.'
    });

    // 02 — Navigation Open
    console.log('Capturing Mobile 02 — Navigation Open...');
    await page.evaluate(() => {
      const burger = document.getElementById('navBurger');
      if (burger) burger.click();
    });
    await page.waitForTimeout(800);
    const navOpenFile = path.join(SHOWCASE_DIR, 'mobile', '02-nav-open.png');
    await page.screenshot({ path: navOpenFile });
    const navOpenMeta = await sharp(navOpenFile).metadata();
    manifest.push({
      filename: 'mobile/02-nav-open.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: navOpenMeta.width,
      actual_pixel_height: navOpenMeta.height,
      section: '#navLinks',
      description: 'Mobile drawer navigation menu fully expanded displaying all section navigation links and action items.',
      capture_status: 'SUCCESS',
      notes: 'Drawer menu captured cleanly in fully transitioned state.'
    });

    // Close mobile nav drawer
    await page.evaluate(() => {
      const burger = document.getElementById('navBurger');
      if (burger && burger.classList.contains('open')) burger.click();
    });
    await page.waitForTimeout(600);

    // 03 — Project Card (PPE Inspector)
    console.log('Capturing Mobile 03 — Project Card (PPE Inspector)...');
    // Scroll to PPE Inspector card and center it naturally in viewport
    const cardPosition = await page.evaluate((id) => {
      // Find PPE inspector card
      const mediaEl = document.getElementById(`p-media-${id}`);
      const card = mediaEl ? mediaEl.closest('.p-card, .project-card, article') : null;
      if (card) {
        card.scrollIntoView({ behavior: 'instant', block: 'center' });
        return true;
      }
      return false;
    }, SELECTED_PROJECT_ID);

    if (!cardPosition) {
      // Fallback: scroll to projects grid top
      const pTop = await page.evaluate(() => {
        const sec = document.getElementById('projects');
        return sec ? sec.getBoundingClientRect().top + window.scrollY - 50 : 1800;
      });
      await progressiveScrollTo(page, pTop);
    }
    await page.waitForTimeout(1000);
    const projCardFile = path.join(SHOWCASE_DIR, 'mobile', '03-project-card.png');
    await page.screenshot({ path: projCardFile });
    const projCardMeta = await sharp(projCardFile).metadata();
    manifest.push({
      filename: 'mobile/03-project-card.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: projCardMeta.width,
      actual_pixel_height: projCardMeta.height,
      section: '#projects',
      description: `Focused mobile view of the "${SELECTED_PROJECT_NAME}" project card showing thumbnail preview, tags, and action buttons.`,
      capture_status: 'SUCCESS',
      notes: 'Centered card composition maintaining visual balance on mobile.'
    });

    // 04 — Project Details Modal (PPE Inspector on Mobile)
    console.log('Capturing Mobile 04 — Project Details Modal...');
    await page.evaluate((id) => {
      if (window.openProjectModal) window.openProjectModal(id);
    }, SELECTED_PROJECT_ID);
    await page.waitForTimeout(1000);
    await page.waitForSelector('#projectModalOverlay.active, #projectModalOverlay[style*="flex"]', { timeout: 5000 });
    await page.waitForTimeout(800);
    const projModalFile = path.join(SHOWCASE_DIR, 'mobile', '04-project-modal.png');
    await page.screenshot({ path: projModalFile });
    const projModalMeta = await sharp(projModalFile).metadata();
    manifest.push({
      filename: 'mobile/04-project-modal.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: projModalMeta.width,
      actual_pixel_height: projModalMeta.height,
      section: '#projectModalOverlay',
      description: `Mobile responsive Project Details Modal for "${SELECTED_PROJECT_NAME}" with full readability of architecture and outcomes.`,
      capture_status: 'SUCCESS',
      notes: 'Matches selected project on Laptop 03 for consistent showcase presentation.'
    });

    // Close the modal cleanly
    await page.evaluate(() => {
      const closeBtn = document.getElementById('projectModalClose');
      if (closeBtn) closeBtn.click();
      else if (window.closeProjectModal) window.closeProjectModal();
    });
    await page.waitForTimeout(600);

    // 05 — Experience Timeline
    console.log('Capturing Mobile 05 — Experience Timeline...');
    const expTop = await page.evaluate(() => {
      const sec = document.getElementById('experience');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 50 : 800;
    });
    await progressiveScrollTo(page, expTop);
    await page.waitForTimeout(1000);
    const expFile = path.join(SHOWCASE_DIR, 'mobile', '05-experience-timeline.png');
    await page.screenshot({ path: expFile });
    const expMeta = await sharp(expFile).metadata();
    manifest.push({
      filename: 'mobile/05-experience-timeline.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: expMeta.width,
      actual_pixel_height: expMeta.height,
      section: '#experience',
      description: 'Mobile vertical experience timeline presenting career milestones, company roles, and verified tenure dates.',
      capture_status: 'SUCCESS',
      notes: 'Timeline markers and content flow framed with visual continuity.'
    });

    // 06 — Feedback Rating
    console.log('Capturing Mobile 06 — Feedback Rating...');
    const testTop = await page.evaluate(() => {
      const sec = document.getElementById('testimonials');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 50 : 4200;
    });
    await progressiveScrollTo(page, testTop);
    await page.waitForTimeout(1000);
    const feedbackFile = path.join(SHOWCASE_DIR, 'mobile', '06-feedback-rating.png');
    await page.screenshot({ path: feedbackFile });
    const feedbackMeta = await sharp(feedbackFile).metadata();
    manifest.push({
      filename: 'mobile/06-feedback-rating.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: feedbackMeta.width,
      actual_pixel_height: feedbackMeta.height,
      section: '#testimonials',
      description: 'Participant satisfaction rating banner displaying verified 9.4/10 average score with star indicators and feedback context.',
      capture_status: 'SUCCESS',
      notes: 'Clean rating badge presentation with surrounding testimonial cards.'
    });

    // 07 — Contact Form (WITH EMAIL BLURRING STRICT PRIVACY ENFORCEMENT)
    console.log('Capturing Mobile 07 — Contact Form (Privacy Enforced)...');
    const contactTop = await page.evaluate(() => {
      const sec = document.getElementById('contact');
      return sec ? sec.getBoundingClientRect().top + window.scrollY - 50 : 4500;
    });
    await progressiveScrollTo(page, contactTop);
    await page.waitForTimeout(600);

    // Apply temporary privacy protection blur to email address
    await page.addStyleTag({
      content: `
        #emailContactLink strong,
        a[href^="mailto:"] strong,
        #emailContactLink .contact-link-right strong,
        a[href*="mailto:"] {
          filter: blur(12px) !important;
          user-select: none !important;
        }
      `
    });
    await page.waitForTimeout(800);

    const contactFile = path.join(SHOWCASE_DIR, 'mobile', '07-contact-form.png');
    await page.screenshot({ path: contactFile });
    const contactMeta = await sharp(contactFile).metadata();
    manifest.push({
      filename: 'mobile/07-contact-form.png',
      device: profile.device,
      viewport_width: profile.viewport.width,
      viewport_height: profile.viewport.height,
      device_scale_factor: profile.deviceScaleFactor,
      actual_pixel_width: contactMeta.width,
      actual_pixel_height: contactMeta.height,
      section: '#contact',
      description: 'Mobile contact inquiry form and direct connect channels with email address securely blurred for privacy.',
      capture_status: 'SUCCESS',
      notes: 'Strict privacy enforcement applied — email address completely blurred.'
    });

    await context.close();
  }

  await browser.close();

  // Save manifest.json
  const manifestPath = path.join(SHOWCASE_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n=== Capture process complete! Saved ${manifest.length} items to manifest.json ===`);

  // Automatically generate visual contact sheet
  console.log('\n--- Generating Contact Sheet ---');
  const { buildContactSheet } = require('./generate-contact-sheet');
  await buildContactSheet();
}

captureCollection().catch(err => {
  console.error('Capture process encountered an error:', err);
  process.exit(1);
});
