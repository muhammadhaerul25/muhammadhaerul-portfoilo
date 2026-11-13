/**
 * scripts/verify-output.ts
 *
 * Full Technical and Visual Quality Assurance:
 * 1. Deep FFprobe inspection against out/portfolio-reels-1080x1920.mp4.
 * 2. Strict validation of Resolution, Frame Rate, Duration, Codec, Profile,
 *    Pixel Format, Audio Sample Rate, and File Size.
 * 3. Extracts inspection frames at all 17 specified timestamps.
 * 4. Generates a visual contact sheet grid using Sharp.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const FINAL_MP4 = path.resolve('out/portfolio-reels-1080x1920.mp4');
const FRAMES_DIR = path.resolve('out/verification-frames');
fs.mkdirSync(FRAMES_DIR, { recursive: true });

const TIMESTAMPS = [
  '00:00',
  '00:02',
  '00:04',
  '00:08',
  '00:12',
  '00:16',
  '00:20',
  '00:24',
  '00:28',
  '00:33',
  '00:38',
  '00:42',
  '00:46',
  '00:50',
  '00:52',
  '00:56',
  '00:59',
];

interface ProbeResult {
  width: number;
  height: number;
  fps: number;
  duration: number;
  nbFrames: number;
  vCodec: string;
  vProfile: string;
  pixFmt: string;
  bitrate: number;
  aCodec?: string;
  aSampleRate?: number;
  aChannels?: number;
  fileSizeMb: number;
}

function runFFprobe(): ProbeResult {
  console.log('--- Running Deep FFprobe Analysis ---');

  const jsonStr = execSync(
    `ffprobe -v quiet -print_format json -show_format -show_streams "${FINAL_MP4}"`,
    { encoding: 'utf8' },
  );

  const data = JSON.parse(jsonStr);
  const vStream = data.streams.find((s: any) => s.codec_type === 'video');
  const aStream = data.streams.find((s: any) => s.codec_type === 'audio');
  const stats = fs.statSync(FINAL_MP4);

  // Parse FPS from r_frame_rate e.g. "30/1"
  const [num, den] = (vStream.r_frame_rate || '30/1').split('/').map(Number);
  const fps = Math.round(num / den);

  const duration = parseFloat(data.format.duration || vStream.duration || '0');
  const nbFrames = parseInt(vStream.nb_frames || Math.round(duration * fps).toString(), 10);

  return {
    width: vStream.width,
    height: vStream.height,
    fps,
    duration,
    nbFrames,
    vCodec: vStream.codec_name,
    vProfile: vStream.profile,
    pixFmt: vStream.pix_fmt,
    bitrate: parseInt(data.format.bit_rate || '0', 10),
    aCodec: aStream?.codec_name,
    aSampleRate: aStream ? parseInt(aStream.sample_rate, 10) : undefined,
    aChannels: aStream?.channels,
    fileSizeMb: stats.size / (1024 * 1024),
  };
}

async function extractVerificationFrames() {
  console.log('\n--- Extracting Visual Verification Frames ---');
  const extractedPaths: string[] = [];

  for (let i = 0; i < TIMESTAMPS.length; i++) {
    const ts = TIMESTAMPS[i];
    const outName = `frame-${ts.replace(':', 'm')}s.png`;
    const outPath = path.join(FRAMES_DIR, outName);

    // Precise frame extraction with FFmpeg
    execSync(
      `ffmpeg -y -ss 00:${ts}.100 -i "${FINAL_MP4}" -vframes 1 -q:v 2 "${outPath}"`,
      { stdio: 'pipe' },
    );

    extractedPaths.push(outPath);
    console.log(`✓ [${ts}] -> ${outName}`);
  }

  // Generate a contact sheet grid
  console.log('\n--- Generating Visual Contact Sheet Grid ---');
  const contactSheetPath = path.resolve('out/contact-sheet.png');

  // Contact sheet layout: 4 columns x 5 rows
  const thumbW = 270;
  const thumbH = 480;
  const cols = 4;
  const rows = Math.ceil(extractedPaths.length / cols);

  const canvasW = cols * thumbW;
  const canvasH = rows * thumbH;

  const composites: sharp.OverlayOptions[] = [];

  for (let i = 0; i < extractedPaths.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const left = col * thumbW;
    const top = row * thumbH;

    const thumbBuf = await sharp(extractedPaths[i])
      .resize(thumbW, thumbH, { fit: 'cover' })
      .toBuffer();

    composites.push({
      input: thumbBuf,
      left,
      top,
    });
  }

  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 6, g: 9, b: 15, alpha: 1 },
    },
  })
    .composite(composites)
    .png()
    .toFile(contactSheetPath);

  console.log(`✓ Contact sheet generated: ${contactSheetPath} (${canvasW}x${canvasH})`);
}

async function main() {
  console.log('=== MUHAMMAD HAERUL SHOWREEL QUALITY ASSURANCE ===\n');

  if (!fs.existsSync(FINAL_MP4)) {
    console.error(`✗ Final video not found at: ${FINAL_MP4}`);
    process.exit(1);
  }

  const probe = runFFprobe();

  console.log('\n--- Technical Verification Results ---');
  console.log(`Resolution:    ${probe.width} × ${probe.height} (Target: 1080 × 1920)`);
  console.log(`Frame Rate:    ${probe.fps} FPS (Target: 30 FPS)`);
  console.log(`Total Frames:  ${probe.nbFrames} (Target: Exactly 1,800)`);
  console.log(`Duration:      ${probe.duration.toFixed(3)}s (Target: Exactly 60.000s)`);
  console.log(`Video Codec:   ${probe.vCodec} Profile: ${probe.vProfile} (Target: h264 High)`);
  console.log(`Pixel Format:  ${probe.pixFmt} (Target: yuv420p)`);
  console.log(`Bitrate:       ${(probe.bitrate / 1_000_000).toFixed(2)} Mbps (Target: 8–12 Mbps)`);
  console.log(`Audio Codec:   ${probe.aCodec || 'None'} (Target: aac)`);
  console.log(`Audio Rate:    ${probe.aSampleRate ? probe.aSampleRate + ' Hz' : 'N/A'} (Target: 48000 Hz)`);
  console.log(`Audio Channel: ${probe.aChannels ? probe.aChannels + ' (Stereo)' : 'N/A'} (Target: 2)`);
  console.log(`File Size:     ${probe.fileSizeMb.toFixed(2)} MB (Limit: < 100 MB)`);

  // Assertions
  const errors: string[] = [];
  if (probe.width !== 1080 || probe.height !== 1920) errors.push(`Invalid resolution: ${probe.width}x${probe.height}`);
  if (probe.fps !== 30) errors.push(`Invalid frame rate: ${probe.fps}`);
  if (Math.abs(probe.duration - 60.0) > 0.1) errors.push(`Invalid duration: ${probe.duration}s`);
  if (probe.nbFrames !== 1800) errors.push(`Invalid frame count: ${probe.nbFrames}`);
  if (probe.vCodec !== 'h264') errors.push(`Invalid video codec: ${probe.vCodec}`);
  if (!probe.vProfile.toLowerCase().includes('high')) errors.push(`Invalid profile: ${probe.vProfile}`);
  if (probe.pixFmt !== 'yuv420p') errors.push(`Invalid pixel format: ${probe.pixFmt}`);
  if (probe.fileSizeMb >= 100) errors.push(`File size exceeds 100MB limit: ${probe.fileSizeMb}MB`);

  await extractVerificationFrames();

  if (errors.length > 0) {
    console.error('\n❌ QA Verification Failed with Errors:');
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  } else {
    console.log('\n✨ ALL QA VERIFICATION CRITERIA PASSED WITH 100% SUCCESS!');
  }
}

main().catch((err) => {
  console.error('Fatal error during QA verification:', err);
  process.exit(1);
});

