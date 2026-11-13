import fs from 'node:fs';
import path from 'node:path';
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

const CLIPS_DIR = path.resolve('assets/clips');

for (const clip of CLIPS) {
  const p = path.join(CLIPS_DIR, clip);
  const tmp = path.join(CLIPS_DIR, `temp-${clip}`);
  console.log(`Processing ${clip}...`);
  execSync(
    `ffmpeg -y -i "${p}" -vf "crop=430:932:0:0,scale=1076:2330:flags=lanczos,format=yuv420p" -c:v libx264 -profile:v high -pix_fmt yuv420p -r 60 -crf 16 -movflags +faststart "${tmp}"`,
    { stdio: 'inherit' },
  );
  fs.renameSync(tmp, p);
  console.log(`✓ Fixed ${clip}`);
}
console.log('All clips fixed!');
