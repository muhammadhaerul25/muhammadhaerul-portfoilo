const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

async function updatePortfolioContent() {
  console.log('--- Updating Experience records ---');

  // 1. AksaraHub Nusantara
  const aksara = await prisma.experience.updateMany({
    where: { company: { contains: 'AksaraHub', mode: 'insensitive' } },
    data: {
      description: `Leading AI architecture, product development, and data analytics for AksaraHub.id — Indonesia's premier cultural-tech initiative dedicated to the digital preservation and revitalization of regional scripts and languages (Bugis, Makassar, Mandar, and Toraja). Architecting end-to-end computer vision and deep learning OCR pipelines for real-time handwritten script recognition, neural machine translation, and interactive digital canvas tools. Directing product strategy, cross-functional engineering, and learning analytics to make cultural heritage education interactive, accessible, and scalable across web and mobile platforms.`
    }
  });
  console.log('✓ Updated AksaraHub description, count:', aksara.count);

  // 2. RevoU
  const revou = await prisma.experience.updateMany({
    where: { company: { contains: 'RevoU', mode: 'insensitive' } },
    data: {
      description: `Mentoring and upskilling hundreds of professionals and university students across foundational through advanced AI domains — specializing in AI fundamentals, prompt and context engineering, agentic workflows, and production Generative AI applications. Designed and delivered tailored enterprise and public curricula for government bodies, corporate leaders, and academic institutions, empowering learners to effectively operationalize AI tools and modern LLM paradigms.`
    }
  });
  console.log('✓ Updated RevoU description, count:', revou.count);

  // 3. Ministry of Education
  const kemendikbudDesc = `I was part of Artificial Intelligence RnD Project focusing on Developing Education Technology.

Projects:
1. Developed Personalized English Learning App: Conducted a comprehensive literature review of 5+ educational AI research papers to investigate LLM pedagogical applications, designed core system architectures for AI-assisted education (including automatic grading and adaptive lesson planning), and engineered an interactive web application leveraging OpenAI's ChatGPT to deliver tailored, personalized English language learning experiences for students.`;

  const kemendikbud = await prisma.experience.updateMany({
    where: {
      OR: [
        { company: { contains: 'Ministry of Education', mode: 'insensitive' } },
        { company: { contains: 'Kementerian Pendidikan', mode: 'insensitive' } }
      ]
    },
    data: {
      role: 'AI Software Engineer',
      work_type: 'On-site',
      location: 'Jakarta',
      start_date: 'Feb 2023',
      end_date: 'Jun 2023',
      description: kemendikbudDesc
    }
  });
  console.log('✓ Updated Ministry of Education description, count:', kemendikbud.count);

  // 3b. Standardize Project Descriptions & Titles for Clean Read More / Read Less UX
  const projectUpdates = [
    {
      match: 'Eatitude.id',
      name: 'Eatitude.id',
      description: `Eatitude.id is an AI-powered personal nutrition and healthy eating companion platform designed in collaboration with certified nutritionists to make balanced daily nutrition practical, personalized, and sustainable.\n\n- Personalized Nutrition Planner – Generates daily meal and macro plans tailored to each user's health profile, goals, and dietary preferences.\n- Nutri Scanner – Uses computer vision to scan meals and nutrition labels for instant calorie and macronutrient estimation.\n- Smart Reminders & Progress Tracking – Tracks daily intake, hydration, and goal progression with direct nutritionist consultation.`
    },
    {
      match: 'AI Split Bills',
      name: 'AI Split Bills',
      description: `AI Split Bills is a full-stack web application that automates receipt parsing and group expense splitting using multimodal AI OCR. Built with React, FastAPI, PostgreSQL, and Google Gemini, it eliminates manual item entry by extracting line items, quantities, taxes, and service charges directly from receipt photos and calculating proportional shares for each participant.`
    },
    {
      match: 'AI Update Hub',
      name: 'AI Update Hub',
      description: `AI Update Hub is a full-stack intelligence aggregation web platform engineered to track, categorize, and summarize real-time developments across the global artificial intelligence ecosystem. It consolidates research breakthroughs, model releases, and industry news from multiple sources into a unified, searchable interface with automated topic tagging.`
    },
    {
      match: 'DengarTulis',
      name: 'DengarTulis App (AI-Powered Transcription)',
      description: `DengarTulis is an end-to-end audio and video intelligence web application that transforms spoken recordings into high-accuracy transcripts and structured AI summaries. Powered by React, FastAPI, and OpenAI Whisper, it streamlines meeting documentation, lecture note-taking, and media indexing in a single workflow.`
    },
    {
      match: 'Galaxy Aksara',
      name: 'Galaxy Aksara',
      description: `Galaxy Aksara is an interactive cultural-technology platform designed to preserve and teach Indonesian regional scripts (aksara nusantara) through modern web experiences. It combines guided lessons, digital script writing canvases, bidirectional script transliteration, and curated cultural literature in one cohesive learning environment.`
    },
    {
      match: 'Galaxy ALPR',
      name: 'Galaxy ALPR (Automatic License Plate Recognition)',
      description: `Galaxy ALPR is a real-time automatic license plate recognition and vehicle analytics system powered by YOLO object detection and Gemini Vision OCR. It detects vehicles from camera streams, localizes license plates under varying lighting conditions, extracts alphanumeric plate characters, and logs structured vehicle metadata for smart access control.`
    },
    {
      match: 'PPE Inspector',
      name: 'PPE Inspector',
      description: `PPE Inspector is a computer vision safety compliance system engineered to detect Personal Protective Equipment (PPE) usage among industrial workers in real time.\n\n- Trained a custom YOLOv8 object detection pipeline on a curated dataset of 10,000+ industrial images.\n- Achieved 88% mAP detection accuracy across helmets, vests, and protective gear.\n- Deployed on Streamlit Cloud with interactive image and video inference controls.`
    },
    {
      match: 'MSIB 4 2023',
      name: 'Dashboard - MSIB 4 2023 Distribution',
      description: `Interactive business intelligence dashboard built in Tableau Public to analyze nationwide participant distribution, university representation, partner company allocations, and program trends across the Kampus Merdeka MSIB Batch 4 (2023) initiative, enabling clear visual exploration of national talent mobility.`
    },
    {
      match: 'FruitsList',
      name: 'App - FruitsList',
      description: `Interactive DOM-based front-end web application engineered for dynamic inventory management, real-time search filtering, category sorting, and responsive state manipulation using modular Vanilla JavaScript, HTML5, and modern CSS3 layout patterns.`
    },
    {
      match: 'Anime Recommendation',
      name: 'Dashboard - Anime Recommendation',
      description: `Interactive data visualization and recommendation analytics dashboard built on Tableau Public, exploring anime popularity indices, audience rating distributions, studio output, and multi-genre correlations across global viewer datasets.`
    },
    {
      match: 'Cybertrend Superstore',
      name: 'Dashboard - USA Cybertrend Superstore',
      description: `Comprehensive business intelligence and retail analytics dashboard built in Tableau to monitor sales performance, regional profitability margins, customer segment behavior, and product category growth trends across US retail operations.`
    }
  ];

  for (const pu of projectUpdates) {
    await prisma.project.updateMany({
      where: { name: { contains: pu.match, mode: 'insensitive' } },
      data: { name: pu.name, description: pu.description }
    });
  }
  console.log('✓ Standardized project descriptions');

  // 4. Update Profile in site_settings
  console.log('\n--- Updating Profile in site_settings ---');
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'portfolio_content' }
  });

  if (setting && setting.value) {
    const val = typeof setting.value === 'string' ? JSON.parse(setting.value) : JSON.parse(JSON.stringify(setting.value));
    
    if (val.profile) {
      const p1 = `My work sits at the intersection of AI engineering, applied research, product development, and digital skills development. I architect and engineer end-to-end AI solutions — spanning data pipelines, computer vision, NLP, and agentic LLM systems to robust production deployment — while exploring emerging research to make AI dependable, accessible, and high-impact. Beyond engineering, I empower professionals, students, and organizations to master modern AI through intensive training, mentorship, and applied learning.`;
      const p2 = `I enjoy bridging the gap between cutting-edge AI research and real-world execution, translating breakthrough models into scalable products that solve concrete operational challenges. My cross-disciplinary experience spans high-growth tech industry, public-sector digital transformation, and nation-wide AI education initiatives, with a relentless focus on reliable software design and ethical, human-centered technology.`;
      const p3 = `My mission is to build, research, and teach AI solutions that create compounding real-world value — shipping intelligent systems and dependable software architectures that make artificial intelligence truly practical, performant, and empowering for people, businesses, and society.`;

      val.profile.storyParagraph1 = p1;
      val.profile.storyParagraph2 = p2;
      val.profile.storyParagraph3 = p3;
      val.profile.storyParagraphs = [p1, p2, p3];

      await prisma.siteSetting.update({
        where: { key: 'portfolio_content' },
        data: { value: val }
      });
      console.log('✓ Updated portfolio_content profile story paragraphs in site_settings');
    }
  }

  // Clear in-memory cache
  cache.del();
  console.log('✓ Cleared cache');
}

updatePortfolioContent()
  .then(() => {
    console.log('All database updates completed successfully!');
    setTimeout(() => process.exit(0), 100);
  })
  .catch(err => {
    console.error('Error updating:', err);
    process.exit(1);
  });
