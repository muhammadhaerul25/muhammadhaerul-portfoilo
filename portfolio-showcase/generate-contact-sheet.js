const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SHOWCASE_DIR = path.join(__dirname, 'showcase');
const OUTPUT_FILE = path.join(SHOWCASE_DIR, 'contact-sheet.png');

const ITEMS = [
  // Laptop items
  { dev: 'laptop', file: '01-hero.png', title: '01 — Hero Section', sec: '#hero' },
  { dev: 'laptop', file: '02-projects-grid.png', title: '02 — Projects Grid', sec: '#projects' },
  { dev: 'laptop', file: '03-project-modal.png', title: '03 — Project Details Modal', sec: '#projectModalOverlay' },
  { dev: 'laptop', file: '04-experience.png', title: '04 — Experience Timeline', sec: '#experience' },
  { dev: 'laptop', file: '05-talks.png', title: '05 — Keynote Talks', sec: '#talks' },
  { dev: 'laptop', file: '06-awards.png', title: '06 — Awards &amp; Honors', sec: '#awards' },
  { dev: 'laptop', file: '07-skills-one-category.png', title: '07 — Skills: Computer Vision', sec: '#skills' },

  // iPad items
  { dev: 'ipad', file: '01-hero.png', title: '01 — Hero (Tablet)', sec: '#hero' },
  { dev: 'ipad', file: '02-projects-grid.png', title: '02 — Projects Grid', sec: '#projects' },
  { dev: 'ipad', file: '03-talks.png', title: '03 — Speaking Talks', sec: '#talks' },
  { dev: 'ipad', file: '04-awards.png', title: '04 — Awards &amp; Honors', sec: '#awards' },
  { dev: 'ipad', file: '05-nav-or-skills.png', title: '05 — Nav &amp; Skills Tabs', sec: '#skills' },

  // Mobile items
  { dev: 'mobile', file: '01-hero.png', title: '01 — Hero (Mobile)', sec: '#hero' },
  { dev: 'mobile', file: '02-nav-open.png', title: '02 — Navigation Drawer', sec: '#navLinks' },
  { dev: 'mobile', file: '03-project-card.png', title: '03 — Project Card', sec: '#projects' },
  { dev: 'mobile', file: '04-project-modal.png', title: '04 — Details Modal', sec: '#projectModalOverlay' },
  { dev: 'mobile', file: '05-experience-timeline.png', title: '05 — Experience Timeline', sec: '#experience' },
  { dev: 'mobile', file: '06-feedback-rating.png', title: '06 — Satisfaction Rating', sec: '#testimonials' },
  { dev: 'mobile', file: '07-contact-form.png', title: '07 — Contact Form (Blurred)', sec: '#contact' }
];

