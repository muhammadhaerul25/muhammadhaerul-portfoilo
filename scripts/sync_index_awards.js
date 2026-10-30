const fs = require('fs');

const awardsList = [
  // 2025
  {
    title: 'Open The Gate Hack 2025',
    issuer: 'PT Bahana Security Sistem (BSS Parking)',
    metric_tag: '🥇 1st Place Winner',
    badge_text: '🥇 1st Place Winner',
    badge_color: 'gold',
    image_url: '/assets/images/awards/award_img_3.jpg',
  },
  {
    title: 'AI Hackathon Competition (TECHNOART 2025)',
    issuer: 'Universitas Bunda Mulia (UBM)',
    metric_tag: '🏆 Best Creativity Winner',
    badge_text: '🏆 Best Creativity Winner',
    badge_color: 'gold',
    image_url: '/assets/images/awards/award_img_new_5.jpg',
  },
  {
    title: 'AI Talent Hub Indonesia 2025',
    issuer: 'Universitas Indonesia X PT Pertamina (Persero)',
    metric_tag: 'Top 20 Finalist',
    badge_text: '🏅 Top 20 AI Talent Hub',
    badge_color: 'blue',
    image_url: '/assets/images/awards/award_img_4.jpg',
  },
  {
    title: 'Kompetisi Website Budaya Nusantara (aksarahub.id)',
    issuer: 'Media Cloud Indonesia X PANDI (.id)',
    metric_tag: 'Cultural Web Innovation',
    badge_text: '🌐 Cultural Innovation Award',
    badge_color: 'red',
    image_url: '/assets/images/awards/award_img_5.jpg',
  },
  {
    title: 'Graduated Cumlaude (Highest Honors)',
    issuer: 'Hasanuddin University',
    metric_tag: 'GPA 3.97 / 4.00',
    badge_text: '🎓 GPA 3.97 / 4.00',
    badge_color: 'gold',
    image_url: null,
  },

  // 2024
  {
    title: 'Makassar Hackathon 2024',
    issuer: 'Dispora Makassar X BINAR',
    metric_tag: '🥈 2nd Place Winner',
    badge_text: '🥈 2nd Place Winner',
    badge_color: 'gold',
    image_url: '/assets/images/awards/award_img_2.jpg',
  },

  // 2023
  {
    title: '6th International Cultural Program (ICP 2023)',
    issuer: 'International Office, Hasanuddin University',
    metric_tag: 'International Program Delegate',
    badge_text: '🌏 International Delegate',
    badge_color: 'blue',
    image_url: '/assets/images/awards/award_img_new_9.jpg',
  },
  {
    title: 'Bank Indonesia Scholarship (GenBI)',
    issuer: 'Bank Indonesia',
    metric_tag: 'Academic Excellence',
    badge_text: '🏛️ Central Bank Award',
    badge_color: 'green',
    image_url: null,
  },

  // 2022
  {
    title: 'BPJS Kesehatan Healthkathon 2022',
    issuer: 'BPJS Kesehatan',
    metric_tag: 'Top 10 Semifinalist (Machine Learning)',
    badge_text: '🏅 Top 10 ML Semifinalist',
    badge_color: 'purple',
    image_url: '/assets/images/awards/award_img_1.jpg',
  },
  {
    title: 'Most Outstanding Student (Academic Excellence — IPS)',
    issuer: 'Universitas Hasanuddin (FMIPA)',
    metric_tag: 'Mahasiswa Berprestasi (IPS)',
    badge_text: '🏆 Outstanding Student',
    badge_color: 'gold',
    image_url: '/assets/images/awards/award_img_new_1.jpg',
  },
  {
    title: 'GemasTIK XV 2022 (Programming Division)',
    issuer: 'Kemendikbudristek (Puspresnas / BPTI) X Universitas Brawijaya',
    metric_tag: 'Competitive Programming Participant',
    badge_text: '💻 National Programming Competitor',
    badge_color: 'blue',
    image_url: '/assets/images/awards/award_img_new_7.jpg',
  },
  {
    title: 'Statistics Team Competition (LOGIKA UI 2022)',
    issuer: 'FMIPA Universitas Indonesia X Iykra',
    metric_tag: 'National Statistics Competitor',
    badge_text: '📊 National Statistics Competitor',
    badge_color: 'blue',
    image_url: '/assets/images/awards/award_img_new_8.jpg',
  },

  // 2021
  {
    title: 'National Essay Competition (Management Festival 2021)',
    issuer: 'HMPS-MBS IAIN Palopo',
    metric_tag: '🥇 1st Place Winner',
    badge_text: '🥇 1st Place Winner',
    badge_color: 'gold',
    image_url: '/assets/images/awards/award_img_new_2.jpg',
  },
  {
    title: 'Hasanuddin Mathematics Competition 2021',
    issuer: 'Departemen Matematika, Universitas Hasanuddin',
    metric_tag: 'Mathematics Competition Finalist',
    badge_text: '🎗️ Mathematics Finalist',
    badge_color: 'blue',
    image_url: '/assets/images/awards/award_img_new_6.jpg',
  },

  // 2019
  {
    title: 'MEDSPIN 2019 (International Medical Science Olympiad)',
    issuer: 'Faculty of Medicine, Universitas Airlangga',
    metric_tag: 'Quarter Finalist of Olympiad',
    badge_text: '🎗️ Quarter Finalist',
    badge_color: 'blue',
    image_url: '/assets/images/awards/award_img_new_3.jpg',
  },
  {
    title: 'Olimpiade Sains Nasional (OSN) 2019 in Chemistry',
    issuer: 'Kementerian Pendidikan dan Kebudayaan (Kemendikbud)',
    metric_tag: 'National Finalist in Chemistry',
    badge_text: '🇮🇩 OSN National Finalist',
    badge_color: 'blue',
    image_url: '/assets/images/awards/award_img_new_4.jpg',
  }
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const html = awardsList.map(aw => {
  const color = aw.badge_color || 'blue';
  const hasImage = Boolean(aw.image_url);

  return `          <article class="award-card accent-${escapeHtml(color)} reveal in-view">
            <div class="award-insignia-banner ${hasImage ? 'has-cert-img' : ''}" ${hasImage ? `onclick="window.openLightbox('${escapeHtml(aw.image_url)}', '${escapeHtml(aw.title)}')" style="cursor:zoom-in;" title="Click to view full certificate proof"` : ''}>
              ${!hasImage ? `
                <span class="award-badge-pill ${escapeHtml(color)}">
                  ${escapeHtml(aw.badge_text || '🏆 Honor & Award')}
                </span>
              ` : ''}
              ${hasImage ? `
                <img src="${escapeHtml(aw.image_url)}" alt="${escapeHtml(aw.title)}" class="award-cert-img" loading="lazy" />
                <div class="award-cert-overlay">
                  <span class="award-cert-zoom-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    View Certificate Proof
                  </span>
                </div>
              ` : `
                <div class="award-insignia-watermark" aria-hidden="true">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div class="award-insignia-emblem">
                  <div class="award-emblem-icon-wrap">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                  </div>
                </div>
              `}
            </div>

            <div class="award-card-body">
              <div>
                ${aw.metric_tag ? `
                  <div class="award-badge-top-wrap" style="margin-bottom: 8px;">
                    <span class="award-metric-tag ${escapeHtml(color)}">${escapeHtml(aw.metric_tag)}</span>
                  </div>
                ` : ''}
                <h3 class="award-title" style="margin-top: 0; margin-bottom: 6px;">${escapeHtml(aw.title)}</h3>
                <div class="award-issuer-row" style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px; font-size: 0.83rem; color: var(--ink-muted); font-weight: 500;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="flex-shrink:0; opacity:0.8;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <span>${escapeHtml(aw.issuer)}</span>
                </div>
              </div>

              <div class="award-doc-slot ${hasImage ? 'has-action' : ''}" ${hasImage ? `onclick="window.openLightbox('${escapeHtml(aw.image_url)}', '${escapeHtml(aw.title)}')" style="cursor:pointer;" title="Click to view full certificate proof"` : ''}>
                <div class="award-doc-slot-info">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span>${hasImage ? 'Official Certificate Record' : 'Official Academic Record'}</span>
                </div>
                <span class="award-doc-slot-pill ${hasImage ? 'view-pill' : ''}">
                  ${hasImage ? `
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    View Proof
                  ` : `
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"/></svg>
                    Verified
                  `}
                </span>
              </div>
            </div>
          </article>`;
}).join('\n\n');

let indexContent = fs.readFileSync('c:/Users/Asus/Documents/muhammadhaerul-feedbacks/public/index.html', 'utf8');

const startMarker = '<div class="awards-grid" id="awards-grid">';
const endMarker = '</section>';

const startIndex = indexContent.indexOf(startMarker);
const afterGrid = indexContent.indexOf(endMarker, startIndex);
const gridCloseTag = indexContent.lastIndexOf('</div>', afterGrid);

if (startIndex !== -1 && gridCloseTag !== -1) {
  const newContent = indexContent.slice(0, startIndex + startMarker.length) + '\n' + html + '\n        ' + indexContent.slice(gridCloseTag);
  fs.writeFileSync('c:/Users/Asus/Documents/muhammadhaerul-feedbacks/public/index.html', newContent);
  console.log('Successfully updated awards-grid in public/index.html with all 16 ranked awards (Year DESC, No Description)!');
} else {
  console.error('Could not find markers:', startIndex, gridCloseTag);
}
