const express = require('express');
const path = require('path');

const router = express.Router();
const publicDir = path.join(__dirname, '../../public');

// Landing Page
router.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(publicDir, 'index.html'));
});

// Admin Dashboard
router.get('/dashboard', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.sendFile(path.join(publicDir, 'dashboard.html'));
});

// Public Feedback & Dynamic Form Pages
router.get(['/feedback', '/form-feedbacks'], (req, res) => {
    res.sendFile(path.join(publicDir, 'form-feedbacks.html'));
});
router.get(['/recommendation', '/form-recommendation'], (req, res) => {
    res.sendFile(path.join(publicDir, 'form-recommendation.html'));
});
router.get('/form/:slug', (req, res) => {
    res.sendFile(path.join(publicDir, 'form-renderer.html'));
});

// Unified Browse / Directory Views
const browsePaths = [
    '/browse',
    '/projects',
    '/talks',
    '/certifications',
    '/feedbacks',
    '/testimonials',
    '/awards',
    '/publications'
];
router.get(browsePaths, (req, res) => {
    res.sendFile(path.join(publicDir, 'browse.html'));
});

// Section Redirects
router.get(['/blog', '/blogs'], (req, res) => res.redirect('/#blog'));
router.get(['/gallery', '/galeri'], (req, res) => res.redirect('/#gallery'));

// Direct Document Downloads & PWA Manifest / Offline Routes
router.get('/llms.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    res.sendFile(path.join(publicDir, 'llms.txt'));
});
router.get('/llms-full.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    res.sendFile(path.join(publicDir, 'llms-full.txt'));
});
router.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=43200, stale-while-revalidate=86400');
    res.sendFile(path.join(publicDir, 'sitemap.xml'));
});
router.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    res.sendFile(path.join(publicDir, 'robots.txt'));
});
router.get(['/manifest.json', '/site.webmanifest'], (req, res) => {
    res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.sendFile(path.join(publicDir, 'manifest.json'));
});
router.get('/sw.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(publicDir, 'sw.js'));
});
router.get(['/offline', '/offline.html'], (req, res) => {
    res.sendFile(path.join(publicDir, 'offline.html'));
});
router.get('/full-materi.pdf', (req, res) => {
    res.sendFile(path.join(publicDir, 'full-materi.pdf'));
});
router.get(['/resume', '/cv'], (req, res) => {
    res.sendFile(path.join(publicDir, 'assets/resume-muhammad-haerul.pdf'));
});

module.exports = router;

