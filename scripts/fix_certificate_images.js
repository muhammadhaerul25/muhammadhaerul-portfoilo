const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

async function fixImages() {
  console.log('--- Fixing Award & Certificate Image Assets ---');

  // 1. Map of local images for Awards
  const awardImageMap = [
    { match: 'open the gate', img: '/assets/images/awards/award_img_3.jpg' },
    { match: 'technoart', img: '/assets/images/awards/award_img_new_5.jpg' },
    { match: 'ai talent hub', img: '/assets/images/awards/award_img_4.jpg' },
    { match: 'budaya nusantara', img: '/assets/images/awards/award_img_5.jpg' },
    { match: 'nusantara cultural website', img: '/assets/images/awards/award_img_5.jpg' },
    { match: 'makassar hackathon', img: '/assets/images/awards/award_img_2.jpg' },
    { match: 'international cultural program', img: '/assets/images/awards/award_img_new_9.jpg' },
    { match: 'icp 2023', img: '/assets/images/awards/award_img_new_9.jpg' },
    { match: 'healthkathon', img: '/assets/images/awards/award_img_1.jpg' },
    { match: 'most outstanding student', img: '/assets/images/awards/award_img_new_1.jpg' },
    { match: 'gemastik', img: '/assets/images/awards/award_img_new_7.jpg' },
    { match: 'statistics team competition', img: '/assets/images/awards/award_img_new_8.jpg' },
    { match: 'logika ui', img: '/assets/images/awards/award_img_new_8.jpg' },
    { match: 'national essay', img: '/assets/images/awards/award_img_new_2.jpg' },
    { match: 'management festival', img: '/assets/images/awards/award_img_new_2.jpg' },
    { match: 'hasanuddin mathematics competition', img: '/assets/images/awards/award_img_new_6.jpg' },
    { match: 'medical science olympic', img: '/assets/images/awards/award_img_new_3.jpg' },
    { match: 'medspin', img: '/assets/images/awards/award_img_new_3.jpg' },
    { match: 'national science olympic', img: '/assets/images/awards/award_img_new_4.jpg' },
    { match: 'osn 2019', img: '/assets/images/awards/award_img_new_4.jpg' }
  ];

  const awards = await prisma.award.findMany();
  for (const aw of awards) {
    const t = aw.title.toLowerCase();
    const found = awardImageMap.find(m => t.includes(m.match));
    let newImg = found ? found.img : null;

    // Only allow local valid asset paths starting with /assets/
    if (aw.image_url && !aw.image_url.startsWith('/assets/')) {
      await prisma.award.update({
        where: { id: aw.id },
        data: { image_url: newImg }
      });
      console.log(`Updated Award [${aw.title}]: -> ${newImg || '(none)'}`);
    } else if (!aw.image_url && newImg) {
      await prisma.award.update({
        where: { id: aw.id },
        data: { image_url: newImg }
      });
      console.log(`Assigned Award [${aw.title}]: -> ${newImg}`);
    }
  }

  // 2. Map of local SVG images for Certifications
  const certImageMap = [
    { match: 'data science - dex', img: '/assets/certificates/cert-data-science-dts.svg' },
    { match: 'deep learning - dex', img: '/assets/certificates/cert-deep-learning-dts.svg' },
    { match: 'langchain', img: '/assets/certificates/cert-genai-langchain.svg' },
    { match: 'software development specialization', img: '/assets/certificates/cert-genai-software.svg' },
    { match: 'machine learning in production', img: '/assets/certificates/cert-ml-production.svg' },
    { match: 'machine learning specialization', img: '/assets/certificates/cert-ml-specialization.svg' },
    { match: 'prompt engineering untuk software', img: '/assets/certificates/cert-prompt-engineering.svg' },
    { match: 'sql (intermediate)', img: '/assets/certificates/cert-sql-intermediate.svg' }
  ];

  const certs = await prisma.certification.findMany();
  for (const cert of certs) {
    const t = cert.title.toLowerCase();
    const found = certImageMap.find(m => t.includes(m.match));
    let targetImg = found ? found.img : null;

    // If existing image_url is a LinkedIn URL or not starting with /assets/, fix it
    if (cert.image_url && !cert.image_url.startsWith('/assets/')) {
      await prisma.certification.update({
        where: { id: cert.id },
        data: { image_url: targetImg }
      });
      console.log(`Updated Cert [${cert.title}]: -> ${targetImg || '(none)'}`);
    } else if (!cert.image_url && targetImg) {
      await prisma.certification.update({
        where: { id: cert.id },
        data: { image_url: targetImg }
      });
      console.log(`Assigned Cert [${cert.title}]: -> ${targetImg}`);
    }
  }

  cache.del();
  console.log('✓ All image assets restored to valid local paths & cache cleared.');
}

fixImages()
  .then(() => {
    console.log('Done!');
    setTimeout(() => process.exit(0), 100);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
