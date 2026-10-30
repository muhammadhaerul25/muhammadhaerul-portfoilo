const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

async function removeSpeakerAwards() {
  console.log('--- Removing Speakership from Honors & Awards ---');

  // Find all awards that are speakership items
  const speakerAwards = await prisma.award.findMany({
    where: {
      title: {
        contains: 'Speaker at',
        mode: 'insensitive'
      }
    }
  });

  console.log(`Found ${speakerAwards.length} speakership awards to delete:`);
  speakerAwards.forEach(a => console.log(` - ${a.title} (${a.issuer})`));

  // Delete them
  const deleteResult = await prisma.award.deleteMany({
    where: {
      title: {
        contains: 'Speaker at',
        mode: 'insensitive'
      }
    }
  });
  console.log(`✓ Deleted ${deleteResult.count} awards.`);

  // Fetch remaining awards
  const remaining = await prisma.award.findMany();
  console.log(`Remaining awards count: ${remaining.length}`);

  // Re-sort remaining awards by date descending
  // Month map for metric_tag like "Feb 2026", "Sep 2025", etc.
  const monthMap = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
  function getAwardDateVal(a) {
    const raw = (a.metric_tag || '').trim().toLowerCase();
    const parts = raw.split(/\s+/);
    if (parts.length === 2 && monthMap[parts[0]] && !isNaN(parts[1])) {
      return parseInt(parts[1]) * 100 + monthMap[parts[0]];
    }
    if (parts.length === 1 && !isNaN(parts[0])) {
      return parseInt(parts[0]) * 100;
    }
    return 0;
  }

  remaining.sort((a, b) => {
    const dateA = getAwardDateVal(a);
    const dateB = getAwardDateVal(b);
    if (dateB !== dateA) return dateB - dateA; // Newest first
    return (a.sort_order || 0) - (b.sort_order || 0);
  });

  // Re-index sort_order 1..N
  console.log('\n--- Re-indexed Honors & Awards (Strict Descending Order) ---');
  for (let i = 0; i < remaining.length; i++) {
    const item = remaining[i];
    const newOrder = i + 1;
    await prisma.award.update({
      where: { id: item.id },
      data: { sort_order: newOrder }
    });
    console.log(`${newOrder}. ${item.title} | ${item.issuer} | ${item.metric_tag}`);
  }

  // Clear in-memory cache
  cache.del();
  console.log('\n✓ Cache flushed successfully.');
}

removeSpeakerAwards()
  .then(() => {
    console.log('Script completed successfully!');
    setTimeout(() => process.exit(0), 100);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
