/**
 * scripts/render.ts
 *
 * Full production rendering pipeline:
 * 1. Bundles the Remotion project with publicDir: assets.
 * 2. Renders out/cover-1080x1920.png (Cover composition).
 * 3. Renders out/safe-zone-debug.png (SafeZoneDebug composition at frame 200).
 * 4. Renders the master composition PortfolioShowreel (1080x1920 @ 30 FPS, 1800 frames).
 * 5. Applies FFmpeg post-production: H.264 High profile, yuv420p, AAC 48kHz stereo,
 *    faststart, and 8-12 Mbps bitrate tuning.
 * 6. Renders out/safe-zone-debug.mp4 (Safe-Zone debug video).
 */

import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { resolveBrowserExecutable } from './browser.js';

const OUT_DIR = path.resolve('out');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function render() {
  console.log('=== STARTING PRODUCTION VIDEO RENDERING PIPELINE ===\n');

  const browserPath = resolveBrowserExecutable();
  console.log('Browser executable:', browserPath);

  // 1. Bundle Remotion project
  console.log('\n--- [1/6] Bundling Remotion Application ---');
  const bundleLocation = await bundle({
    entryPoint: path.resolve('src/index.ts'),
    publicDir: path.resolve('assets'),
  });
  console.log('✓ Webpack bundle ready at:', bundleLocation);

  // 2. Render Cover Still (out/cover-1080x1920.png)
  console.log('\n--- [2/6] Rendering High-Res Cover (out/cover-1080x1920.png) ---');
  const coverComp = await selectComposition({
    serveUrl: bundleLocation,
    id: 'Cover',
    browserExecutable: browserPath ?? undefined,
  });

  const coverOut = path.join(OUT_DIR, 'cover-1080x1920.png');
  await renderStill({
    composition: coverComp,
    serveUrl: bundleLocation,
    output: coverOut,
    browserExecutable: browserPath ?? undefined,
  });
  console.log('✓ Saved Cover Still:', coverOut);

  // 3. Render Safe-Zone Debug Still (out/safe-zone-debug.png)
  console.log('\n--- [3/6] Rendering Safe-Zone Debug Asset (out/safe-zone-debug.png) ---');
  const debugComp = await selectComposition({
    serveUrl: bundleLocation,
    id: 'SafeZoneDebug',
    browserExecutable: browserPath ?? undefined,
  });

  const debugStillOut = path.join(OUT_DIR, 'safe-zone-debug.png');
  await renderStill({
    composition: debugComp,
    serveUrl: bundleLocation,
    output: debugStillOut,
    frame: 200, // Representative frame in Who scene with stats & safe zones
    browserExecutable: browserPath ?? undefined,
  });
  console.log('✓ Saved Safe-Zone Debug Still:', debugStillOut);

  // 4. Render Main Video Composition (PortfolioShowreel)
  console.log('\n--- [4/6] Rendering Main Video (1080x1920 @ 30 FPS, 1800 Frames) ---');
  const mainComp = await selectComposition({
    serveUrl: bundleLocation,
    id: 'PortfolioShowreel',
    browserExecutable: browserPath ?? undefined,
  });

  console.log(`Composition details: ${mainComp.width}x${mainComp.height} @ ${mainComp.fps} FPS, ${mainComp.durationInFrames} frames (${(mainComp.durationInFrames / mainComp.fps).toFixed(1)}s)`);

  const rawRenderPath = path.join(OUT_DIR, 'temp-raw-render.mp4');
  let lastReported = -1;

  await renderMedia({
    composition: mainComp,
    serveUrl: bundleLocation,
    codec: 'h264',
    crf: 15,
    pixelFormat: 'yuv420p',
    outputLocation: rawRenderPath,
    browserExecutable: browserPath ?? undefined,
    onProgress: ({ progress }) => {
      const pct = Math.round(progress * 100);
      if (pct % 5 === 0 && pct !== lastReported) {
        lastReported = pct;
        console.log(`  Render progress: ${pct}%`);
      }
    },
  });
  console.log('✓ Raw Remotion render completed:', rawRenderPath);

  // 5. FFmpeg Post-Production & Audio Standardization
  console.log('\n--- [5/6] FFmpeg Post-Production & Audio Standardization ---');
  const finalMp4Out = path.join(OUT_DIR, 'portfolio-reels-1080x1920.mp4');

  const voiceoverPath = path.resolve('assets/audio/voiceover.mp3');
  const musicPath = path.resolve('assets/audio/music.mp3');
  const hasVoiceover = fs.existsSync(voiceoverPath);
  const hasMusic = fs.existsSync(musicPath);

  let ffmpegCmd = '';

  if (hasVoiceover && hasMusic) {
    console.log('Audio mode: Voiceover + Background Music');
    ffmpegCmd = `ffmpeg -y -i "${rawRenderPath}" -i "${voiceoverPath}" -i "${musicPath}" -filter_complex "[1:a]volume=1.0[vo];[2:a]volume=0.35[bg];[vo][bg]amix=inputs=2:duration=first[aout];[0:v]format=yuv420p[vout]" -map "[vout]" -map "[aout]" -c:v libx264 -profile:v high -b:v 10M -maxrate 12M -bufsize 20M -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest -movflags +faststart "${finalMp4Out}"`;
  } else if (hasMusic) {
    console.log('Audio mode: Background Music only');
    ffmpegCmd = `ffmpeg -y -i "${rawRenderPath}" -i "${musicPath}" -vf "format=yuv420p" -map 0:v -map 1:a -c:v libx264 -profile:v high -b:v 10M -maxrate 12M -bufsize 20M -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest -movflags +faststart "${finalMp4Out}"`;
  } else if (hasVoiceover) {
    console.log('Audio mode: Voiceover only');
    ffmpegCmd = `ffmpeg -y -i "${rawRenderPath}" -i "${voiceoverPath}" -vf "format=yuv420p" -map 0:v -map 1:a -c:v libx264 -profile:v high -b:v 10M -maxrate 12M -bufsize 20M -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest -movflags +faststart "${finalMp4Out}"`;
  } else {
    console.log('Audio mode: Silent fallback (Synthesizing compliant 48kHz stereo AAC silent stream as required)');
    ffmpegCmd = `ffmpeg -y -i "${rawRenderPath}" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 -vf "format=yuv420p" -map 0:v -map 1:a -c:v libx264 -profile:v high -b:v 10M -maxrate 12M -bufsize 20M -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest -movflags +faststart "${finalMp4Out}"`;
  }

  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log('✓ Final MP4 produced:', finalMp4Out);

  // Clean up raw temp file
  if (fs.existsSync(rawRenderPath)) {
    fs.unlinkSync(rawRenderPath);
  }

  // 6. Safe-Zone Debug Video (out/safe-zone-debug.mp4)
  console.log('\n--- [6/6] Creating Safe-Zone Debug Video (out/safe-zone-debug.mp4) ---');
  const debugVideoOut = path.join(OUT_DIR, 'safe-zone-debug.mp4');
  try {
    const rawDebugVideo = path.join(OUT_DIR, 'temp-debug-video.mp4');
    await renderMedia({
      composition: debugComp,
      serveUrl: bundleLocation,
      codec: 'h264',
      crf: 20,
      pixelFormat: 'yuv420p',
      outputLocation: rawDebugVideo,
      browserExecutable: browserPath ?? undefined,
      frameRange: [0, 360], // First 12 seconds showing Hook & Who with overlays
    });

    execSync(
      `ffmpeg -y -i "${rawDebugVideo}" -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart "${debugVideoOut}"`,
      { stdio: 'pipe' },
    );
    if (fs.existsSync(rawDebugVideo)) fs.unlinkSync(rawDebugVideo);
    console.log('✓ Safe-zone debug video rendered:', debugVideoOut);
  } catch (err: any) {
    console.warn('⚠ Could not render debug video:', err.message);
  }

  console.log('\n✨ PRODUCTION RENDERING COMPLETE!');
}

render().catch((err) => {
  console.error('Fatal rendering error:', err);
  process.exit(1);
});
