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

// Direct Document Downloads
router.get('/full-materi.pdf', (req, res) => {
    res.sendFile(path.join(publicDir, 'full-materi.pdf'));
});
router.get(['/resume', '/cv'], (req, res) => {
    res.sendFile(path.join(publicDir, 'assets/resume-muhammad-haerul.pdf'));
});

module.exports = router;