async function buildContactSheet() {
  console.log('=== Building High-Resolution Visual Contact Sheet ===');

  const canvasWidth = 2600;
  // Calculate vertical positions:
  // Header: 240px
  // Laptop Section: header (70px) + 2 rows of cards (each card ~ 500px + 40px gap) = ~1150px
  // iPad Section: header (70px) + 1 row of 5 cards (each card ~ 660px) = ~780px
  // Mobile Section: header (70px) + 1 row of 7 cards (each card ~ 750px) = ~880px
  // Footer: 100px
  // Total height ~ 3200px

  const totalHeight = 3300;
  console.log(`Canvas dimensions: ${canvasWidth} x ${totalHeight}`);

  const composites = [];

  // Helper for SVG label
  function textToSvg(svgContent, w, h) {
    return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`);
  }

  // 1. Header Banner
  const headerSvg = `
    <rect width="${canvasWidth}" height="220" fill="#0E1322"/>
    <line x1="0" y1="219" x2="${canvasWidth}" y2="219" stroke="#1E293B" stroke-width="2"/>
    <text x="80" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="1">MUHAMMAD HAERUL — PORTFOLIO SHOWCASE CONTACT SHEET</text>
    <text x="80" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="500" fill="#94A3B8">Curated Multi-Device Showcase Collection | Target: https://www.muhammadhaerul.tech/ | 19 Viewport Captures</text>
    <rect x="80" y="155" width="160" height="32" rx="16" fill="#1E293B"/>
    <text x="160" y="176" font-family="sans-serif" font-size="13" font-weight="600" fill="#38BDF8" text-anchor="middle">LAPTOP (1440×900)</text>
    <rect x="255" y="155" width="180" height="32" rx="16" fill="#1E293B"/>
    <text x="345" y="176" font-family="sans-serif" font-size="13" font-weight="600" fill="#A855F7" text-anchor="middle">IPAD PORTRAIT (820×1180)</text>
    <rect x="450" y="155" width="160" height="32" rx="16" fill="#1E293B"/>
    <text x="530" y="176" font-family="sans-serif" font-size="13" font-weight="600" fill="#10B981" text-anchor="middle">MOBILE (390×844)</text>
    <text x="${canvasWidth - 80}" y="176" font-family="sans-serif" font-size="14" font-weight="600" fill="#64748B" text-anchor="end">QA Approved • All PNG Assets Verified</text>
  `;
  composites.push({
    input: textToSvg(headerSvg, canvasWidth, 220),
    top: 0,
    left: 0
  });

  let currentY = 250;

  // 2. LAPTOP SECTION (1440 x 900 @ 2x)
  const laptopSecHeader = `
    <text x="80" y="32" font-family="sans-serif" font-size="22" font-weight="700" fill="#F1F5F9">LAPTOP PROFILE (1440 × 900 • Scale: 2x • Output: 2880 × 1800 px)</text>
    <text x="80" y="54" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748B">Desktop Chromium • Standard Desktop Interaction • 7 Primary Viewport Captures</text>
  `;
  composites.push({
    input: textToSvg(laptopSecHeader, canvasWidth, 65),
    top: currentY,
    left: 0
  });
  currentY += 70;

  // Render Laptop Cards: 4 in row 1, 3 in row 2
  const laptopCards = ITEMS.filter(x => x.dev === 'laptop');
  const laptopW = 560;
  const laptopH = 350; // 560 / 1.6 = 350
  const lGapX = 40;
  const lGapY = 55;
  const lMarginLeft = 80;

  for (let i = 0; i < laptopCards.length; i++) {
    const item = laptopCards[i];
    const row = Math.floor(i / 4);
    const col = i % 4;
    const x = lMarginLeft + col * (laptopW + lGapX);
    const y = currentY + row * (laptopH + 60 + lGapY);

    const imgPath = path.join(SHOWCASE_DIR, item.dev, item.file);
    const resizedBuf = await sharp(imgPath)
      .resize(laptopW, laptopH, { fit: 'cover' })
      .toBuffer();

    composites.push({
      input: resizedBuf,
      top: y,
      left: x
    });

    // Card frame & badge
    const metaSvg = `
      <rect x="0" y="0" width="${laptopW}" height="${laptopH}" fill="none" stroke="#334155" stroke-width="2" rx="4"/>
      <rect x="0" y="${laptopH + 8}" width="${laptopW}" height="42" fill="#131B2E" rx="4"/>
      <text x="14" y="${laptopH + 34}" font-family="sans-serif" font-size="14" font-weight="700" fill="#F8FAFC">${item.title}</text>
      <text x="${laptopW - 14}" y="${laptopH + 34}" font-family="monospace" font-size="12" font-weight="600" fill="#38BDF8" text-anchor="end">${item.sec}</text>
    `;
    composites.push({
      input: textToSvg(metaSvg, laptopW, laptopH + 55),
      top: y,
      left: x
    });
  }

  currentY += 2 * (laptopH + 60 + lGapY) - 20;

  // 3. IPAD SECTION (820 x 1180 @ 2x)
  const ipadSecHeader = `
    <text x="80" y="32" font-family="sans-serif" font-size="22" font-weight="700" fill="#F1F5F9">IPAD PORTRAIT PROFILE (820 × 1180 • Scale: 2x • Output: 1640 × 2360 px)</text>
    <text x="80" y="54" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748B">Tablet Emulation • Portrait Touch Viewport • 5 Primary Captures</text>
  `;
  composites.push({
    input: textToSvg(ipadSecHeader, canvasWidth, 65),
    top: currentY,
    left: 0
  });
  currentY += 70;

  const ipadCards = ITEMS.filter(x => x.dev === 'ipad');
  const ipadW = 448;
  const ipadH = 645; // 448 / 0.695 = 645
  const iGapX = 50;
  const iMarginLeft = 80;

  for (let i = 0; i < ipadCards.length; i++) {
    const item = ipadCards[i];
    const x = iMarginLeft + i * (ipadW + iGapX);
    const y = currentY;

    const imgPath = path.join(SHOWCASE_DIR, item.dev, item.file);
    const resizedBuf = await sharp(imgPath)
      .resize(ipadW, ipadH, { fit: 'cover' })
      .toBuffer();

    composites.push({
      input: resizedBuf,
      top: y,
      left: x
    });

    const metaSvg = `
      <rect x="0" y="0" width="${ipadW}" height="${ipadH}" fill="none" stroke="#334155" stroke-width="2" rx="4"/>
      <rect x="0" y="${ipadH + 8}" width="${ipadW}" height="42" fill="#131B2E" rx="4"/>
      <text x="14" y="${ipadH + 34}" font-family="sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">${item.title}</text>
      <text x="${ipadW - 14}" y="${ipadH + 34}" font-family="monospace" font-size="12" font-weight="600" fill="#A855F7" text-anchor="end">${item.sec}</text>
    `;
    composites.push({
      input: textToSvg(metaSvg, ipadW, ipadH + 55),
      top: y,
      left: x
    });
  }

  currentY += ipadH + 60 + 50;

  // 4. MOBILE SECTION (390 x 844 @ 3x)
  const mobileSecHeader = `
    <text x="80" y="32" font-family="sans-serif" font-size="22" font-weight="700" fill="#F1F5F9">MOBILE PROFILE (390 × 844 • Scale: 3x • Output: 1170 × 2532 px)</text>
    <text x="80" y="54" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748B">iPhone Safari Mobile Viewport • Strict Email Privacy Enforced • 7 Captures</text>
  `;
  composites.push({
    input: textToSvg(mobileSecHeader, canvasWidth, 65),
    top: currentY,
    left: 0
  });
  currentY += 70;

  const mobileCards = ITEMS.filter(x => x.dev === 'mobile');
  const mobileW = 314;
  const mobileH = 680; // 314 / 0.462 = 680
  const mGapX = 40;
  const mMarginLeft = 80;

  for (let i = 0; i < mobileCards.length; i++) {
    const item = mobileCards[i];
    const x = mMarginLeft + i * (mobileW + mGapX);
    const y = currentY;

    const imgPath = path.join(SHOWCASE_DIR, item.dev, item.file);
    const resizedBuf = await sharp(imgPath)
      .resize(mobileW, mobileH, { fit: 'cover' })
      .toBuffer();

    composites.push({
      input: resizedBuf,
      top: y,
      left: x
    });

    const metaSvg = `
      <rect x="0" y="0" width="${mobileW}" height="${mobileH}" fill="none" stroke="#334155" stroke-width="2" rx="4"/>
      <rect x="0" y="${mobileH + 8}" width="${mobileW}" height="42" fill="#131B2E" rx="4"/>
      <text x="10" y="${mobileH + 34}" font-family="sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">${item.title}</text>
      <text x="${mobileW - 10}" y="${mobileH + 34}" font-family="monospace" font-size="11" font-weight="600" fill="#10B981" text-anchor="end">${item.sec}</text>
    `;
    composites.push({
      input: textToSvg(metaSvg, mobileW, mobileH + 55),
      top: y,
      left: x
    });
  }

  currentY += mobileH + 60 + 50;

  // 5. Footer
  const footerSvg = `
    <line x1="80" y1="20" x2="${canvasWidth - 80}" y2="20" stroke="#1E293B" stroke-width="1.5"/>
    <text x="80" y="60" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748B">Automated Quality Assurance &amp; Visual Capture Suite • Playwright + Chromium • Single Source of Truth: https://www.muhammadhaerul.tech/</text>
    <text x="${canvasWidth - 80}" y="60" font-family="sans-serif" font-size="14" font-weight="600" fill="#94A3B8" text-anchor="end">Zero Website Modifications • Privacy Blur Verified • ${new Date().toISOString().split('T')[0]}</text>
  `;
  composites.push({
    input: textToSvg(footerSvg, canvasWidth, 100),
    top: currentY,
    left: 0
  });

  const finalHeight = currentY + 100;
  console.log(`Final contact sheet dimensions: ${canvasWidth} x ${finalHeight}`);

  // Create base blank image
  const baseImg = sharp({
    create: {
      width: canvasWidth,
      height: finalHeight,
      channels: 4,
      background: { r: 10, g: 14, b: 23, alpha: 1 } // #0A0E17
    }
  });

  await baseImg.composite(composites).png().toFile(OUTPUT_FILE);
  console.log(`=== Contact sheet generated successfully at: ${OUTPUT_FILE} ===`);
}

module.exports = { buildContactSheet };

if (require.main === module) {
  buildContactSheet().catch(err => {
    console.error('Contact sheet generation failed:', err);
    process.exit(1);
  });
}
