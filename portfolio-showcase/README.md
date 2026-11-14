# Muhammad Haerul Portfolio — High-Resolution Showcase & QA Capture Suite

This directory contains the automated Playwright capture suite and visual showcase assets for the personal portfolio of **Muhammad Haerul, S.Kom** ([https://www.muhammadhaerul.tech/](https://www.muhammadhaerul.tech/)).

---

## Output Structure

```
portfolio-showcase/
├── package.json               # Node.js dependencies (Playwright, Sharp)
├── capture.js                 # Complete automated capture & showcase script
├── inspect.js                 # Diagnostic inspection & audit script
├── generate-contact-sheet.js  # High-resolution visual contact sheet builder
├── README.md                  # Instructions and documentation
└── showcase/
    ├── laptop/                # 1440 × 900 @ 2x (2880 × 1800 px physical)
    │   ├── 01-hero.png
    │   ├── 02-projects-grid.png
    │   ├── 03-project-modal.png
    │   ├── 04-experience.png
    │   ├── 05-talks.png
    │   ├── 06-awards.png
    │   ├── 07-skills-one-category.png
    │   └── FULL-laptop.png    # Continuous full-page technical reference
    ├── ipad/                  # 820 × 1180 @ 2x (1640 × 2360 px physical)
    │   ├── 01-hero.png
    │   ├── 02-projects-grid.png
    │   ├── 03-talks.png
    │   ├── 04-awards.png
    │   └── 05-nav-or-skills.png
    ├── mobile/                # 390 × 844 @ 3x (1170 × 2532 px physical)
    │   ├── 01-hero.png
    │   ├── 02-nav-open.png
    │   ├── 03-project-card.png
    │   ├── 04-project-modal.png
    │   ├── 05-experience-timeline.png
    │   ├── 06-feedback-rating.png
    │   └── 07-contact-form.png
    ├── reference/             # Additional reference materials
    ├── manifest.json          # Machine-readable capture metadata
    ├── report.md              # Detailed QA inspection and technical audit report
    └── contact-sheet.png      # Master high-resolution visual contact sheet (2600 × 3015 px)
```

---

## Prerequisites

- **Node.js** v18+ (tested on Node v24.16.0)
- **Google Chrome** installed on the system (or Playwright Chromium binaries)

---

## Installation

From within the `portfolio-showcase` folder, install required dependencies:

```bash
cd portfolio-showcase
npm install
```

If you need to install standalone Playwright Chromium binaries:
```bash
npx playwright install chromium
```

---

## Running the Capture Suite

To execute the entire automated capture workflow, generate all 20 screenshots, update `manifest.json`, and compile `contact-sheet.png`:

```bash
npm run capture
# or
node capture.js
```

### Running Inspection Only
To perform the non-invasive DOM, network, and touch target audit without taking screenshots:
```bash
node inspect.js
```

### Rebuilding Contact Sheet Only
To re-render the master `contact-sheet.png` from existing screenshots:
```bash
node generate-contact-sheet.js
```

---

## Device Profiles & Physical Dimensions

| Device Profile | CSS Viewport | Device Scale Factor | Output Physical Dimensions | Emulation Details |
|---|---|---|---|---|
| **Laptop** | 1440 × 900 | 2.0 | **2880 × 1800 px** | Desktop Chromium, Desktop UA |
| **iPad Portrait** | 820 × 1180 | 2.0 | **1640 × 2360 px** | WebKit/iPad Safari UA, Touch Enabled |
| **Mobile** | 390 × 844 | 3.0 | **1170 × 2532 px** | WebKit/iPhone Safari UA, Touch Enabled |

---

## Quality & Privacy Standards

- **Zero Production Modifications:** The capture script executes purely read-only interactions with navigation, modals, and tabs.
- **Privacy First:** On mobile `#contact` capture and within the contact sheet, email addresses are automatically blurred using CSS filters before capture.
- **Motion & Animation Freezing:** CSS transitions and infinite marquee animations are paused before taking screenshots to prevent motion blur and artifacts.
- **Readiness Verification:** Waits for `document.fonts.ready`, dynamic API hydration (`/api/projects`), and network stabilization.

---

## Known Website Observations (Documented in `report.md`)

1. **Gallery Marquee Duplication:** Row 0 in `#gallery` loops the same XL Axiata portrait 16 times.
2. **Duplicate Award Certificate:** KemenPAN-RB certificate card is duplicated inside `#awards` and misplaced inside `#publications`.
3. **Empty Lightbox `src=""`:** Default lightbox element requests page URL before user interaction.
4. **Missing Experience Logo:** Paper.id timeline entry has an empty logo container.
5. **Multiple OG Image Tags:** Four conflicting `og:image` tags in `<head>`.

