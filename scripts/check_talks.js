const prisma = require('../src/config/db');

async function checkTalks() {
  const talks = await prisma.talk.findMany();
  console.log('Total talks:', talks.length);
  talks.forEach(t => {
    console.log(JSON.stringify({
      id: t.id,
      event: t.event,
      organizer: t.organizer,
      certificate_url: t.certificate_url,
      poster_url: t.poster_url,
      slides: t.slides
    }, null, 2));
  });
  await prisma.$disconnect();
}

checkTalks();
