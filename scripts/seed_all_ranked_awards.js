const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

async function seedAllAwards() {
    console.log('--- Upserting & Ranking All 16 Awards Chronologically (Year DESC) ---');

    const awardsList = [
        // 2025
        {
            title: 'Open The Gate Hack 2025',
            issuer: 'PT Bahana Security Sistem (BSS Parking)',
            metric_tag: '🥇 1st Place Winner',
            badge_text: '🥇 1st Place Winner',
            badge_color: 'gold',
            description: '',
            chips: ['1st Place Winner', 'Juara 1', 'Open The Gate Hack', 'BSS Parking', '2025'],
            image_url: '/assets/images/awards/award_img_3.jpg',
            sort_order: 1
        },
        {
            title: 'AI Hackathon Competition (TECHNOART 2025)',
            issuer: 'Universitas Bunda Mulia (UBM)',
            metric_tag: '🏆 Best Creativity Winner',
            badge_text: '🏆 Best Creativity Winner',
            badge_color: 'gold',
            description: '',
            chips: ['Best Creativity', 'TECHNOART 2025', 'AI Hackathon', 'UBM', '2025'],
            image_url: '/assets/images/awards/award_img_new_5.jpg',
            sort_order: 2
        },
        {
            title: 'AI Talent Hub Indonesia 2025',
            issuer: 'Universitas Indonesia X PT Pertamina (Persero)',
            metric_tag: 'Top 20 Finalist',
            badge_text: '🏅 Top 20 AI Talent Hub',
            badge_color: 'blue',
            description: '',
            chips: ['Top 20 Finalist', 'AI Talent Hub', 'Universitas Indonesia', 'Pertamina', '2025'],
            image_url: '/assets/images/awards/award_img_4.jpg',
            sort_order: 3
        },
        {
            title: 'Kompetisi Website Budaya Nusantara (aksarahub.id)',
            issuer: 'Media Cloud Indonesia X PANDI (.id)',
            metric_tag: 'Cultural Web Innovation',
            badge_text: '🌐 Cultural Innovation Award',
            badge_color: 'red',
            description: '',
            chips: ['Kompetisi Website Budaya', 'aksarahub.id', 'PANDI (.id)', '2025'],
            image_url: '/assets/images/awards/award_img_5.jpg',
            sort_order: 4
        },
        {
            title: 'Graduated Cumlaude (Highest Honors)',
            issuer: 'Hasanuddin University',
            metric_tag: 'GPA 3.97 / 4.00',
            badge_text: '🎓 GPA 3.97 / 4.00',
            badge_color: 'gold',
            description: '',
            chips: ['GPA 3.97 / 4.00', 'Cumlaude', 'Highest Honors', '2025'],
            image_url: null,
            sort_order: 5
        },

        // 2024
        {
            title: 'Makassar Hackathon 2024',
            issuer: 'Dispora Makassar X BINAR',
            metric_tag: '🥈 2nd Place Winner',
            badge_text: '🥈 2nd Place Winner',
            badge_color: 'gold',
            description: '',
            chips: ['2nd Place Winner', 'Makassar Hackathon', 'BINAR Academy', '2024'],
            image_url: '/assets/images/awards/award_img_2.jpg',
            sort_order: 6
        },

        // 2023
        {
            title: '6th International Cultural Program (ICP 2023)',
            issuer: 'International Office, Hasanuddin University',
            metric_tag: 'International Program Delegate',
            badge_text: '🌏 International Delegate',
            badge_color: 'blue',
            description: '',
            chips: ['International Program', 'ICP 2023', 'Hasanuddin University', '2023'],
            image_url: '/assets/images/awards/award_img_new_9.jpg',
            sort_order: 7
        },
        {
            title: 'Bank Indonesia Scholarship (GenBI)',
            issuer: 'Bank Indonesia',
            metric_tag: 'Academic Excellence',
            badge_text: '🏛️ Central Bank Award',
            badge_color: 'green',
            description: '',
            chips: ['GenBI', 'Bank Indonesia', 'Competitive Scholarship', '2023'],
            image_url: null,
            sort_order: 8
        },

        // 2022
        {
            title: 'BPJS Kesehatan Healthkathon 2022',
            issuer: 'BPJS Kesehatan',
            metric_tag: 'Top 10 Semifinalist (Machine Learning)',
            badge_text: '🏅 Top 10 ML Semifinalist',
            badge_color: 'purple',
            description: '',
            chips: ['Machine Learning', 'Healthkathon 2022', 'Top 10 National', 'BPJS Kesehatan', '2022'],
            image_url: '/assets/images/awards/award_img_1.jpg',
            sort_order: 9
        },
        {
            title: 'Most Outstanding Student (Academic Excellence — IPS)',
            issuer: 'Universitas Hasanuddin (FMIPA)',
            metric_tag: 'Mahasiswa Berprestasi (IPS)',
            badge_text: '🏆 Outstanding Student',
            badge_color: 'gold',
            description: '',
            chips: ['Mahasiswa Berprestasi', 'FMIPA UNHAS', 'Academic Excellence', '2022'],
            image_url: '/assets/images/awards/award_img_new_1.jpg',
            sort_order: 10
        },
        {
            title: 'GemasTIK XV 2022 (Programming Division)',
            issuer: 'Kemendikbudristek (Puspresnas / BPTI) X Universitas Brawijaya',
            metric_tag: 'Competitive Programming Participant',
            badge_text: '💻 National Programming Competitor',
            badge_color: 'blue',
            description: '',
            chips: ['Competitive Programming', 'GemasTIK XV', 'Kemendikbudristek', '2022'],
            image_url: '/assets/images/awards/award_img_new_7.jpg',
            sort_order: 11
        },
        {
            title: 'Statistics Team Competition (LOGIKA UI 2022)',
            issuer: 'FMIPA Universitas Indonesia X Iykra',
            metric_tag: 'National Statistics Competitor',
            badge_text: '📊 National Statistics Competitor',
            badge_color: 'blue',
            description: '',
            chips: ['Statistics Competition', 'LOGIKA UI 2022', 'Universitas Indonesia', '2022'],
            image_url: '/assets/images/awards/award_img_new_8.jpg',
            sort_order: 12
        },

        // 2021
        {
            title: 'National Essay Competition (Management Festival 2021)',
            issuer: 'HMPS-MBS IAIN Palopo',
            metric_tag: '🥇 1st Place Winner',
            badge_text: '🥇 1st Place Winner',
            badge_color: 'gold',
            description: '',
            chips: ['1st Place Winner', 'National Essay Competition', 'Digital Economy', '2021'],
            image_url: '/assets/images/awards/award_img_new_2.jpg',
            sort_order: 13
        },
        {
            title: 'Hasanuddin Mathematics Competition 2021',
            issuer: 'Departemen Matematika, Universitas Hasanuddin',
            metric_tag: 'Mathematics Competition Finalist',
            badge_text: '🎗️ Mathematics Finalist',
            badge_color: 'blue',
            description: '',
            chips: ['Finalist', 'Mathematics Competition', 'Universitas Hasanuddin', '2021'],
            image_url: '/assets/images/awards/award_img_new_6.jpg',
            sort_order: 14
        },

        // 2019
        {
            title: 'MEDSPIN 2019 (International Medical Science Olympiad)',
            issuer: 'Faculty of Medicine, Universitas Airlangga',
            metric_tag: 'Quarter Finalist of Olympiad',
            badge_text: '🎗️ Quarter Finalist',
            badge_color: 'blue',
            description: '',
            chips: ['MEDSPIN 2019', 'Universitas Airlangga', 'Quarter Finalist', '2019'],
            image_url: '/assets/images/awards/award_img_new_3.jpg',
            sort_order: 15
        },
        {
            title: 'Olimpiade Sains Nasional (OSN) 2019 in Chemistry',
            issuer: 'Kementerian Pendidikan dan Kebudayaan (Kemendikbud)',
            metric_tag: 'National Finalist in Chemistry',
            badge_text: '🇮🇩 OSN National Finalist',
            badge_color: 'blue',
            description: '',
            chips: ['OSN 2019', 'Chemistry Olympiad', 'National Finalist', 'Kemendikbud', '2019'],
            image_url: '/assets/images/awards/award_img_new_4.jpg',
            sort_order: 16
        }
    ];

    try {
        await prisma.award.deleteMany({});
        console.log('Cleared existing awards.');

        for (const aw of awardsList) {
            await prisma.award.create({
                data: aw
            });
            console.log(`Inserted [Rank ${aw.sort_order}]: ${aw.metric_tag} | ${aw.title}`);
        }

        cache.del('awards');
        cache.del('awards:all');
        cache.del('portfolio:bootstrap');
        console.log('--- Successfully seeded and ranked all 16 awards (Year DESC, No Description)! ---');
    } catch (e) {
        console.error('Error seeding awards:', e);
    } finally {
        await prisma.$disconnect();
    }
}

seedAllAwards();
