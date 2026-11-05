const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../public/index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Title & Meta Tags
const oldHeadBlockStart = `<title>Muhammad Haerul — AI Full-Stack Specialist (Engineer, Researcher, and Trainer)</title>`;
const newHeadBlock = `<title>Muhammad Haerul — AI Full-Stack Specialist, Engineer, Researcher & Trainer</title>
  <meta name="description"
    content="Official portfolio of Muhammad Haerul, S.Kom — AI Full-Stack Specialist, Engineer, Researcher, and Trainer graduated Cum Laude (GPA 3.97) from Hasanuddin University. Discover AI projects, research publications, demo videos, keynote talks, and verified credentials.">
  <meta name="keywords"
    content="Muhammad Haerul, foto Muhammad Haerul, Muhammad Haerul foto, Muhammad Haerul video, Muhammad Haerul AI, Muhammad Haerul S.Kom, Muhammad Haerul Unhas, Muhammad Haerul Makassar, AI Full-Stack Specialist, AI Engineer Indonesia, Co-Founder Aksarahub, RevoU AI Lead, Computer Vision, Generative AI, LLM Systems, Hasanuddin University, Machine Learning, Deep Learning, MLOps, Data Science">
  <meta name="author" content="Muhammad Haerul">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://muhammadhaerul.tech/">
  <link rel="alternate" type="text/plain" href="https://muhammadhaerul.tech/llms.txt" title="LLM Machine-Readable Context (GEO)">
  <meta name="google-site-verification" content="5Kf50ttCSIx5eebyWYq10syR7j4vxpMs1b9OjgtJJHg">

  <!-- Open Graph / Facebook / WhatsApp (Rich Entity & Media Preview) -->
  <meta property="og:type" content="profile">
  <meta property="og:url" content="https://muhammadhaerul.tech/">
  <meta property="og:site_name" content="Muhammad Haerul — Digital Portfolio">
  <meta property="og:title" content="Muhammad Haerul — AI Full-Stack Specialist, Engineer, Researcher & Trainer">
  <meta property="og:description"
    content="Official portfolio of Muhammad Haerul, S.Kom — AI Full-Stack Specialist, Engineer, Researcher, and Trainer. Applied AI, Computer Vision, Generative AI, LLMs, and Tech Mentorship.">
  <meta property="og:image" content="https://muhammadhaerul.tech/assets/profile.png">
  <meta property="og:image:secure_url" content="https://muhammadhaerul.tech/assets/profile.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="1200">
  <meta property="og:image:alt"
    content="Muhammad Haerul — AI Full-Stack Specialist Official Studio Portrait">

  <meta property="og:image" content="https://muhammadhaerul.tech/assets/images/muhammad-haerul-portrait-formal.webp">
  <meta property="og:image:alt" content="Muhammad Haerul, S.Kom — Official Formal Portrait in Suit">

  <meta property="og:image" content="https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-build-with-ai.webp">
  <meta property="og:image:alt" content="Muhammad Haerul — Keynote Speaker at Build with AI Conference">

  <meta property="og:image" content="https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai.webp">
  <meta property="og:image:alt" content="Muhammad Haerul — Keynote Speaker at Mindful AI Forum">

  <meta property="profile:first_name" content="Muhammad">
  <meta property="profile:last_name" content="Haerul">
  <meta property="profile:username" content="muhammadhaerul25">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://muhammadhaerul.tech/">
  <meta name="twitter:title" content="Muhammad Haerul — AI Full-Stack Specialist, Engineer, Researcher & Trainer">
  <meta name="twitter:description"
    content="Official portfolio of Muhammad Haerul, S.Kom — AI Full-Stack Specialist (Engineer, Researcher, and Trainer). Applied AI, Computer Vision, Generative AI, and Tech Mentorship.">
  <meta name="twitter:image" content="https://muhammadhaerul.tech/assets/profile.png">
  <meta name="twitter:image:alt"
    content="Muhammad Haerul — AI Full-Stack Specialist Official Portrait">`;

