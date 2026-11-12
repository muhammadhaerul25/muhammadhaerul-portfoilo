const prisma = require('../../src/config/db');

const items = [
  // ROW 0: Personal & Profile Portraits (Descending Date)
  {
    title: 'AI Engineer at XL Axiata',
    category: 'Personal Portraits',
    date: 'December 2023',
    location: 'XL Axiata Tower, Jakarta',
    description: 'Authentic workplace portrait of Muhammad Haerul on-site at XL Axiata headquarters during the 5G AIoT engineering program.',
    image_url: '/assets/images/muhammad-haerul-xl-axiata-office-portrait.webp',
    tags: ['Workplace Portrait', 'XL Axiata', 'Office', 'AI Engineer', 'Jakarta'],
    sort_order: 1
  },

  // ROW 1: Posters & Flyers (Descending Date)
  {
    title: 'Interactive Dialogue: Kita Indonesia — Upgrading Skills & Mindset',
    category: 'Posters & Flyers',
    date: 'October 2026',
    location: 'Studio RRI Pro 2 Mamuju (Live Broadcast 89.3 FM & YouTube)',
    description: 'Live Broadcast Poster · Exploring youth readiness, global challenges, and leadership mindset with PCMI Sulbar.',
    image_url: '/uploads/talks/talk-rri-mamuju-dialog-interaktif.jpg',
    tags: ['Flyer', 'Broadcast', 'RRI', 'Youth Mindset'],
    sort_order: 1
  },
  {
    title: 'Mindful AI: Personalization for Next-Gen Scholars',
    category: 'Posters & Flyers',
    date: 'August 2026',
    location: 'Yayasan Khouw Kalbe (Virtual)',
    description: 'Official Keynote Poster · Introducing Gemini Gems, custom context frameworks, and intelligent research assistants.',
    image_url: '/uploads/talks/saveclip_app_775154220_18087205625558486_2093555353223423387_n_1787290933586.webp',
    tags: ['Poster', 'Flyer', 'Mindful AI', 'Khouw Kalbe'],
    sort_order: 2
  },
  {
    title: 'GSA AI Forge: AI for Personal Branding & Digital Portfolio',
    category: 'Posters & Flyers',
    date: 'July 2026',
    location: 'Makassar Government Center (MGC)',
    description: 'Event Flyer · Interactive workshop guiding 150+ participants on leveraging Google Gemini and AI workflows.',
    image_url: '/uploads/talks/saveclip_app_752916423_18047968217611708_109289192688503691_n_1787293047380.webp',
    tags: ['Flyer', 'Poster', 'GSA', 'Google Student Ambassador'],
    sort_order: 3
  },
  {
    title: 'Build with AI: AI-Driven Development Keynote',
    category: 'Posters & Flyers',
    date: 'May 2026',
    location: 'Universitas Ciputra Makassar',
    description: 'Official Keynote Poster · Highlighting generative AI, prompt engineering, vibe coding, and autonomous agents.',
    image_url: '/uploads/talks/saveclip_app_671241768_18351262810240133_2482393838735247827_n_1787292713669.webp',
    tags: ['Poster', 'Keynote', 'GDG', 'Build with AI'],
    sort_order: 4
  },
  {
    title: 'National Cybersecurity & AI Awareness Forum',
    category: 'Posters & Flyers',
    date: 'July 2025',
    location: 'Badan Siber dan Sandi Negara (BSSN)',
    description: 'National Webinar Flyer · Sharing insights on generative AI threats, defenses, and automated cyber monitoring.',
    image_url: '/uploads/talks/whatsapp_image_2026_08_21_at_14_20_26_1787293332557.webp',
    tags: ['Flyer', 'Cybersecurity', 'BSSN', 'AI Defense'],
    sort_order: 5
  },

  // ROW 2: Certificates & Awards (Descending Date)
  {
    title: 'EnglishScore International Core Skills — British Council (CEFR C1)',
    category: 'Certificates & Awards',
    date: 'September 2026',
    location: 'British Council',
    description: 'International English proficiency certification with CEFR C1 Professional Working Level (Score: 531).',
    image_url: '/assets/certificates/cert-englishscore-british-council-page1.jpg?v=2',
    tags: ['Certification', 'EnglishScore', 'British Council', 'CEFR C1'],
    sort_order: 10
  },
  {
    title: 'Speaker Certificate of Appreciation: Mindful AI — Yayasan Khouw Kalbe',
    category: 'Certificates & Awards',
    date: 'August 2026',
    location: 'Yayasan Khouw Kalbe',
    description: 'Speaker Certificate awarded for presenting the Mindful AI session to Indonesian scholars and researchers.',
    image_url: '/assets/images/talks_cert_yayasan_khouw_kalbe_mindful_ai.jpg',
    tags: ['Certificate', 'Speaker', 'Yayasan Khouw Kalbe', 'Mindful AI'],
    sort_order: 11
  },
  {
    title: 'Speaker Certificate: Build with AI — GDG On Campus',
    category: 'Certificates & Awards',
    date: 'May 2026',
    location: 'Google Developer Groups On Campus',
    description: 'Official Speaker Certificate for delivering the keynote on AI-Driven Development and autonomous agent architectures.',
    image_url: '/assets/certificates/cert-gdg-build-with-ai.jpg',
    tags: ['Certificate', 'Speaker', 'GDG', 'Build with AI'],
    sort_order: 12
  },
  {
    title: 'Innovation Award: Nusantara Cultural Preservation Digital Platform',
    category: 'Certificates & Awards',
    date: 'February 2026',
    location: 'Media Cloud Indonesia',
    description: 'National Innovation Award for creating an immersive cultural preservation digital platform with high-performance architecture.',
    image_url: '/assets/images/awards/award_img_5.jpg',
    tags: ['Award', 'Innovation', 'Nusantara', 'Cultural Tech'],
    sort_order: 13
  },
  {
    title: 'Speaker Certificate: AI Web Engineering & Security — Unsulbar',
    category: 'Certificates & Awards',
    date: 'December 2025',
    location: 'Universitas Sulawesi Barat',
    description: 'Speaker & Expert Trainer Certificate for leading the hands-on engineering workshop on full-stack web architectures.',
    image_url: '/assets/certificates/cert-unsulbar-web-ai.jpg',
    tags: ['Certificate', 'Speaker', 'Unsulbar', 'Web AI'],
    sort_order: 14
  },
  {
    title: 'Certificate of Appreciation: National Cybersecurity Forum — BSSN',
    category: 'Certificates & Awards',
    date: 'July 2025',
    location: 'Badan Siber dan Sandi Negara (BSSN)',
    description: 'Speaker Certificate of Appreciation for insights on generative AI cybersecurity posture and registration authority.',
    image_url: '/assets/certificates/cert-bssn-cybersecurity.jpg',
    tags: ['Certificate', 'Speaker', 'BSSN', 'Cybersecurity'],
    sort_order: 15
  },
  {
    title: 'Associate Data Scientist — Kominfo DTS & BNSP',
    category: 'Certificates & Awards',
    date: 'October 2024',
    location: 'Kementerian Komunikasi dan Informatika (Kominfo)',
    description: 'National competency certification in data science, predictive modeling, statistical learning, and analytics.',
    image_url: '/assets/certificates/cert-associate-data-scientist-dts-page1.jpg',
    tags: ['Certification', 'Data Science', 'Kominfo', 'BNSP'],
    sort_order: 16
  },
  {
    title: 'Most Outstanding Student (Mawapres) — Universitas Hasanuddin',
    category: 'Certificates & Awards',
    date: '2024',
    location: 'Universitas Hasanuddin',
    description: 'Ranked 1st Most Outstanding Student (Mawapres) for exemplary academic excellence, AI research, and technology leadership.',
    image_url: '/assets/certificates/cert-outstanding-student-unhas-page2.jpg',
    tags: ['Award', 'Mawapres', 'Unhas', 'Honors'],
    sort_order: 17
  },
  {
    title: 'Machine Learning Specialization — DeepLearning.AI & Stanford',
    category: 'Certificates & Awards',
    date: '2024',
    location: 'DeepLearning.AI & Stanford Online',
    description: 'Rigorous specialization covering Supervised Machine Learning, Neural Networks, and Unsupervised Learning by Andrew Ng.',
    image_url: '/assets/certificates/cert-deeplearningai-ml-specialization.jpg',
    tags: ['Certification', 'Machine Learning', 'DeepLearning.AI', 'Stanford'],
    sort_order: 18
  },
  {
    title: 'Aksara Batak Digital Heritage Preservation Award',
    category: 'Certificates & Awards',
    date: '2024',
    location: 'Cultural Heritage Competition',
    description: 'Recognized for excellence in preserving Indonesian indigenous script using computer vision and interactive digital web technology.',
    image_url: '/assets/images/awards/award_aksara_batak.jpg',
    tags: ['Award', 'Heritage', 'Aksara Batak'],
    sort_order: 19
  },
  {
    title: 'Software Engineering Scholarship Awardee',
    category: 'Certificates & Awards',
    date: '2024',
    location: 'Tech Talent Scholarship Program',
    description: 'Awarded prestigious scholarship for demonstrated excellence in full-stack software development and intelligent web systems.',
    image_url: '/assets/images/awards/award_software_dev_scholarship_2024.jpg',
    tags: ['Award', 'Scholarship', 'Software Engineering'],
    sort_order: 20
  },
  {
    title: 'Google IT Support Professional Certificate',
    category: 'Certificates & Awards',
    date: '2024',
    location: 'Google Career Certificates',
    description: 'Professional credential validating skills in computer networking, systems administration, and IT security.',
    image_url: '/assets/certificates/cert-google-it-support.jpg',
    tags: ['Certification', 'Google', 'IT Support'],
    sort_order: 21
  },

  // ROW 3: Activity Documentation (Descending Date)
  {
    title: 'GSA AI Forge: Hands-on AI Prompting & Portfolio Architecture Workshop',
    category: 'Activity Documentation',
    date: 'July 2026',
    location: 'Makassar Government Center (MGC)',
    description: 'Live stage moment: Muhammad Haerul presenting modern AI prompt architectures and automated portfolio development.',
    image_url: '/assets/images/gsa-ai-forge-doc-1.jpg',
    tags: ['Documentation', 'Live Moment', 'GSA AI Forge', 'MGC'],
    sort_order: 30
  },
  {
    title: 'GSA AI Forge: Direct Participant Mentorship & Real-time Code Review',
    category: 'Activity Documentation',
    date: 'July 2026',
    location: 'Makassar Government Center (MGC)',
    description: 'Hands-on mentorship session: Muhammad Haerul reviewing code and providing 1-on-1 AI engineering guidance to participants.',
    image_url: '/assets/images/gsa-ai-forge-doc-2.jpg',
    tags: ['Documentation', 'Mentorship', 'Real Photo', 'GSA'],
    sort_order: 31
  },
  {
    title: 'GSA AI Forge: Full Cohort Celebration with 150+ Attendees & Organizers',
    category: 'Activity Documentation',
    date: 'July 2026',
    location: 'Makassar Government Center (MGC)',
    description: 'Full cohort celebration photo with all 150+ attendees, mentors, and community organizers at the close of GSA AI Forge.',
    image_url: '/assets/images/gsa-ai-forge-doc-3.jpg',
    tags: ['Documentation', 'Group Photo', 'Cohort', 'GSA'],
    sort_order: 32
  },
  {
    title: 'AI Web Engineering & Security Hands-on Workshop with 50+ Participants & Faculty',
    category: 'Activity Documentation',
    date: 'December 2025',
    location: 'Hotel Villa Bogor, Majene · Universitas Sulawesi Barat',
    description: 'Authentic workshop documentation: Muhammad Haerul leading 50+ faculty and students in full-stack web and security engineering.',
    image_url: '/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp',
    tags: ['Documentation', 'Real Photo', 'Workshop', 'Unsulbar'],
    sort_order: 33
  },
  {
    title: '1st Place Winner: Open The Gate Hackathon 2025 — BSS Parking',
    category: 'Activity Documentation',
    date: 'June 2025',
    location: 'PT Bahana Security Sistem (BSS Parking), Jakarta',
    description: 'Stage & team documentation: Muhammad Haerul and Galaxy Developer team winning 1st Place at Open The Gate Hackathon 2025.',
    image_url: '/assets/images/open-the-gate-hackathon-champion-photo.webp',
    tags: ['Documentation', 'Real Photo', 'Hackathon', 'Champion', 'BSS Parking'],
    sort_order: 34
  },
  {
    title: '5G AIoT Engineering & Edge Computer Vision Lab — XL Axiata',
    category: 'Activity Documentation',
    date: 'December 2023',
    location: 'XL Axiata Tower, Jakarta · X-Camp',
    description: 'Authentic engineering documentation: Muhammad Haerul developing edge computer vision models and AIoT monitoring systems at XL Axiata X-Camp.',
    image_url: '/assets/images/xl-axiata-aiot-documentation.webp',
    tags: ['Documentation', 'Real Photo', 'AIoT', 'XL Axiata'],
    sort_order: 35
  }
];

async function seed() {
  await prisma.galleryItem.deleteMany({});
  for (const item of items) {
    await prisma.galleryItem.create({ data: item });
  }
  const count = await prisma.galleryItem.count();
  console.log('Seeded gallery items in DB:', count);
}

if (require.main === module) {
  seed().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}

module.exports = { seed, items };
