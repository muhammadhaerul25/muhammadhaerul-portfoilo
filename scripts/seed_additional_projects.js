const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

async function seedNewProjects() {
  console.log('--- Adding 7 new projects to database ---');

  const newProjects = [
    {
      name: 'Dashboard - MSIB 4 2023 Distribution 📊',
      description: 'Explore the trends and data intricacies in the MSIB 4 distribution of 2023 through this comprehensive Tableau Public dashboard.',
      dateRange: '2023-08_2023-08',
      techStack: ['Data Analytics:Tableau', 'Data Visualization:Tableau Public'],
      linkProject: 'https://public.tableau.com/app/profile/muhammad.haerul',
      videoDemo: null,
      thumbnailUrl: null
    },
    {
      name: 'Analytics - Semantic Analysis TikTok User Comments Against IKN',
      description: 'The relocation of the Indonesian capital city from Jakarta to North Penajam Paser and Kutai Kartanegara attracted nationwide public attention. This project analyzes the sentiments of TikTok users regarding the capital relocation by implementing machine learning and Natural Language Processing (NLP) models to classify comments into positive and negative sentiments, providing data-driven public opinion insights.',
      dateRange: '2023-06_2023-06',
      techStack: ['AI:Natural Language Processing (NLP)', 'Data Science:Data Preparation', 'Machine Learning:Python'],
      linkProject: null,
      videoDemo: null,
      thumbnailUrl: null
    },
    {
      name: 'Dashboard - Anime Recommendation',
      description: 'Interactive data visualization and recommendation dashboard exploring anime popularity, user ratings, and genre distributions across international fanbases.',
      dateRange: '2022-11_2022-11',
      techStack: ['Data Analytics:Tableau', 'Data Visualization:Tableau Public'],
      linkProject: 'https://public.tableau.com/app/profile/muhammad.haerul',
      videoDemo: null,
      thumbnailUrl: null
    },
    {
      name: 'Dashboard - USA Cybertrend Superstore',
      description: 'Comprehensive business intelligence and sales analytics dashboard tracking retail sales performance, regional profitability, customer segmentation, and product category trends.',
      dateRange: '2022-11_2022-11',
      techStack: ['Data Analytics:Tableau', 'Business Intelligence:Analytics', 'Data Visualization:Tableau Public'],
      linkProject: 'https://public.tableau.com/app/profile/muhammad.haerul',
      videoDemo: null,
      thumbnailUrl: null
    },
    {
      name: 'App - HiPets',
      description: 'A mobile-based platform designed to connect prospective pet adopters with animal rescue shelters and pet owners. Built with Android Studio (Java/Kotlin) and Firebase for real-time adoption listings, category filtering, and direct messaging. Developed in collaboration with Universitas Hasanuddin.',
      dateRange: '2022-05_2022-06',
      techStack: ['Mobile:Android Studio', 'Cloud:Firebase', 'Mobile:Java'],
      linkProject: 'https://github.com/muhammadhaerul25',
      videoDemo: null,
      thumbnailUrl: null
    },
    {
      name: 'App - NewsBlog',
      description: 'Full-stack content management and news publishing web application featuring complete CRUD operations, article filtering, category tags, and live search. Built with Flask, MongoDB, and modern JavaScript. Developed in collaboration with Universitas Hasanuddin.',
      dateRange: '2022-04_2022-04',
      techStack: ['Backend:Python Flask', 'Database:MongoDB', 'Frontend:HTML/CSS/JavaScript'],
      linkProject: 'https://github.com/muhammadhaerul25',
      videoDemo: null,
      thumbnailUrl: null
    },
    {
      name: 'App - FruitsList',
      description: 'Interactive DOM-based front-end web application for dynamic fruit inventory management, real-time item filtering, and responsive state manipulation using Vanilla JavaScript.',
      dateRange: '2021-10_2021-10',
      techStack: ['Frontend:JavaScript (DOM)', 'Frontend:HTML5', 'Frontend:CSS3'],
      linkProject: 'https://github.com/muhammadhaerul25',
      videoDemo: null,
      thumbnailUrl: null
    }
  ];

  for (const p of newProjects) {
    const existing = await prisma.project.findFirst({
      where: { name: p.name }
    });

    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data: p
      });
      console.log(`Updated existing project: ${p.name}`);
    } else {
      await prisma.project.create({
        data: p
      });
      console.log(`Created new project: ${p.name}`);
    }
  }

  const allProjects = await prisma.project.findMany();
  console.log(`\nTotal projects in database now: ${allProjects.length}`);

  cache.del();
  console.log('✓ Cache cleared successfully.');
}

seedNewProjects()
  .then(() => {
    console.log('Done!');
    setTimeout(() => process.exit(0), 100);
  })
  .catch(err => {
    console.error('Error seeding projects:', err);
    process.exit(1);
  });
