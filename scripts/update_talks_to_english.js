const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

async function main() {
    // 1. Update talk cmt2kbpn800029sb99b3zz1ax
    await prisma.talk.update({
        where: { id: 'cmt2kbpn800029sb99b3zz1ax' },
        data: {
            event: 'National Cybersecurity & Information Security Awareness Webinar',
            organizer: 'Badan Siber dan Sandi Negara (BSSN)'
        }
    });

    // 2. Update talk cmt2k5bn000019sb9mvzbynus
    await prisma.talk.update({
        where: { id: 'cmt2k5bn000019sb9mvzbynus' },
        data: {
            event: 'GSA AI Forge: AI for Personal Branding & Digital Portfolio',
            organizer: 'Google Student Ambassador'
        }
    });

    // 3. Update talk cmt2kgv0z00039sb9w2y7ol67
    await prisma.talk.update({
        where: { id: 'cmt2kgv0z00039sb9w2y7ol67' },
        data: {
            event: 'AI Web Engineering & Security Hands-on Workshop',
            organizer: 'Universitas Sulawesi Barat'
        }
    });

    // 4. Restore original Indonesian institution names across educations, experiences, awards, publications
    await prisma.education.updateMany({
        where: { institution: { contains: 'Hasanuddin', mode: 'insensitive' } },
        data: { institution: 'Universitas Hasanuddin' }
    });

    await prisma.experience.updateMany({
        where: { company: { contains: 'Ministry of Education', mode: 'insensitive' } },
        data: { company: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi' }
    });

    await prisma.publication.updateMany({
        where: { publisher: { contains: 'Hasanuddin', mode: 'insensitive' } },
        data: { publisher: 'Universitas Hasanuddin' }
    });

    await prisma.award.updateMany({
        where: { issuer: 'University of Indonesia x Pertamina' },
        data: { issuer: 'Universitas Indonesia x Pertamina' }
    });
    await prisma.award.updateMany({
        where: { issuer: 'University of Indonesia' },
        data: { issuer: 'Universitas Indonesia' }
    });
    await prisma.award.updateMany({
        where: { issuer: 'Hasanuddin University' },
        data: { issuer: 'Universitas Hasanuddin' }
    });
    await prisma.award.updateMany({
        where: { issuer: 'International Office Hasanuddin University' },
        data: { issuer: 'International Office Universitas Hasanuddin' }
    });
    await prisma.award.updateMany({
        where: { issuer: 'Faculty of Medicine, University of Airlangga' },
        data: { issuer: 'Fakultas Kedokteran Universitas Airlangga' }
    });
    await prisma.award.updateMany({
        where: { issuer: 'Kementrian Pendidikan dan Kebudayaan RI' },
        data: { issuer: 'Kementerian Pendidikan dan Kebudayaan RI' }
    });

    cache.del('talks');
    cache.del('portfolio:bootstrap');
    cache.del('portfolio_bootstrap');

    console.log('✓ Successfully updated database talks to English.');
    await prisma.$disconnect();
}

main().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
