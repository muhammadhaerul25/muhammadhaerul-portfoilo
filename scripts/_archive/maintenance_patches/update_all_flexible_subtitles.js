require('dotenv/config');
const prisma = require('../../src/config/db');

const FLEXIBLE_SUBTITLES = {
    education: "Bachelor of Computer Science specializing in Artificial Intelligence and Data Science at Universitas Hasanuddin (GPA 3.97/4.00, Cum Laude, Most Outstanding Student).",
    experiences: "Professional engineering journey across AI software, machine learning research, and technical leadership—shipping production AI systems, LLM OCR, and computer vision pipelines.",
    experience: "Professional engineering journey across AI software, machine learning research, and technical leadership—shipping production AI systems, LLM OCR, and computer vision pipelines.",
    skills: "End-to-end technical stack spanning core domains: Programming, Data Analytics, Computer Vision, NLP, Generative AI, AI Agents, Full-Stack Engineering, and Cloud MLOps.",
    projects: "Production-grade systems and case studies spanning Agentic AI workflows, RAG applications, computer vision pipelines, speech recognition, and modern web architectures.",
    publications: "Published scientific research, open-source Python packages on PyPI, and in-depth engineering guides on applied AI and computer vision.",
    talks: "Keynote speeches, university seminars, and hands-on technical workshops empowering developers, students, and professionals in Generative AI, Deep Learning, and Data Science.",
    awards: "National and regional accolades across AI innovation, startup hackathons, data science competitions, and academic excellence.",
    certifications: "Verified credentials across professional programs, courses, and technical specializations issued by leading industry and academic institutions.",
    blogs: "In-depth technical write-ups, engineering tutorials, and architecture guides on Large Language Models, Agentic AI workflows, Computer Vision, and production software systems.",
    gallery: "Curated visual highlights capturing keynote talks, hands-on AI training sessions, competition victories, and professional milestones.",
    testimonials: "Verified LinkedIn recommendations from engineering colleagues alongside authentic reviews from workshop attendees, mentees, and collaborators.",
    feedback: "Verified LinkedIn recommendations from engineering colleagues alongside authentic reviews from workshop attendees, mentees, and collaborators.",
    contact: "Available for end-to-end AI engineering, applied machine learning research collaborations, corporate AI training, and technical speaking engagements."
};

async function main() {
    const res = await prisma.pool.query("SELECT key, value FROM site_settings WHERE key = 'site_page_settings'");
    if (res.rows.length === 0) {
        console.log('No site_page_settings found.');
        return;
    }

    const val = res.rows[0].value;
    if (!val.sections) val.sections = {};

    for (const [secKey, sub] of Object.entries(FLEXIBLE_SUBTITLES)) {
        if (!val.sections[secKey]) val.sections[secKey] = {};
        val.sections[secKey].subtitle = sub;
    }

    await prisma.pool.query(
        "UPDATE site_settings SET value = $1, updated_at = NOW() WHERE key = 'site_page_settings'",
        [JSON.stringify(val)]
    );
    console.log('Successfully updated all flexible subtitles in database!');
}

main().catch(console.error).finally(() => prisma.pool.end());
