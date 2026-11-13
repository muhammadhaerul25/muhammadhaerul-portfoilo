/**
 * scripts/validate-assets.ts
 *
 * Validates that all required captured footage, original stills,
 * and captions configuration are in place before rendering.
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { execSync } from 'node:child_process';

const CLIPS = [
  'hero.mp4',
  'experiences.mp4',
  'projects.mp4',
  'publications.mp4',
  'talks.mp4',
  'awards.mp4',
  'certifications.mp4',
];

const STILLS = [
  'hero-portrait.png',
  'top-20-ai-talent-hub.png',
  'talk-01.png',
  'talk-02.png',
  'talk-03.png',
];

async function validate() {
  console.log('=== VALIDATING ASSETS FOR REMOTION RENDERING ===\n');

  let errors = 0;

  // 1. Check clips
  console.log('--- Checking Video Clips (assets/clips/) ---');
  for (const clip of CLIPS) {
    const p = path.resolve('assets/clips', clip);
    if (!fs.existsSync(p)) {
      console.error(`✗ Missing clip: ${clip}`);
      errors++;
      continue;
    }

    try {
      const probeOutput = execSync(
        `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration,codec_name -of default=noprint_wrappers=1 "${p}"`,
        { encoding: 'utf8' },
      );
      const sizeMb = (fs.statSync(p).size / (1024 * 1024)).toFixed(2);
      console.log(`✓ ${clip} (${sizeMb} MB) -> ${probeOutput.replace(/\r?\n/g, ' ')}`);
    } catch (e: any) {
      console.error(`✗ Error probing ${clip}: ${e.message}`);
      errors++;
    }
  }

  // 2. Check stills
  console.log('\n--- Checking High-Res Stills (assets/stills/) ---');
  for (const still of STILLS) {
    const p = path.resolve('assets/stills', still);
    if (!fs.existsSync(p)) {
      console.error(`✗ Missing still: ${still}`);
      errors++;
      continue;
    }

    try {
      const meta = await sharp(p).metadata();
      console.log(`✓ ${still} (${meta.width}x${meta.height}, ${meta.format})`);
    } catch (e: any) {
      console.error(`✗ Error reading ${still}: ${e.message}`);
      errors++;
    }
  }

  // 3. Check captions
  console.log('\n--- Checking Captions Configuration ---');
  const captionsPath = path.resolve('captions.json');
  if (fs.existsSync(captionsPath)) {
    const captions = JSON.parse(fs.readFileSync(captionsPath, 'utf8'));
    console.log(`✓ captions.json loaded (${captions.captions.length} captions, default lang: ${captions.language})`);
  } else {
    console.error('✗ Missing captions.json');
    errors++;
  }

  // 4. Check audio status
  console.log('\n--- Checking Audio Assets (assets/audio/) ---');
  const voPath = path.resolve('assets/audio/voiceover.mp3');
  const musicPath = path.resolve('assets/audio/music.mp3');
  console.log(`- voiceover.mp3: ${fs.existsSync(voPath) ? 'PRESENT' : 'NOT SUPPLIED (silent fallback)'}`);
  console.log(`- music.mp3: ${fs.existsSync(musicPath) ? 'PRESENT' : 'NOT SUPPLIED (silent fallback)'}`);

  if (errors === 0) {
    console.log('\n✨ ALL REQUIRED DELIVERABLE ASSETS ARE VALID AND READY!\n');
    process.exit(0);
  } else {
    console.error(`\n❌ Asset validation failed with ${errors} error(s).\n`);
    process.exit(1);
  }
}

validate().catch((err) => {
  console.error(err);
  process.exit(1);
});

