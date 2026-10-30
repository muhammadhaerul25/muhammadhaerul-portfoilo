const prisma = require('../src/config/db');

async function main() {
  const exps = await prisma.experience.findMany();
  console.log('Current experiences in DB:');
  for (const e of exps) {
    console.log(`- ${e.company} (${e.role}): ${JSON.stringify(e.stack)}`);
  }

  // Update ALL experiences in DB to have empty stack: []
  const result = await prisma.experience.updateMany({
    data: {
      stack: []
    }
  });
  console.log(`Updated ${result.count} experiences to have stack = []`);

  // Verify
  const updated = await prisma.experience.findMany();
  for (const e of updated) {
    console.log(`Verified - ${e.company}: stack = ${JSON.stringify(e.stack)}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
