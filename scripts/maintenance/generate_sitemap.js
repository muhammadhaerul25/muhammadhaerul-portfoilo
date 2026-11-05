const fs = require('fs');
const path = require('path');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- ========================================== -->
  <!-- 1. PRIMARY CANONICAL HOMEPAGE & MEDIA HUB  -->
  <!-- ========================================== -->
  <url>
    <loc>https://muhammadhaerul.tech/</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>

    <!-- ── OFFICIAL PORTRAITS & IDENTITY PHOTOS ── -->
    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/profile.webp</image:loc>
      <image:title>Muhammad Haerul — AI Full-Stack Specialist Official Portrait</image:title>
      <image:caption>Official portrait photo of Muhammad Haerul, AI Full-Stack Specialist (Engineer, Researcher, and Trainer) based in Makassar, Indonesia.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/profile-highres.png</image:loc>
      <image:title>Muhammad Haerul — High-Resolution Portrait Photo</image:title>
      <image:caption>Foto resmi resolusi tinggi Muhammad Haerul, S.Kom — AI Full-Stack Engineer, Peneliti AI, dan Trainer Teknologi.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/profile.png</image:loc>
      <image:title>Muhammad Haerul — Professional Profile Portrait</image:title>
      <image:caption>Professional profile photo of Muhammad Haerul, S.Kom, graduated Cum Laude from Hasanuddin University.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/profile.webp</image:loc>
      <image:title>Muhammad Haerul — Official Headshot</image:title>
      <image:caption>Muhammad Haerul headshot photograph, AI Full-Stack Specialist and Technology Educator.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad-haerul-portrait-formal.webp</image:loc>
      <image:title>Muhammad Haerul — Foto Formal Jas Resmi S.Kom</image:title>
      <image:caption>Foto formal resmi Muhammad Haerul dengan setelan jas hitam, Sarjana Ilmu Komputer Universitas Hasanuddin dan AI Engineer.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad_haerul_avatar_square.webp</image:loc>
      <image:title>Muhammad Haerul — Square Profile Avatar</image:title>
      <image:caption>Foto profil square avatar Muhammad Haerul untuk representasi konferensi teknologi dan publikasi AI.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <!-- ── KEYNOTE SPEAKER & WORKSHOP DOCUMENTATION ── -->
    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-build-with-ai.webp</image:loc>
      <image:title>Muhammad Haerul — Keynote Speaker at Build with AI Conference (GDG)</image:title>
      <image:caption>Dokumentasi foto Muhammad Haerul saat membawakan keynote AI-Driven Development di konferensi teknologi Build with AI Google Developer Groups.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp</image:loc>
      <image:title>Muhammad Haerul — Keynote Speaker at GSA AI Forge Tech Summit</image:title>
      <image:caption>Foto Muhammad Haerul memimpin sesi pelatihan AI for Personal Branding &amp; Digital Portfolio di GSA AI Forge Makassar Government Center.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai.webp</image:loc>
      <image:title>Muhammad Haerul — Keynote Speaker at Mindful AI Forum (Yayasan Khouw Kalbe)</image:title>
      <image:caption>Dokumentasi foto panggung Muhammad Haerul menyampaikan materi AI Personalization for Students di Mindful AI Forum.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-mindful-ai-hd.jpg</image:loc>
      <image:title>Muhammad Haerul — HD Keynote Presentation at Mindful AI</image:title>
      <image:caption>High definition stage photo of Muhammad Haerul presenting Generative AI architectures.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad-haerul-speaker-bssn-cybersecurity.webp</image:loc>
      <image:title>Muhammad Haerul — Speaker at National Cybersecurity &amp; AI Awareness Forum BSSN</image:title>
      <image:caption>Foto dokumentasi Muhammad Haerul sebagai narasumber Artificial Intelligence &amp; Information Security bersama Badan Siber dan Sandi Negara.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp</image:loc>
      <image:title>Muhammad Haerul — AI Web Engineering &amp; Security Hands-on Workshop Trainer</image:title>
      <image:caption>Foto dokumentasi Muhammad Haerul memandu hands-on coding workshop pengembangan aplikasi web berbasis AI di Unsulbar.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/gsa-ai-forge-doc-1.jpg</image:loc>
      <image:title>Muhammad Haerul — GSA AI Forge Session Documentation Photo 1</image:title>
      <image:caption>Sesi mentoring intensif Muhammad Haerul bersama peserta GSA AI Forge 2026.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/gsa-ai-forge-doc-2.jpg</image:loc>
      <image:title>Muhammad Haerul — GSA AI Forge Session Documentation Photo 2</image:title>
      <image:caption>Foto dokumentasi suasana kelas workshop teknologi bersama Muhammad Haerul di Makassar Government Center.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/gsa-ai-forge-doc-3.jpg</image:loc>
      <image:title>Muhammad Haerul — GSA AI Forge Session Documentation Photo 3</image:title>
      <image:caption>Dokumentasi foto bersama peserta pelatihan AI for Digital Portfolio dipandu Muhammad Haerul.</image:caption>
      <image:geo_location>Makassar, South Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/uploads/talks/talk-rri-mamuju-dialog-interaktif.jpg</image:loc>
      <image:title>Muhammad Haerul — Dialog Interaktif Radio Republik Indonesia (RRI Mamuju)</image:title>
      <image:caption>Dokumentasi narasumber dialog interaktif Kita Indonesia bersama Muhammad Haerul tentang kesiapan pemuda menghadapi tantangan AI global.</image:caption>
      <image:geo_location>Mamuju, West Sulawesi, Indonesia</image:geo_location>
    </image:image>

    <!-- ── VERIFIED ACADEMIC & PROFESSIONAL CERTIFICATES ── -->
    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-gdg-build-with-ai.jpg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Keynote Speaker Build with AI GDG</image:title>
      <image:caption>Sertifikat penghargaan resmi Google Developer Groups kepada Muhammad Haerul sebagai Keynote Speaker Build with AI.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-bssn-cybersecurity.jpg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Pemateri Cybersecurity &amp; AI BSSN</image:title>
      <image:caption>Sertifikat penghargaan resmi BSSN kepada Muhammad Haerul sebagai narasumber literasi keamanan informasi dan AI.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-unsulbar-web-ai.jpg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Lead Trainer AI Web Engineering Unsulbar</image:title>
      <image:caption>Sertifikat resmi instruktur workshop AI Web Engineering atas nama Muhammad Haerul dari Universitas Sulawesi Barat.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/images/talks_cert_yayasan_khouw_kalbe_mindful_ai.jpg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Speaker Mindful AI Yayasan Khouw Kalbe</image:title>
      <image:caption>Sertifikat pembicara resmi dari Yayasan Khouw Kalbe untuk Muhammad Haerul pada program Mindful AI.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-outstanding-student-unhas-page2.jpg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Mahasiswa Berprestasi Universitas Hasanuddin</image:title>
      <image:caption>Piagam penghargaan resmi Mahasiswa Berprestasi (Most Outstanding Student) Universitas Hasanuddin diraih oleh Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-ml-specialization.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Machine Learning Specialization (DeepLearning.AI &amp; Stanford)</image:title>
      <image:caption>Sertifikat resmi kompetensi Machine Learning Specialization diraih oleh Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-ml-production.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Machine Learning in Production MLOps (DeepLearning.AI)</image:title>
      <image:caption>Sertifikat resmi MLOps dan Machine Learning in Production diraih oleh Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-genai-software.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Generative AI for Software Development (DeepLearning.AI)</image:title>
      <image:caption>Sertifikat kompetensi Generative AI for Software Development atas nama Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-genai-langchain.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Generative AI with LangChain &amp; HuggingFace</image:title>
      <image:caption>Sertifikat kompetensi LLM and LangChain development atas nama Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-prompt-engineering.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Prompt Engineering for Software Developers (Vanderbilt)</image:title>
      <image:caption>Sertifikat resmi Prompt Engineering for Software Developers diraih oleh Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-deep-learning-dts.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Deep Learning Digital Talent Scholarship (Kominfo)</image:title>
      <image:caption>Sertifikat beasiswa nasional Deep Learning DTS Kominfo diraih oleh Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-data-science-dts.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — Data Science Digital Talent Scholarship (Kominfo)</image:title>
      <image:caption>Sertifikat beasiswa nasional Data Science DTS Kominfo diraih oleh Muhammad Haerul.</image:caption>
    </image:image>

    <image:image>
      <image:loc>https://muhammadhaerul.tech/assets/certificates/cert-sql-intermediate.svg</image:loc>
      <image:title>Sertifikat Muhammad Haerul — SQL Intermediate Skill Certificate (HackerRank)</image:title>
      <image:caption>Sertifikat verifikasi keahlian SQL Intermediate HackerRank atas nama Muhammad Haerul.</image:caption>
    </image:image>


    <!-- ── OFFICIAL VIDEO DEMOS & RECORDINGS (GOOGLE VIDEO SITEMAP) ── -->
    <!-- 1. Aksara Lontara Recognition -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/GEwjEfHMg-4/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Aksara Lontara Recognition AI System Demo</video:title>
      <video:description>Demonstration of ancient Bugis/Makassar Lontara OCR and deep learning transcription system developed by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=GEwjEfHMg-4</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/GEwjEfHMg-4</video:player_loc>
      <video:publication_date>2024-05-10T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>AI Engineer</video:tag>
      <video:tag>Aksara Lontara</video:tag>
      <video:tag>Computer Vision</video:tag>
    </video:video>

    <!-- 2. Galaxy ALPR -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/CngIuDBNCLA/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Galaxy ALPR Automatic License Plate Recognition Demo</video:title>
      <video:description>Real-time vehicle detection and automatic license plate recognition AI pipeline built by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=CngIuDBNCLA</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/CngIuDBNCLA</video:player_loc>
      <video:publication_date>2024-05-15T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>ALPR</video:tag>
      <video:tag>Computer Vision</video:tag>
      <video:tag>YOLOv8</video:tag>
    </video:video>

    <!-- 3. AI Chatbot VectorRAG -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/6bJdURMwQbk/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — AI Chatbot VectorRAG Enterprise Demo</video:title>
      <video:description>Production enterprise conversational assistant utilizing vector retrieval augmented generation designed by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=6bJdURMwQbk</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/6bJdURMwQbk</video:player_loc>
      <video:publication_date>2024-06-01T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>RAG</video:tag>
      <video:tag>LLM</video:tag>
      <video:tag>AI Chatbot</video:tag>
    </video:video>

    <!-- 4. Custom Object Detection -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/mip0cLW0VlQ/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Custom Object Detection Computer Vision Demo</video:title>
      <video:description>High accuracy custom object detection model training and live video inferencing demo by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=mip0cLW0VlQ</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/mip0cLW0VlQ</video:player_loc>
      <video:publication_date>2024-04-20T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>Object Detection</video:tag>
      <video:tag>Deep Learning</video:tag>
    </video:video>

    <!-- 5. Hybrid Search Engine -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/a7VTbulhuC0/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Hybrid Search Engine (BM25 + Dense Vectors) Demo</video:title>
      <video:description>Hybrid neural search engine combining lexical BM25 and semantic dense vector ranking by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=a7VTbulhuC0</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/a7VTbulhuC0</video:player_loc>
      <video:publication_date>2024-06-15T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>Search Engine</video:tag>
      <video:tag>Information Retrieval</video:tag>
    </video:video>

    <!-- 6. AI Update Hub -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/AelUqjbJaG4/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — AI Update Hub Demonstration</video:title>
      <video:description>Automated AI research summary platform crawling state-of-the-art papers built by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=AelUqjbJaG4</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/AelUqjbJaG4</video:player_loc>
      <video:publication_date>2024-07-01T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>AI Update Hub</video:tag>
    </video:video>

    <!-- 7. DengarTulis App -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/UE-GZdGShkI/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — DengarTulis App AI Audio Transcription Demo</video:title>
      <video:description>Real-time speech to text transcription and meeting summaries engine built by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=UE-GZdGShkI</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/UE-GZdGShkI</video:player_loc>
      <video:publication_date>2024-07-10T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>Audio AI</video:tag>
      <video:tag>Transcription</video:tag>
    </video:video>

    <!-- 8. Galaxy Aksara -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/da2vGdWkkw4/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Galaxy Aksara Heritage AI Showcase</video:title>
      <video:description>Preservation of Indonesian cultural heritage through mobile AI OCR by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=da2vGdWkkw4</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/da2vGdWkkw4</video:player_loc>
      <video:publication_date>2024-07-15T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>Galaxy Aksara</video:tag>
    </video:video>

    <!-- 9. Personalized English Learning -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/oCQTAU5ns5A/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Personalized English Learning AI App Demo</video:title>
      <video:description>Adaptive language learning platform powered by Generative AI developed by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=oCQTAU5ns5A</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/oCQTAU5ns5A</video:player_loc>
      <video:publication_date>2024-07-20T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>EdTech AI</video:tag>
    </video:video>

    <!-- 10. Product Recognition -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/UYhXSkHO5LE/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Product Recognition Vision System Demo</video:title>
      <video:description>Fast retail item and barcode classification computer vision model by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=UYhXSkHO5LE</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/UYhXSkHO5LE</video:player_loc>
      <video:publication_date>2024-07-25T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>Computer Vision</video:tag>
    </video:video>

    <!-- 11. Eatitude.id -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/wOsPg19O8KM/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — Eatitude.id Meal Vision Analyzer Demo</video:title>
      <video:description>AI dietary companion extracting nutritional statistics from meal snapshots created by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=wOsPg19O8KM</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/wOsPg19O8KM</video:player_loc>
      <video:publication_date>2024-08-01T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>Eatitude</video:tag>
    </video:video>

    <!-- 12. AI Split Bills -->
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/qXtIyUeEuuw/hqdefault.jpg</video:thumbnail_loc>
      <video:title>Muhammad Haerul — AI Split Bills Multimodal OCR Demo</video:title>
      <video:description>Multimodal vision LLM parsing receipt totals and calculating fair group splits developed by Muhammad Haerul.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=qXtIyUeEuuw</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/qXtIyUeEuuw</video:player_loc>
      <video:publication_date>2024-08-15T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="https://muhammadhaerul.tech/">Muhammad Haerul</video:uploader>
      <video:tag>Muhammad Haerul</video:tag>
      <video:tag>AI Split Bills</video:tag>
    </video:video>
  </url>

  <!-- ========================================== -->
  <!-- 2. DIRECTORY & BROWSE SECTIONS             -->
  <!-- ========================================== -->
  <url>
    <loc>https://muhammadhaerul.tech/browse</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://muhammadhaerul.tech/projects</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://muhammadhaerul.tech/talks</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://muhammadhaerul.tech/certifications</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://muhammadhaerul.tech/awards</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://muhammadhaerul.tech/publications</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://muhammadhaerul.tech/resume</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- ========================================== -->
  <!-- 3. INTERACTIVE FEEDBACK & SESSIONS         -->
  <!-- ========================================== -->
  <url>
    <loc>https://muhammadhaerul.tech/feedback</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://muhammadhaerul.tech/form/feedback-gsa-ai-forge-2026</loc>
    <lastmod>2026-11-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../../public/sitemap.xml'), sitemapContent.trim() + '\n', 'utf8');
console.log('[SUCCESS] Generated comprehensive sitemap.xml with image and video namespaces');

