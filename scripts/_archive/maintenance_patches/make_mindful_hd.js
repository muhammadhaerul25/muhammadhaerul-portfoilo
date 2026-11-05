const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processHD() {
  const input = path.join(__dirname, '../../public/uploads/talks/mindful-ai-poster-hd.jpg');
  const outWebp = path.join(__dirname, '../../public/assets/images/muhammad-haerul-speaker-mindful-ai.webp');
  const outJpg = path.join(__dirname, '../../public/assets/images/muhammad-haerul-speaker-mindful-ai-hd.jpg');
  
  const buf = fs.readFileSync(input);
  
  // 1. High-fidelity WebP at full HD 2560px with lanczos3 interpolation & crisp unsharp masking
  await sharp(buf)
    .resize({ width: 2560, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 1.0, m2: 0.5 })
    .webp({ quality: 92, effort: 6 })
    .toFile(outWebp);
    
  // 2. High-fidelity JPEG at full HD 2560px
  await sharp(buf)
    .resize({ width: 2560, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 1.0, m2: 0.5 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outJpg);
    
  console.log('Generated WebP:', fs.statSync(outWebp).size, 'bytes');
  console.log('Generated JPG:', fs.statSync(outJpg).size, 'bytes');
}

processHD().catch(console.error);

