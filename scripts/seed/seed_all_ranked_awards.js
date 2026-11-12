const prisma = require('../../src/config/db');
const cache = require('../../src/utils/cache');

async function seedAllAwards() {
    console.log('--- Upserting & Ranking All 21 Awards Chronologically ---');

    const awardsList = [
    {
        "title": "Award for Innovation in the Nusantara Cultural Website Competition",
        "issuer": "Media Cloud Indonesia",
        "metric_tag": "Feb 2026",
        "badge_text": "Innovation Award",
        "badge_color": "blue",
        "description": "Recognized with the Innovation Award for creating an immersive cultural preservation digital platform celebrating Indonesian heritage with high-performance web architecture.",
        "chips": [
            "Innovation Award",
            "Cultural Preservation",
            "Media Cloud Indonesia",
            "Web Tech",
            "2026"
        ],
        "image_url": "/assets/images/awards/award_img_5.jpg",
        "sort_order": 1
    },
    {
        "title": "Top 20 AI Talent Hub Indonesia 2025",
        "issuer": "Universitas Indonesia x Pertamina",
        "metric_tag": "Sep 2025",
        "badge_text": "Top 20 Finalist",
        "badge_color": "purple",
        "description": "Selected as Top 20 National AI Talent out of hundreds of participants across Indonesia, demonstrating excellence in machine learning applications and industrial problem solving.",
        "chips": [
            "Top 20",
            "AI Talent Hub",
            "Universitas Indonesia",
            "Pertamina",
            "2025"
        ],
        "image_url": "/assets/images/awards/award_img_4.jpg",
        "sort_order": 2
    },
    {
        "title": "Award for Innovation in Developing Aksara Batak Website",
        "issuer": "Domain.id",
        "metric_tag": "Aug 2025",
        "badge_text": "Digital Innovation",
        "badge_color": "purple",
        "description": "Awarded for outstanding innovation in preserving traditional script through the Aksara Batak interactive platform featuring real-time transliteration and educational tools.",
        "chips": [
            "Innovation Award",
            "Aksara Batak",
            "Domain.id",
            "Digital Heritage",
            "2025"
        ],
        "image_url": "/assets/images/awards/award_aksara_batak.jpg",
        "sort_order": 3
    },
    {
        "title": "Best Creativity AI Hackathon TechnoArt 2025",
        "issuer": "Universitas Bunda Mulia",
        "metric_tag": "Aug 2025",
        "badge_text": "Best Creativity Winner",
        "badge_color": "purple",
        "description": "Won Best Creativity at TechnoArt 2025 for architecting a novel AI solution combining computer vision and generative modeling to tackle urban smart-city challenges.",
        "chips": [
            "Best Creativity",
            "AI Hackathon",
            "TechnoArt 2025",
            "UBM",
            "2025"
        ],
        "image_url": "/assets/images/awards/award_img_new_5.jpg",
        "sort_order": 4
    },
    {
        "title": "1st Place Winner of Open The Gate Hackathon 2025",
        "issuer": "BSS Parking",
        "metric_tag": "Jun 2025",
        "badge_text": "1st Place Winner",
        "badge_color": "purple",
        "description": "Grand Champion of Open The Gate Hackathon 2025. Engineered an automated intelligent parking enforcement system with sub-second license plate recognition (ALPR).",
        "chips": [
            "1st Place Champion",
            "Hackathon",
            "BSS Parking",
            "Computer Vision",
            "2025"
        ],
        "image_url": "/assets/images/awards/award_img_3.jpg",
        "sort_order": 5
    },
    {
        "title": "2nd Place Winner of Makassar Hackathon 2024",
        "issuer": "Dispora Makassar x Binar Academy",
        "metric_tag": "Jun 2024",
        "badge_text": "2nd Place Winner",
        "badge_color": "green",
        "description": "Secured 2nd place out of regional developer teams by developing a high-impact digital civic solution leveraging real-time data analytics and user-centric mobile tech.",
        "chips": [
            "2nd Place",
            "Makassar Hackathon",
            "Dispora Makassar",
            "Binar Academy",
            "2024"
        ],
        "image_url": "/assets/images/awards/award_img_2.jpg",
        "sort_order": 6
    },
    {
        "title": "Software Development Scholarship Awardee 2024",
        "issuer": "Power Learn Project",
        "metric_tag": "May 2024",
        "badge_text": "Scholarship Awardee",
        "badge_color": "green",
        "description": "Awarded a competitive software engineering scholarship by Power Learn Project for demonstrated leadership and technical capability in distributed systems and cloud engineering.",
        "chips": [
            "Scholarship",
            "Power Learn Project",
            "Software Engineering",
            "2024"
        ],
        "image_url": "/assets/images/awards/award_software_dev_scholarship_2024.jpg",
        "sort_order": 7
    },
    {
        "title": "International Cultural Program Awardee 2023",
        "issuer": "International Office Universitas Hasanuddin",
        "metric_tag": "Jun 2023",
        "badge_text": "International Awardee",
        "badge_color": "gold",
        "description": "Selected as representative awardee for the International Cultural Program 2023, collaborating across cross-border cultural exchange, global leadership, and academic dialogue.",
        "chips": [
            "ICP 2023",
            "Unhas International",
            "Global Leadership",
            "2023"
        ],
        "image_url": "/assets/images/awards/award_img_new_9.jpg",
        "sort_order": 8
    },
    {
        "title": "Finalist of Competitive Programming Competition Gemastik 2022",
        "issuer": "Pusat Prestasi Nasional Kemendikbudristek RI",
        "metric_tag": "Nov 2022",
        "badge_text": "National Finalist",
        "badge_color": "red",
        "description": "Reached the national grand finals in Competitive Programming at Gemastik XV, solving complex algorithmic challenges and advanced dynamic programming problems under time pressure.",
        "chips": [
            "Finalist",
            "Gemastik XV",
            "Puspresnas",
            "Kemendikbud",
            "Algorithms",
            "2022"
        ],
        "image_url": "/assets/images/awards/award_img_new_7.jpg",
        "sort_order": 9
    },
    {
        "title": "Semifinalist of Machine Learning Healthkathon BPJS Kesehatan 2022",
        "issuer": "BPJS Kesehatan",
        "metric_tag": "Oct 2022",
        "badge_text": "National Semifinalist",
        "badge_color": "red",
        "description": "Developed predictive machine learning models for national healthcare analytics, earning semifinalist recognition among hundreds of data science competitors nationwide.",
        "chips": [
            "Semifinalist",
            "Healthkathon",
            "BPJS Kesehatan",
            "Machine Learning",
            "2022"
        ],
        "image_url": "/assets/images/awards/award_img_1.jpg",
        "sort_order": 10
    },
    {
        "title": "The Most Outstanding Student of Information Systems Department 2022",
        "issuer": "Universitas Hasanuddin (Unhas)",
        "metric_tag": "Aug 2022",
        "badge_text": "Outstanding Student",
        "badge_color": "red",
        "description": "Awarded 1st Most Outstanding Student of the Department of Information Systems, Faculty of Mathematics and Natural Sciences, Universitas Hasanuddin.",
        "chips": [
            "Mapres 1",
            "Information Systems",
            "Unhas",
            "FMIPA",
            "Academic Excellence",
            "2022"
        ],
        "image_url": "/assets/images/awards/award_img_new_1.jpg",
        "sort_order": 11
    },
    {
        "title": "Bank Indonesia Scholarship Awardee 2022",
        "issuer": "Bank Indonesia",
        "metric_tag": "Jun 2022",
        "badge_text": "Prestigious Scholarship",
        "badge_color": "red",
        "description": "Selected as recipient of the prestigious Bank Indonesia Scholarship for academic distinction, organizational leadership, and community contribution.",
        "chips": [
            "Scholarship",
            "Bank Indonesia",
            "GenBI",
            "Leadership",
            "2022"
        ],
        "image_url": null,
        "sort_order": 12
    },
    {
        "title": "Participant of Statistics Team Competition (STC) Logika UI 2022",
        "issuer": "Universitas Indonesia",
        "metric_tag": "Jan 2022",
        "badge_text": "Competition Participant",
        "badge_color": "red",
        "description": "Represented Hasanuddin University in the Statistics Team Competition at Logika UI 2022, competing in high-level statistical analysis, inference, and modeling.",
        "chips": [
            "Statistics",
            "Logika UI 2022",
            "Universitas Indonesia",
            "STC",
            "2022"
        ],
        "image_url": "/assets/images/awards/award_img_new_8.jpg",
        "sort_order": 13
    },
    {
        "title": "1st Place of National Essay Management Festival 2021",
        "issuer": "IAIN Palopo",
        "metric_tag": "Dec 2021",
        "badge_text": "1st Place Winner",
        "badge_color": "cyan",
        "description": "Won 1st place in the National Essay Competition at Management Festival 2021, authoring a strategic analysis on digital transformation and innovative business modeling.",
        "chips": [
            "1st Place Winner",
            "National Essay",
            "IAIN Palopo",
            "Management Festival",
            "2021"
        ],
        "image_url": "/assets/images/awards/award_img_new_2.jpg",
        "sort_order": 14
    },
    {
        "title": "Finalist Hasanuddin Mathematics Competition 2021",
        "issuer": "Universitas Hasanuddin",
        "metric_tag": "Nov 2021",
        "badge_text": "Regional Finalist",
        "badge_color": "cyan",
        "description": "Ranked among top finalists in the Hasanuddin Mathematics Competition, demonstrating rigorous analytical thinking, calculus, and discrete mathematics proficiency.",
        "chips": [
            "Finalist",
            "HMC 2021",
            "Mathematics",
            "Unhas",
            "2021"
        ],
        "image_url": "/assets/images/awards/award_img_new_6.jpg",
        "sort_order": 15
    },
    {
        "title": "Quarter Finalist of Medical Science Olympic 2019",
        "issuer": "Fakultas Kedokteran Universitas Airlangga",
        "metric_tag": "Nov 2019",
        "badge_text": "National Quarter Finalist",
        "badge_color": "blue",
        "description": "Competed in the prestigious National Medical Science Olympic at Universitas Airlangga, advancing to the quarter finals through rigorous physiology, anatomy, and science testing.",
        "chips": [
            "Quarter Finalist",
            "Medical Science",
            "Unair",
            "Olympics",
            "2019"
        ],
        "image_url": "/assets/images/awards/award_img_new_3.jpg",
        "sort_order": 16
    },
    {
        "title": "Finalist of National Science Olympic 2019",
        "issuer": "Kementerian Pendidikan dan Kebudayaan RI",
        "metric_tag": "Jul 2019",
        "badge_text": "National Finalist (OSN)",
        "badge_color": "blue",
        "description": "Finalist at the prestigious National Science Olympiad (OSN) 2019 organized by Kemendikbud RI, competing among Indonesia's top young scientific talents.",
        "chips": [
            "OSN Finalist",
            "Olimpiade Sains Nasional",
            "Kemendikbud RI",
            "National",
            "2019"
        ],
        "image_url": "/assets/images/awards/award_img_new_4.jpg",
        "sort_order": 17
    },
    {
        "title": "Evaluation Team Assistant of Electronic-Based Public Service Assessment",
        "issuer": "Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (KemenPAN-RB)",
        "metric_tag": "Oct 2020",
        "badge_text": "Government Evaluation",
        "badge_color": "blue",
        "description": "Served as Evaluation Team Assistant in the Electronic-Based Public Service Assessment for Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (KemenPAN-RB).",
        "chips": [
            "KemenPAN-RB",
            "Public Service",
            "SPBE",
            "Science & Technology",
            "Government"
        ],
        "image_url": "/assets/certificates/cert-kemenpanrb-evaluation-assistant.jpg",
        "sort_order": 18
    },
    {
        "title": "Certificate of Completion: AIoT Engineering — PT XL Axiata Tbk",
        "issuer": "PT XL Axiata Tbk",
        "metric_tag": "Dec 2023",
        "badge_text": "Internship Completion",
        "badge_color": "yellow",
        "description": "Awarded for completing the Kampus Merdeka certified internship as an AIoT Engineer at PT XL Axiata Tbk (X-Camp), delivering production-grade computer vision models and real-time AIoT monitoring systems.",
        "chips": [
            "XL Axiata",
            "Kampus Merdeka",
            "AIoT Engineer",
            "X-Camp",
            "2023"
        ],
        "image_url": "/assets/certificates/cert-xl-axiata-internship-completion.webp",
        "sort_order": 19
    },
    {
        "title": "Sertifikat MSIB Batch 4: AI Software Engineer — Kemendikbudristek RI",
        "issuer": "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
        "metric_tag": "Jun 2023",
        "badge_text": "MSIB AI Engineer",
        "badge_color": "blue",
        "description": "Certified completion of MSIB Batch 4 at Secretariat of Directorate General of Higher Education, Research, and Technology (Kemendikbudristek) as an AI Engineer developing Blockchain, Metaverse, and Artificial Intelligence projects.",
        "chips": [
            "MSIB Batch 4",
            "AI Engineer",
            "Kemendikbudristek",
            "Diktiristek",
            "2023"
        ],
        "image_url": "/assets/certificates/cert-msib-kemendikbud-ai-engineer.webp",
        "sort_order": 20
    },
    {
        "title": "Academic Teaching Assistant: Basic Mathematics I — Universitas Hasanuddin",
        "issuer": "Departemen Matematika FMIPA Universitas Hasanuddin",
        "metric_tag": "Jan 2023",
        "badge_text": "Teaching Assistant",
        "badge_color": "purple",
        "description": "Certificate of Appreciation for contributing as Academic Teaching Assistant for Basic Mathematics I (Information Systems Class A) during Odd Semester 2022/2023 at Faculty of Mathematics and Natural Sciences, Unhas.",
        "chips": [
            "Teaching Assistant",
            "Mathematics",
            "FMIPA Unhas",
            "Academic Excellence",
            "2023"
        ],
        "image_url": "/assets/certificates/cert-teaching-assistant-matematika-unhas.webp",
        "sort_order": 21
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
        console.log('--- Successfully seeded and ranked all 21 awards! ---');
    } catch (e) {
        console.error('Error seeding awards:', e);
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    seedAllAwards();
}

module.exports = { seedAllAwards };
