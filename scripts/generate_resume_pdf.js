const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const prisma = require('../src/config/db');

async function generatePdf() {
  console.log('Fetching live data from database...');
  const [exps, edus, projects, skills, certs, awards] = await Promise.all([
    prisma.experience.findMany({ orderBy: { sort_order: 'asc' } }),
    prisma.education.findMany({ orderBy: { sort_order: 'asc' } }),
    prisma.project.findMany({ orderBy: { created_at: 'desc' } }),
    prisma.skill.findMany({ orderBy: { sort_order: 'asc' } }),
    prisma.certification.findMany({ orderBy: { sort_order: 'asc' } }),
    prisma.award.findMany({ orderBy: { sort_order: 'asc' } })
  ]);

  const name = "Muhammad Haerul, S.Kom";
  const title = "AI Full-Stack Specialist (Engineer, Researcher, and Trainer)";
  const contacts = [
    "haerulmuhammad01@gmail.com",
    "Makassar, Indonesia",
    "linkedin.com/in/muhammadhaerul",
    "github.com/muhammadhaerul25",
    "muhammadhaerul.tech"
  ];
  const summary = "AI Full-Stack Specialist with 4+ years of hands-on experience building, researching, and deploying production AI systems, Computer Vision pipelines, and modern web architectures. Graduated with Cum Laude honors (GPA 3.97/4.00) in Computer Science from Hasanuddin University. Experienced in training 2,000+ professionals and students across Indonesia in Generative AI, PyTorch, and Full-Stack Engineering.";

  // Generate ATS HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Muhammad Haerul - Curriculum Vitae</title>
<style>
  @page {
    size: A4;
    margin: 14mm 16mm 14mm 16mm;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1a1a1a;
    line-height: 1.45;
    font-size: 10.5pt;
    background: #fff;
  }
  header {
    text-align: center;
    border-bottom: 2px solid #2563eb;
    padding-bottom: 8px;
    margin-bottom: 14px;
  }
  h1 {
    font-size: 20pt;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
    margin-bottom: 3px;
  }
  .headline {
    font-size: 11pt;
    font-weight: 600;
    color: #2563eb;
    margin-bottom: 5px;
  }
  .contacts {
    font-size: 9pt;
    color: #4b5563;
  }
  .contacts a {
    color: #4b5563;
    text-decoration: none;
  }
  section {
    margin-bottom: 12px;
  }
  h2 {
    font-size: 11pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 3px;
    margin-bottom: 8px;
  }
  .item {
    margin-bottom: 8px;
  }
  .item-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .item-title {
    font-weight: 700;
    color: #111827;
  }
  .item-sub {
    font-weight: 600;
    color: #374151;
  }
  .item-date {
    font-size: 9pt;
    color: #6b7280;
    font-weight: 500;
  }
  .item-desc {
    font-size: 9.5pt;
    color: #374151;
    margin-top: 3px;
    line-height: 1.4;
  }
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px 16px;
    font-size: 9.5pt;
  }
  .skills-row {
    margin-bottom: 3px;
  }
  .skills-label {
    font-weight: 700;
    color: #111827;
  }
  .skills-val {
    color: #4b5563;
  }
  ul.achievements {
    list-style-type: square;
    margin-left: 18px;
    font-size: 9pt;
    color: #374151;
  }
  ul.achievements li {
    margin-bottom: 2px;
  }
</style>
</head>
<body>

<header>
  <h1>${name}</h1>
  <div class="headline">${title}</div>
  <div class="contacts">${contacts.join(' &bull; ')}</div>
</header>

<section>
  <h2>Professional Summary</h2>
  <p class="item-desc">${summary}</p>
</section>

<section>
  <h2>Work Experience</h2>
  ${exps.map(e => `
    <div class="item">
      <div class="item-head">
        <div>
          <span class="item-title">${e.role}</span> &mdash; <span class="item-sub">${e.company}</span>
        </div>
        <span class="item-date">${e.start_date} &ndash; ${e.end_date || 'Present'}</span>
      </div>
      <div class="item-desc">${e.description ? e.description.split('\\n')[0] : ''}</div>
      ${e.stack && e.stack.length ? `<div style="font-size:8.5pt; color:#6b7280; margin-top:2px;"><strong>Tech:</strong> ${e.stack.join(', ')}</div>` : ''}
    </div>
  `).join('')}
</section>

<section>
  <h2>Education</h2>
  ${edus.map(ed => `
    <div class="item">
      <div class="item-head">
        <div>
          <span class="item-title">${ed.degree}</span> &mdash; <span class="item-sub">${ed.institution}</span>
        </div>
        <span class="item-date">${ed.start_date || '2020'} &ndash; ${ed.end_date || '2024'}</span>
      </div>
      <div class="item-desc">
        <strong>Honors:</strong> ${ed.honors || 'Cumlaude'} &bull; <strong>GPA:</strong> ${ed.grade || '3.97 / 4.00'}<br/>
        <strong>Thesis:</strong> ${ed.thesis || 'Development and Comparison of PPE Detection Models in Industrial Workers Based on Computer Vision'}
      </div>
    </div>
  `).join('')}
</section>

<section>
  <h2>Core Skills & Technologies</h2>
  <div class="skills-grid">
    ${skills.slice(0, 6).map(s => `
      <div class="skills-row">
        <span class="skills-label">${s.category}:</span>
        <span class="skills-val">${(s.tech_stack || []).map(t => t.name).join(', ')}</span>
      </div>
    `).join('')}
  </div>
</section>

<section>
  <h2>Selected Honors & Awards</h2>
  <ul class="achievements">
    ${awards.slice(0, 6).map(a => `
      <li><strong>${a.title}</strong> (${a.issuer}) &mdash; <em>${a.metric_tag || a.badge_text || 'Winner'}</em></li>
    `).join('')}
  </ul>
</section>

</body>
</html>`;

  console.log('Launching headless browser to compile ATS PDF...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const destPath = path.join(__dirname, '../public/assets/resume-muhammad-haerul.pdf');
  await page.pdf({
    path: destPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '14mm', right: '14mm' }
  });

  await browser.close();
  console.log(`✓ Resume PDF generated successfully at: ${destPath}`);
  
  // Also create a copy for /full-materi.pdf if needed
  const materiPath = path.join(__dirname, '../public/full-materi.pdf');
  fs.copyFileSync(destPath, materiPath);
  console.log(`✓ Synchronized with ${materiPath}`);

  await prisma.$disconnect();
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
