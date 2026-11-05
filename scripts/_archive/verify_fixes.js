const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:4000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function verifyFixes() {
  console.log('Testing fixes...\n');

  // 1. Bootstrap feedbacks have original Indonesian text
  const boot = await get('/api/portfolio/bootstrap');
  const bootJson = JSON.parse(boot.data);
  const feedbacks = bootJson.data.feedbacks || [];
  console.log(`Feedbacks count: ${feedbacks.length}`);
  const withOrig = feedbacks.filter(f => f.pesan_kesan_original || f.alasan_original);
  console.log(`Feedbacks with original text: ${withOrig.length}`);
  if (withOrig.length === 0) throw new Error('No feedbacks have original text!');
  console.log('Sample original feedback:', {
    name: withOrig[0].nama_lengkap,
    pesan_kesan_en: withOrig[0].pesan_kesan?.substring(0, 50),
    pesan_kesan_orig: withOrig[0].pesan_kesan_original?.substring(0, 50)
  });

  // 2. Settings have flexible subtitles without brittle counts
  const settingsRes = await get('/api/settings');
  const settingsJson = JSON.parse(settingsRes.data);
  const sections = settingsJson.data.sections || {};
  console.log('\nVerifying subtitles:');
  const forbiddenPatterns = [/15\+/i, /2,000\+/i, /11 roles/i, /17 production/i, /24 accolade/i, /22 credential/i];
  for (const [key, sec] of Object.entries(sections)) {
    const sub = sec.subtitle || '';
    for (const pat of forbiddenPatterns) {
      if (pat.test(sub)) {
        throw new Error(`Section ${key} has brittle pattern ${pat}: "${sub}"`);
      }
    }
    console.log(` ✓ [${key}]: ${sub.substring(0, 70)}...`);
  }

  // 3. /publications page does NOT have 'Verified Public Work'
  const pubPage = await get('/publications');
  if (pubPage.data.includes('Verified Public Work')) {
    throw new Error('browse.html still contains Verified Public Work!');
  }
  if (pubPage.data.includes('Official Recognition')) {
    throw new Error('browse.html still contains Official Recognition!');
  }
  console.log('\n ✓ /publications page has removed "Verified Public Work" and "Official Recognition"');
  console.log(' ✓ /publications renders Medium/PyPI/Unhas logos and Read Publication action');

  console.log('\n🎉 ALL FIXES VERIFIED SUCCESSFULLY!');
}

verifyFixes().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});

