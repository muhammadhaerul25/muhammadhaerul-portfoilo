const fs = require('fs');
const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

fs.copyFileSync(
  'c:/Users/Asus/Documents/muhammadhaerul-feedbacks/public/assets/images/talk_cert_new.jpg',
  'c:/Users/Asus/Documents/muhammadhaerul-feedbacks/public/assets/images/talks_cert_yayasan_khouw_kalbe_mindful_ai.jpg'
);

async function attachCert() {
  const certPath = '/assets/images/talks_cert_yayasan_khouw_kalbe_mindful_ai.jpg';
  const talk = await prisma.talk.findFirst({
    where: {
      OR: [
        { organizer: { contains: 'Khouw Kalbe' } },
        { event: { contains: 'Mindful AI' } }
      ]
    }
  });

  if (talk) {
    const existingSlides = Array.isArray(talk.slides) ? talk.slides : [];
    const updatedSlides = [
      ...existingSlides.filter(s => s.type !== 'certificate'),
      { url: certPath, type: 'certificate', label: 'Speaker Certificate' }
    ];

    await prisma.talk.update({
      where: { id: talk.id },
      data: {
        gallery: [certPath],
        slides: updatedSlides
      }
    });
    console.log('Successfully attached certificate to talk:', talk.event, 'id:', talk.id);
  } else {
    console.error('Talk not found!');
  }

  cache.del('talks');
  cache.del('talks:all');
  cache.del('portfolio:bootstrap');
  await prisma.$disconnect();
}

attachCert();
