const fs = require('fs');

const html = fs.readFileSync('public/dashboard.html', 'utf8');

const gridIds = [
  'projects-grid', 'talks-grid', 'edu-grid', 'exp-grid', 'cert-grid',
  'pub-grid-dash', 'blog-grid-dash', 'award-grid-dash', 'skills-grid-dash',
  'gal-grid-dash', 'inbox-list', 'feedbacks-container', 'form-card-grid',
  'forms-list', 'gallery-grid'
];

gridIds.forEach(id => {
  const idx = html.indexOf('id="' + id + '"');
  if (idx !== -1) {
    const chunk = html.slice(Math.max(0, idx - 40), idx + 120).replace(/\n/g, ' ');
    console.log(id + ':', chunk);
  } else {
    // Check if it's a class
    const cIdx = html.indexOf('.' + id);
    if (cIdx !== -1) {
      console.log('CLASS .' + id + ':', html.slice(cIdx, cIdx + 150).replace(/\n/g, ' '));
    } else {
      console.log(id + ': NOT FOUND');
    }
  }
});

