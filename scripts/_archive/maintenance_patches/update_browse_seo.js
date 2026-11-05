const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../public/browse.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `<meta name="description" id="pageDesc" content="Explore complete works, talks, certifications, and feedback in Muhammad Haerul's digital portfolio.">`;

const enhancedMeta = `<meta name="description" id="pageDesc" content="Explore complete projects, speaking talks, certifications, research publications, and feedback in Muhammad Haerul's official digital portfolio.">
  <meta name="keywords" content="Muhammad Haerul, projects Muhammad Haerul, talks Muhammad Haerul, foto Muhammad Haerul, video Muhammad Haerul, certifications Muhammad Haerul, awards Muhammad Haerul, publications Muhammad Haerul, AI Portfolio, Machine Learning Engineer">
  <meta name="author" content="Muhammad Haerul">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://muhammadhaerul.tech/browse">
  <link rel="alternate" type="text/plain" href="https://muhammadhaerul.tech/llms.txt" title="LLM Machine-Readable Context (GEO)">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://muhammadhaerul.tech/browse">
  <meta property="og:title" content="Browse All Works, Talks & Credentials · Muhammad Haerul">
  <meta property="og:description" content="Explore complete projects, speaking talks, certifications, publications, and verified credentials of Muhammad Haerul, AI Full-Stack Specialist.">
  <meta property="og:image" content="https://muhammadhaerul.tech/assets/profile.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="1200">
  <meta property="og:image:alt" content="Muhammad Haerul — Official Portfolio">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://muhammadhaerul.tech/browse">
  <meta name="twitter:title" content="Browse All Works, Talks & Credentials · Muhammad Haerul">
  <meta name="twitter:description" content="Explore complete projects, speaking talks, certifications, publications, and verified credentials of Muhammad Haerul.">
  <meta name="twitter:image" content="https://muhammadhaerul.tech/assets/profile.png">

  <!-- Schema.org CollectionPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Browse All Works & Credentials · Muhammad Haerul",
    "description": "Comprehensive directory of AI projects, keynote talks, publications, and credentials of Muhammad Haerul.",
    "url": "https://muhammadhaerul.tech/browse",
    "author": {
      "@type": "Person",
      "name": "Muhammad Haerul",
      "url": "https://muhammadhaerul.tech/",
      "jobTitle": "AI Full-Stack Specialist, Engineer, Researcher & Trainer"
    }
  }
  </script>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, enhancedMeta);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[SUCCESS] browse.html SEO meta tags updated');
} else {
    console.log('[INFO] Target string already updated or not found');
}