// Find where old schema script starts
const oldSchemaRegex = /<title>Muhammad Haerul[\s\S]*?<\/script>\s*(?=<link rel="icon")/i;

const fullJsonLdSchema = `<!-- Schema.org JSON-LD Structured Data with Deep Entity, Video, and Image Graph for Google & Generative AI (GEO) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://muhammadhaerul.tech/#person",
        "name": "Muhammad Haerul",
        "givenName": "Muhammad",
        "familyName": "Haerul",
        "additionalName": "Haerul",
        "alternateName": [
          "Muhammad Haerul, S.Kom",
          "Haerul Muhammad",
          "Haerul",
          "M. Haerul",
          "Muhammad Haerul AI",
          "Muhammad Haerul Unhas",
          "Muhammad Haerul Makassar",
          "Muhammad Haerul Aksarahub"
        ],
        "gender": "https://schema.org/Male",
        "jobTitle": "AI Full-Stack Specialist, Engineer, Researcher & Trainer",
        "description": "Muhammad Haerul, S.Kom is an Indonesian AI Full-Stack Specialist, Machine Learning Engineer, Researcher, and Technology Trainer graduated with Highest Honors (GPA 3.97 Cum Laude) from Hasanuddin University as the Most Outstanding Student.",
        "url": "https://muhammadhaerul.tech/",
        "email": "mailto:muhammadhaerul25@gmail.com",
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Hasanuddin University",
          "alternateName": "Universitas Hasanuddin",
          "url": "https://unhas.ac.id",
          "sameAs": "https://id.wikipedia.org/wiki/Universitas_Hasanuddin"
        },
        "award": [
          "Most Outstanding Student (Mahasiswa Berprestasi) of Universitas Hasanuddin",
          "1st Place National Level at DEXLLM AI Innovation",
          "Best Graduate of Faculty of Mathematics and Natural Sciences (FMIPA Unhas)",
          "Google Student Ambassador (GSA)"
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "Large Language Models (LLMs)",
          "Retrieval-Augmented Generation (RAG)",
          "AI Agents",
          "Optical Character Recognition (OCR)",
          "Automatic License Plate Recognition (ALPR)",
          "MLOps in Production",
          "Python",
          "PyTorch",
          "FastAPI",
          "PostgreSQL",
          "Prisma ORM",
          "Full-Stack Web Engineering"
        ],
        "sameAs": [
          "https://www.linkedin.com/in/muhammadhaerul",
          "https://github.com/muhammadhaerul25",
          "https://www.instagram.com/muhammadhaerul.25/",
          "https://medium.com/@muhammadhaerul.25",
          "https://pypi.org/project/galaxy-object-detection-core/",
          "https://repository.unhas.ac.id/id/eprint/44411/",
          "https://public.tableau.com/app/profile/muhammad.haerul"
        ],
        "image": [
          "https://muhammadhaerul.tech/assets/profile.webp",
          "https://muhammadhaerul.tech/assets/profile-highres.png",
          "https://muhammadhaerul.tech/assets/profile.png",
          "https://muhammadhaerul.tech/profile.webp",
          "https://muhammadhaerul.tech/assets/images/muhammad-haerul-portrait-formal.webp",
          "https://muhammadhaerul.tech/assets/images/muhammad_haerul_avatar_square.webp",
          "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-build-with-ai.webp",
          "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp",
          "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai.webp",
          "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai-hd.jpg",
          "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-bssn-cybersecurity.webp",
          "https://muhammadhaerul.tech/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://muhammadhaerul.tech/#website",
        "url": "https://muhammadhaerul.tech/",
        "name": "Muhammad Haerul — Official Portfolio & Digital Footprint",
        "description": "Official website and digital portfolio of Muhammad Haerul — AI Full-Stack Specialist, Engineer, Researcher, and Trainer.",
        "publisher": {
          "@id": "https://muhammadhaerul.tech/#person"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://muhammadhaerul.tech/#webpage",
        "url": "https://muhammadhaerul.tech/",
        "name": "Muhammad Haerul — AI Full-Stack Specialist, Engineer, Researcher & Trainer",
        "isPartOf": {
          "@id": "https://muhammadhaerul.tech/#website"
        },
        "mainEntity": {
          "@id": "https://muhammadhaerul.tech/#person"
        },
        "primaryImageOfPage": {
          "@id": "https://muhammadhaerul.tech/#portrait-photo"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://muhammadhaerul.tech/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://muhammadhaerul.tech/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": "https://muhammadhaerul.tech/projects"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Talks",
            "item": "https://muhammadhaerul.tech/talks"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Certifications",
            "item": "https://muhammadhaerul.tech/certifications"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Publications",
            "item": "https://muhammadhaerul.tech/publications"
          }
        ]
      },

      <!-- ── IMAGE OBJECTS (FOR GOOGLE IMAGES #1 RANKING) ── -->
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#portrait-photo",
        "contentUrl": "https://muhammadhaerul.tech/assets/profile.webp",
        "url": "https://muhammadhaerul.tech/assets/profile.webp",
        "name": "Muhammad Haerul — Official Portrait Photo",
        "caption": "Official portrait of Muhammad Haerul, AI Full-Stack Specialist (Engineer, Researcher, and Trainer)",
        "description": "Official portrait of Muhammad Haerul — AI Full-Stack Specialist, alumnus of Hasanuddin University.",
        "representativeOfPage": true,
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" },
        "copyrightHolder": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#portrait-formal",
        "contentUrl": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-portrait-formal.webp",
        "url": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-portrait-formal.webp",
        "name": "Official Formal Portrait of Muhammad Haerul, S.Kom",
        "caption": "Official formal portrait of Muhammad Haerul, S.Kom in black suit",
        "description": "Official formal portrait of Muhammad Haerul in black suit, AI Full-Stack Specialist and top Computer Science graduate from Hasanuddin University.",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" },
        "copyrightHolder": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#photo-speaker-buildwithai",
        "contentUrl": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-build-with-ai.webp",
        "url": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-build-with-ai.webp",
        "name": "Muhammad Haerul — Keynote Speaker at Build with AI (GDG)",
        "caption": "Photo documentation of Muhammad Haerul delivering the AI-Driven Development keynote",
        "description": "Stage documentation of Muhammad Haerul presenting on AI systems at the Build with AI technology conference.",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#photo-speaker-gsa",
        "contentUrl": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp",
        "url": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp",
        "name": "Muhammad Haerul — Keynote Speaker at GSA AI Forge",
        "caption": "Photo of Muhammad Haerul leading the AI for Personal Branding & Digital Portfolio session",
        "description": "Documentation of workshop and mentorship activities at GSA AI Forge at Makassar Government Center with speaker Muhammad Haerul.",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#photo-speaker-mindfulai",
        "contentUrl": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai.webp",
        "url": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai.webp",
        "name": "Muhammad Haerul — Keynote Speaker at Mindful AI Forum",
        "caption": "Photo of Muhammad Haerul speaking at the Mindful AI Forum: AI Personalization for Students",
        "description": "Presentation documentation of Muhammad Haerul exploring high-impact AI technology for education and innovation.",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#photo-speaker-mindfulai-hd",
        "contentUrl": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai-hd.jpg",
        "url": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai-hd.jpg",
        "name": "Muhammad Haerul — HD Stage Presentation at Mindful AI",
        "caption": "High definition photo of Muhammad Haerul presenting Generative AI architectures",
        "description": "High resolution documentation of speaker Muhammad Haerul at Mindful AI forum.",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#photo-speaker-bssn",
        "contentUrl": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-bssn-cybersecurity.webp",
        "url": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-bssn-cybersecurity.webp",
        "name": "Muhammad Haerul — Speaker at National Cybersecurity & AI Forum BSSN",
        "caption": "Muhammad Haerul speaking at national forum on Artificial Intelligence and Information Security",
        "description": "Documentation of Muhammad Haerul presenting alongside Badan Siber dan Sandi Negara.",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "ImageObject",
        "@id": "https://muhammadhaerul.tech/#photo-trainer-unsulbar",
        "contentUrl": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp",
        "url": "https://muhammadhaerul.tech/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp",
        "name": "Muhammad Haerul — AI Web Engineering Workshop Trainer",
        "caption": "Muhammad Haerul guiding students during hands-on AI Web Engineering coding workshop",
        "description": "Hands-on workshop training session led by Muhammad Haerul at Universitas Sulawesi Barat.",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },

      <!-- ── VIDEO OBJECTS (FOR GOOGLE VIDEO #1 CAROUSELS & SEARCH) ── -->
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-aksara-lontara",
        "name": "Muhammad Haerul — Aksara Lontara Recognition AI System Demo",
        "description": "Official demonstration of ancient Bugis/Makassar Lontara OCR and deep learning transcription system developed by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/GEwjEfHMg-4/hqdefault.jpg",
        "uploadDate": "2024-05-10T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=GEwjEfHMg-4",
        "embedUrl": "https://www.youtube.com/embed/GEwjEfHMg-4",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-galaxy-alpr",
        "name": "Muhammad Haerul — Galaxy ALPR Automatic License Plate Recognition Demo",
        "description": "Real-time vehicle detection and automatic license plate recognition AI pipeline built by Muhammad Haerul using YOLOv8 and computer vision.",
        "thumbnailUrl": "https://img.youtube.com/vi/CngIuDBNCLA/hqdefault.jpg",
        "uploadDate": "2024-05-15T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=CngIuDBNCLA",
        "embedUrl": "https://www.youtube.com/embed/CngIuDBNCLA",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-vectorrag",
        "name": "Muhammad Haerul — AI Chatbot VectorRAG Enterprise Demo",
        "description": "Production enterprise conversational assistant utilizing vector retrieval augmented generation designed by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/6bJdURMwQbk/hqdefault.jpg",
        "uploadDate": "2024-06-01T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=6bJdURMwQbk",
        "embedUrl": "https://www.youtube.com/embed/6bJdURMwQbk",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-custom-object-detection",
        "name": "Muhammad Haerul — Custom Object Detection Computer Vision Demo",
        "description": "High accuracy custom object detection model training and live video inferencing demo by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/mip0cLW0VlQ/hqdefault.jpg",
        "uploadDate": "2024-04-20T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=mip0cLW0VlQ",
        "embedUrl": "https://www.youtube.com/embed/mip0cLW0VlQ",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-hybrid-search",
        "name": "Muhammad Haerul — Hybrid Search Engine (BM25 + Dense Vectors) Demo",
        "description": "Hybrid neural search engine combining lexical BM25 and semantic dense vector ranking engineered by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/a7VTbulhuC0/hqdefault.jpg",
        "uploadDate": "2024-06-15T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=a7VTbulhuC0",
        "embedUrl": "https://www.youtube.com/embed/a7VTbulhuC0",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-ai-update-hub",
        "name": "Muhammad Haerul — AI Update Hub Demonstration",
        "description": "Automated AI research summary platform crawling state-of-the-art papers built by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/AelUqjbJaG4/hqdefault.jpg",
        "uploadDate": "2024-07-01T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=AelUqjbJaG4",
        "embedUrl": "https://www.youtube.com/embed/AelUqjbJaG4",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-dengartulis",
        "name": "Muhammad Haerul — DengarTulis App AI Audio Transcription Demo",
        "description": "Real-time speech to text transcription and meeting summaries engine built by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/UE-GZdGShkI/hqdefault.jpg",
        "uploadDate": "2024-07-10T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=UE-GZdGShkI",
        "embedUrl": "https://www.youtube.com/embed/UE-GZdGShkI",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-galaxy-aksara",
        "name": "Muhammad Haerul — Galaxy Aksara Heritage AI Showcase",
        "description": "Preservation of Indonesian cultural heritage through mobile AI OCR by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/da2vGdWkkw4/hqdefault.jpg",
        "uploadDate": "2024-07-15T08:00:00+08:00",
        "contentUrl": "https://www.youtube.com/watch?v=da2vGdWkkw4",
        "embedUrl": "https://www.youtube.com/embed/da2vGdWkkw4",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },
      {
        "@type": "VideoObject",
        "@id": "https://muhammadhaerul.tech/#video-split-bills",
        "name": "Muhammad Haerul — AI Split Bills Multimodal OCR Demo",
        "description": "Multimodal vision LLM parsing receipt totals and calculating fair group splits developed by Muhammad Haerul.",
        "thumbnailUrl": "https://img.youtube.com/vi/qXtIyUeEuuw/hqdefault.jpg",
        "uploadDate": "2024-08-15T08:00:00+08:00",
        "contentUrl": "https://youtube.com/shorts/qXtIyUeEuuw",
        "embedUrl": "https://www.youtube.com/embed/qXtIyUeEuuw",
        "author": { "@id": "https://muhammadhaerul.tech/#person" },
        "creator": { "@id": "https://muhammadhaerul.tech/#person" }
      },

      <!-- ── FAQ PAGE SCHEMA (CRITICAL FOR GEO CITATIONS & PERPLEXITY / GEMINI OVERVIEWS) ── -->
      {
        "@type": "FAQPage",
        "@id": "https://muhammadhaerul.tech/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is Muhammad Haerul?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Muhammad Haerul, S.Kom is an accomplished Indonesian Artificial Intelligence (AI) Full-Stack Specialist, Machine Learning Engineer, Applied AI Researcher, and Technology Trainer. He graduated with Highest Honors (GPA 3.97 Cum Laude) from Hasanuddin University as the Most Outstanding Student (Mahasiswa Berprestasi). He is known for founding Aksarahub.id, serving as AI Team Lead at RevoU, and delivering workshops as a Google Student Ambassador."
            }
          },
          {
            "@type": "Question",
            "name": "What are Muhammad Haerul's primary AI projects and engineering works?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Muhammad Haerul's key engineering systems include Galaxy Aksara / Aksara Lontara Recognition (cultural OCR deep learning system), AI Chatbot VectorRAG (enterprise retrieval-augmented generation assistant), Galaxy ALPR (real-time automatic license plate recognition), PPE Inspector (computer vision industrial safety compliance), AI Split Bills (multimodal receipt parsing with vision LLMs), and the open-source PyPI package 'galaxy-object-detection-core'."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I watch demonstration videos of Muhammad Haerul's AI projects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Video demonstrations of Muhammad Haerul's AI systems and machine learning pipelines are featured on his official portfolio website (https://muhammadhaerul.tech/) and his official YouTube channel, demonstrating real-time computer vision inference, OCR parsing, and conversational AI agents."
            }
          },
          {
            "@type": "Question",
            "name": "What keynote conferences and workshops has Muhammad Haerul presented at?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Muhammad Haerul has presented keynote talks and led technical workshops at the Build with AI Conference (Google Developer Groups), GSA AI Forge at Makassar Government Center (150+ attendees), Mindful AI Forum (Yayasan Khouw Kalbe), National Cybersecurity & AI Awareness Forum alongside Badan Siber dan Sandi Negara (BSSN), and technical workshops at Universitas Sulawesi Barat."
            }
          },
          {
            "@type": "Question",
            "name": "How can I contact or collaborate with Muhammad Haerul?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can connect with Muhammad Haerul directly through his verified LinkedIn profile (https://www.linkedin.com/in/muhammadhaerul), email him at muhammadhaerul25@gmail.com, or submit an inquiry through his portfolio contact form (https://muhammadhaerul.tech/#contact)."
            }
          }
        ]
      }
    ]
  }
  </script>`;

if (oldSchemaRegex.test(content)) {
    content = content.replace(oldSchemaRegex, newHeadBlock + '\n\n  ' + fullJsonLdSchema);
    console.log('[SUCCESS] Replaced head metadata and extended JSON-LD schema');
} else {
    console.error('[ERROR] oldSchemaRegex did not match');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('[COMPLETE] index.html updated');

