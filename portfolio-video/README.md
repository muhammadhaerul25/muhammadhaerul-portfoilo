# Muhammad Haerul — Personal Portfolio Showreel (Instagram Reels / Stories)

A cinematic, 60-second vertical (1080 × 1920, 9:16 @ 30 FPS) personal-brand showreel for **Muhammad Haerul, S.Kom.** (AI Full-Stack Specialist — Engineer, Researcher, Trainer). Built with **Remotion**, **React**, **Playwright**, **TypeScript**, and **FFmpeg**.

---

## 1. Project Overview

- **Subject:** Muhammad Haerul, S.Kom.
- **Website:** [https://muhammadhaerul.tech](https://muhammadhaerul.tech)
- **Format:** Instagram Reels / Stories (Vertical 9:16, 1080 × 1920, 30 FPS, exactly 60.000s / 1,800 frames)
- **Narrative Arc:**
  - `00:00–00:04` — **Hook**: Personal brand & tagline ("I build, research and teach AI").
  - `00:04–00:12` — **Who I Am**: Live hero capture & verified metrics (4+ Yrs, 20+ Projects, 1,560+ Attendees, 9.5★).
  - `00:12–00:28` — **Build**: Production work at AksaraHub, Paper.id (LLM KYC/KYB OCR), XL Axiata (PPE Edge Vision), and shipped systems.
  - `00:28–00:38` — **Research**: Publications, PyPI package (*Galaxy Object Detection Core*), and university thesis.
  - `00:38–00:50` — **Teach**: Educator dimension with cinematic Ken Burns slideshow across verified speaking engagements & masterclasses.
  - `00:50–01:00` — **Proof & CTA**: Top 20 AI Talent Hub award, hackathon champion accolades, and memorable CTA end card (`muhammadhaerul.tech`).

---

## 2. Prerequisites

- **Node.js**: `v20+` or `v24+`
- **npm**: `v10+` or `v11+`
- **FFmpeg & FFprobe**: Must be installed and available in system `PATH` (used for transcoding, audio mixing, and technical verification).
- **Chromium**: Managed via Playwright (`npx playwright install chromium`).

---

## 3. Installation

```bash
cd portfolio-video
npm install
```

---

## 4. Project Structure

```text
portfolio-video/
├── assets/
│   ├── clips/             # High-quality 60fps website recordings (hero, experiences, projects, etc.)
│   ├── stills/            # Native high-resolution photographs & certificates
│   ├── diagnostics/       # Pre-flight website inspection screenshots
│   └── audio/             # Drop voiceover.mp3 and music.mp3 here
├── src/
│   ├── components/        # Reusable Remotion components (PhoneFrame, Background, Counter, Subtitle, etc.)
│   ├── scenes/            # Six distinct narrative chapters (Hook, Who, Build, Research, Teach, ProofCTA)
│   ├── content.ts         # Central configuration for copy, stats, timings, and theme
│   ├── Cover.tsx          # Instagram profile-grid compatible cover composition (1080x1920)
│   ├── PortfolioShowreel.tsx # Main composition orchestrating all sequences & subtitles
│   ├── Root.tsx           # Remotion root registering all video & still compositions
│   └── index.ts           # Entry point registering Root
├── scripts/
│   ├── capture-site.ts    # Playwright automation script to capture website clips & stills
│   ├── validate-assets.ts # Verifies that all required media assets are present and valid
│   ├── render.ts          # Production rendering pipeline (bundle -> renderMedia -> FFmpeg)
│   ├── verify-output.ts   # Deep technical FFprobe audit and visual contact-sheet generator
│   └── browser.ts         # Resolves the permitted Chromium binary across environments
├── captions.json          # Dual-language subtitles (English & Indonesian)
├── remotion.config.ts     # Remotion CLI configuration
└── out/                   # Output deliverables (final MP4, Cover, Safe-zone debug, Contact sheet)
```

---

## 5. Website Recapture Instructions

To re-record fresh website footage and stills directly from the live site:

```bash
npm run capture
```

This will:
1. Emulate an iPhone mobile viewport (`430 × 932` at `2.5x` device scale factor = `1075 × 2330 px`).
2. Extract original uncompressed photographs and award certificates with Sharp.
3. Perform smooth cubic-eased scroll automation across all 7 sections.
4. Transcode raw captures into 60 FPS H.264 High profile MP4 clips in `assets/clips/`.

---

## 6. How to Replace Photographs and Clips

- **Hero Portrait:** Replace `assets/stills/hero-portrait.png`.
- **Award Certificate:** Replace `assets/stills/top-20-ai-talent-hub.png`.
- **Talk Photographs:** Replace `assets/stills/talk-01.png`, `talk-02.png`, and `talk-03.png`.
- **Website Video Footage:** Place new `.mp4` recordings directly inside `assets/clips/` with matching names (`hero.mp4`, `experiences.mp4`, `projects.mp4`, `publications.mp4`, `talks.mp4`, `awards.mp4`, `certifications.mp4`).

---

## 7. How to Replace Voiceover and Music

Place your audio files into `assets/audio/`:
- `assets/audio/voiceover.mp3` — Narration track.
- `assets/audio/music.mp3` — Background score.

*Note:* If either or both files are missing, the rendering pipeline automatically generates a compliant silent stereo AAC track at 48 kHz. When both are provided, FFmpeg automatically ducks the background music beneath the voiceover.

---

## 8. How to Edit Scene Text and Durations

All creative copy, statistics, brand colors, and scene durations are centralized in:

```typescript
src/content.ts
```

No animation code needs to be modified to adjust text, headlines, or numbers.

---

## 9. How to Switch Subtitle Languages

Subtitles are defined in `captions.json` with both `en` (English) and `id` (Indonesian) translations.

To switch languages:
- Edit the `"language"` field in `captions.json` to `"id"`, OR
- In `src/Root.tsx`, select the `PortfolioShowreelID` composition.

---

## 10. How to Preview the Video

Launch the interactive Remotion Studio in your browser:

```bash
npm run studio
```

Or:

```bash
npx remotion studio src/index.ts
```

---

## 11. How to Render the Final Video

To render the complete production video, cover still, and safe-zone debug assets:

```bash
npm run render
```

Generated outputs in `./out/`:
- `out/portfolio-reels-1080x1920.mp4` — Master production video.
- `out/cover-1080x1920.png` — Instagram profile-grid compatible cover.
- `out/safe-zone-debug.png` — Safe-zone boundary visualization.
- `out/safe-zone-debug.mp4` — Safe-zone video preview.

---

## 12. How to Run Quality Assurance

Run automated FFprobe technical checks and generate the visual contact sheet:

```bash
npm run verify
```

This verifies:
- Exactly `1080 × 1920` resolution (9:16 aspect ratio).
- Exactly `30 FPS`.
- Exactly `1,800 frames` (`60.000s` duration).
- `H.264 High` profile video with `yuv420p` pixel format.
- `AAC 48 kHz Stereo` audio.
- Fast start enabled.
- File size below 100 MB.
- Generates `out/contact-sheet.png` and extracts 17 timestamped inspection frames.

