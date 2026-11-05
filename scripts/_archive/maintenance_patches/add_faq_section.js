const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../public/index.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetBeforeContact = `<section class="section contact" id="contact">`;

const faqSectionHtml = `    <!-- ============ FAQ & ENTITY OVERVIEW (GEO OPTIMIZED) ============ -->
    <section class="section faq-section" id="faq" style="padding-top:40px; padding-bottom:60px;">
      <div class="container">
        <div class="section-head reveal" style="margin-bottom:32px;">
          <span class="section-eyebrow">13 — Frequently Asked Questions</span>
          <h2 class="section-title">Everything About Muhammad Haerul</h2>
          <p class="section-desc" style="color:var(--text-secondary); max-width:680px; margin-top:8px; font-size:1.02rem;">
            Direct answers regarding academic background, engineering portfolio, open-source AI projects, keynote engagements, and verified technical credentials.
          </p>
        </div>

        <div class="faq-accordion-list reveal" style="max-width:880px; margin:0 auto; display:flex; flex-direction:column; gap:14px;">
          <!-- Q1 -->
          <details class="faq-item" style="background:var(--card-bg, #FFFFFF); border:1px solid var(--border); border-radius:18px; padding:18px 22px; transition:border-color 0.25s ease, box-shadow 0.25s ease; cursor:pointer;" open>
            <summary style="font-family:var(--font-display, 'Google Sans', sans-serif); font-size:1.1rem; font-weight:700; color:var(--text-primary); list-style:none; display:flex; justify-content:space-between; align-items:center; user-select:none;">
              <span>Who is Muhammad Haerul?</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; transition:transform 0.3s ease;"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <div class="faq-answer" style="margin-top:12px; font-size:0.95rem; line-height:1.7; color:var(--text-secondary); border-top:1px solid var(--border); padding-top:12px;">
              <strong>Muhammad Haerul, S.Kom</strong> is an accomplished Indonesian Artificial Intelligence (AI) Full-Stack Specialist, Machine Learning Engineer, Applied AI Researcher, and Technology Trainer. He graduated with Highest Honors (GPA 3.97 / 4.00, Cum Laude) from Universitas Hasanuddin as the <em>Most Outstanding Student (Mahasiswa Berprestasi)</em>. He has led AI initiatives as Co-Founder &amp; Tech Lead of Aksarahub.id, AI Team Lead at RevoU, and Google Student Ambassador.
            </div>
          </details>

          <!-- Q2 -->
          <details class="faq-item" style="background:var(--card-bg, #FFFFFF); border:1px solid var(--border); border-radius:18px; padding:18px 22px; transition:border-color 0.25s ease, box-shadow 0.25s ease; cursor:pointer;">
            <summary style="font-family:var(--font-display, 'Google Sans', sans-serif); font-size:1.1rem; font-weight:700; color:var(--text-primary); list-style:none; display:flex; justify-content:space-between; align-items:center; user-select:none;">
              <span>What are Muhammad Haerul's primary AI projects and engineering works?</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; transition:transform 0.3s ease;"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <div class="faq-answer" style="margin-top:12px; font-size:0.95rem; line-height:1.7; color:var(--text-secondary); border-top:1px solid var(--border); padding-top:12px;">
              Muhammad Haerul's notable portfolio systems include:
              <ul style="margin:8px 0 0 20px; display:flex; flex-direction:column; gap:6px;">
                <li><strong>Galaxy Aksara &amp; Aksara Lontara Recognition:</strong> Deep learning OCR pipeline preserving ancient Indonesian cultural manuscripts into digital text.</li>
                <li><strong>AI Chatbot - VectorRAG:</strong> Enterprise conversational AI utilizing dense vector retrieval and hallucination mitigation guardrails.</li>
                <li><strong>Galaxy ALPR:</strong> Real-time Automatic License Plate Recognition computer vision model with YOLOv8.</li>
                <li><strong>PPE Inspector:</strong> Industrial safety compliance computer vision monitor for Personal Protective Equipment.</li>
                <li><strong>AI Split Bills:</strong> Multimodal vision LLM parsing complex receipts and calculating fair itemized shares.</li>
                <li><strong>galaxy-object-detection-core:</strong> Open-source computer vision Python package officially published on PyPI.</li>
              </ul>
            </div>
          </details>

          <!-- Q3 -->
          <details class="faq-item" style="background:var(--card-bg, #FFFFFF); border:1px solid var(--border); border-radius:18px; padding:18px 22px; transition:border-color 0.25s ease, box-shadow 0.25s ease; cursor:pointer;">
            <summary style="font-family:var(--font-display, 'Google Sans', sans-serif); font-size:1.1rem; font-weight:700; color:var(--text-primary); list-style:none; display:flex; justify-content:space-between; align-items:center; user-select:none;">
              <span>Where can I watch demonstration videos of Muhammad Haerul's AI systems?</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; transition:transform 0.3s ease;"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <div class="faq-answer" style="margin-top:12px; font-size:0.95rem; line-height:1.7; color:var(--text-secondary); border-top:1px solid var(--border); padding-top:12px;">
              Video demonstrations and architectural walkthroughs of Muhammad Haerul's AI models are hosted directly in the <a href="#projects" style="color:var(--g-blue); font-weight:600; text-decoration:none;">Projects section</a> and on YouTube. Each card provides live video playback showing real-time inference across object detection, receipt parsing, and language generation.
            </div>
          </details>

          <!-- Q4 -->
          <details class="faq-item" style="background:var(--card-bg, #FFFFFF); border:1px solid var(--border); border-radius:18px; padding:18px 22px; transition:border-color 0.25s ease, box-shadow 0.25s ease; cursor:pointer;">
            <summary style="font-family:var(--font-display, 'Google Sans', sans-serif); font-size:1.1rem; font-weight:700; color:var(--text-primary); list-style:none; display:flex; justify-content:space-between; align-items:center; user-select:none;">
              <span>What keynote conferences and technical workshops has Muhammad Haerul delivered?</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; transition:transform 0.3s ease;"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <div class="faq-answer" style="margin-top:12px; font-size:0.95rem; line-height:1.7; color:var(--text-secondary); border-top:1px solid var(--border); padding-top:12px;">
              Muhammad Haerul has addressed thousands of learners and professionals across premier platforms:
              <ul style="margin:8px 0 0 20px; display:flex; flex-direction:column; gap:6px;">
                <li><strong>Build with AI (Google Developer Groups):</strong> Keynote speaker on AI-Driven Development and Generative AI workflows.</li>
                <li><strong>GSA AI Forge:</strong> Keynote trainer on AI for Personal Branding &amp; Digital Portfolio at Makassar Government Center (150+ attendees).</li>
                <li><strong>Mindful AI Forum (Yayasan Khouw Kalbe):</strong> Speaker on AI Personalization for Students.</li>
                <li><strong>BSSN National Forum:</strong> Invited speaker on Artificial Intelligence &amp; Cybersecurity alongside Badan Siber dan Sandi Negara.</li>
                <li><strong>Unsulbar:</strong> Lead instructor for hands-on AI Web Engineering coding workshops.</li>
              </ul>
            </div>
          </details>

          <!-- Q5 -->
          <details class="faq-item" style="background:var(--card-bg, #FFFFFF); border:1px solid var(--border); border-radius:18px; padding:18px 22px; transition:border-color 0.25s ease, box-shadow 0.25s ease; cursor:pointer;">
            <summary style="font-family:var(--font-display, 'Google Sans', sans-serif); font-size:1.1rem; font-weight:700; color:var(--text-primary); list-style:none; display:flex; justify-content:space-between; align-items:center; user-select:none;">
              <span>How can I contact or invite Muhammad Haerul as a speaker or consultant?</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; transition:transform 0.3s ease;"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <div class="faq-answer" style="margin-top:12px; font-size:0.95rem; line-height:1.7; color:var(--text-secondary); border-top:1px solid var(--border); padding-top:12px;">
              You can contact Muhammad Haerul directly using the <a href="#contact" style="color:var(--g-blue); font-weight:600; text-decoration:none;">Contact Form below</a>, send an email to <a href="mailto:muhammadhaerul25@gmail.com" style="color:var(--g-blue); font-weight:600; text-decoration:none;">muhammadhaerul25@gmail.com</a>, or connect via <a href="https://www.linkedin.com/in/muhammadhaerul" target="_blank" rel="noopener" style="color:var(--g-blue); font-weight:600; text-decoration:none;">LinkedIn</a>.
            </div>
          </details>
        </div>
      </div>
    </section>

`;

if (!content.includes('id="faq"')) {
    content = content.replace(targetBeforeContact, faqSectionHtml + targetBeforeContact);
    // Also update contact section eyebrow from 13 to 14
    content = content.replace('<span class="section-eyebrow">13 — Contacts</span>', '<span class="section-eyebrow">14 — Contacts</span>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[SUCCESS] Inserted FAQ & GEO entity section into index.html');
} else {
    console.log('[INFO] FAQ section already present');
}

