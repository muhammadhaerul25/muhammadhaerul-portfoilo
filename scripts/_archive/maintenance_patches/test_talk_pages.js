function getTalkMediaPages(talk, isId) {
  if (!talk) return [];
  const pages = [];
  const posterSrc = talk.poster_url || (talk.media && talk.media[0]) || null;
  if (posterSrc) {
    pages.push({
      label: isId ? 'Poster' : 'Poster',
      url: posterSrc,
      type: 'poster'
    });
  }

  // Identify certificate / plakat
  let certUrl = null;
  if (Array.isArray(talk.gallery)) {
    certUrl = talk.gallery.find(img => /cert|sertifikat|plakat|piagam|certificate/i.test(img));
  }
  if (!certUrl && Array.isArray(talk.slides)) {
    const cSlide = talk.slides.find(s => s.type === 'certificate' || /cert|sertifikat|plakat|piagam|certificate/i.test(s.label || ''));
    if (cSlide) certUrl = cSlide.url;
  }
  const eventLower = (talk.event || '').toLowerCase();
  if (!certUrl && eventLower.includes('khouw kalbe')) {
    certUrl = '/assets/images/talks_cert_yayasan_khouw_kalbe_mindful_ai.jpg';
  } else if (!certUrl && (eventLower.includes('build with ai') || eventLower.includes('gdg'))) {
    certUrl = '/assets/certificates/cert-gdg-build-with-ai.jpg';
  } else if (!certUrl && (eventLower.includes('web engineering') || eventLower.includes('sulawesi barat') || eventLower.includes('unsulbar'))) {
    certUrl = '/assets/certificates/cert-unsulbar-web-ai.jpg';
  } else if (!certUrl && (eventLower.includes('cybersecurity') || eventLower.includes('bssn'))) {
    certUrl = '/assets/certificates/cert-bssn-cybersecurity.jpg';
  }

  if (certUrl && certUrl !== posterSrc) {
    pages.push({
      label: isId ? 'Sertifikat' : 'Certificate',
      url: certUrl,
      type: 'certificate'
    });
  }

  // Also include any other documentation photos in talk.gallery if present
  if (Array.isArray(talk.gallery)) {
    const extraCerts = [];
    const docImgs = [];
    talk.gallery.forEach(img => {
      if (!img || img === posterSrc || img === certUrl) return;
      if (/cert|sertifikat|plakat|piagam|certificate/i.test(img)) {
        if (!extraCerts.includes(img) && !pages.some(p => p.url === img)) {
          extraCerts.push(img);
        }
      } else {
        if (!docImgs.includes(img) && !pages.some(p => p.url === img)) {
          docImgs.push(img);
        }
      }
    });

    extraCerts.forEach((img, idx) => {
      const label = extraCerts.length > 1
        ? (isId ? `Sertifikat ${idx + 1}` : `Certificate ${idx + 1}`)
        : (isId ? 'Sertifikat' : 'Certificate');
      pages.push({ label, url: img, type: 'certificate' });
    });

    docImgs.forEach((img, idx) => {
      const label = docImgs.length > 1
        ? (isId ? `Dokumentasi ${idx + 1}` : `Documentation ${idx + 1}`)
        : (isId ? 'Dokumentasi' : 'Documentation');
      pages.push({ label, url: img, type: 'documentation' });
    });
  }

  if (!pages.length && certUrl) {
    pages.push({
      label: isId ? 'Sertifikat' : 'Certificate',
      url: certUrl,
      type: 'certificate'
    });
  }

  return pages;
}

fetch('http://localhost:4000/api/talks')
  .then(r => r.json())
  .then(data => {
    const gsa = data.data.find(t => t.event.includes('GSA'));
    const mindful = data.data.find(t => t.event.includes('Mindful'));
    
    console.log('=== GSA AI Forge (EN) ===');
    console.log(getTalkMediaPages(gsa, false));
    console.log('=== GSA AI Forge (ID) ===');
    console.log(getTalkMediaPages(gsa, true));
    
    console.log('=== Mindful AI (EN) ===');
    console.log(getTalkMediaPages(mindful, false));
    console.log('=== Mindful AI (ID) ===');
    console.log(getTalkMediaPages(mindful, true));
  });

