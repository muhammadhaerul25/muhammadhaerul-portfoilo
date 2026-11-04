(function () {
  'use strict';

  let deferredInstallPrompt = null;

  // 1. Dynamic Theme-Color Synchronization across Light & Dark Mode
  function syncThemeColorMeta() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const color = isDark ? '#0A0E17' : '#FFFFFF';
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);
  }

  syncThemeColorMeta();
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'data-theme') {
        syncThemeColorMeta();
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // 2. Register Service Worker across all platforms
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          });
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration skipped:', err.message);
        });
    });
  }

  // 3. Cross-Platform Install Prompt Handling (Android, Windows, macOS, Linux, iOS/iPadOS)
  function isStandaloneMode() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: window-controls-overlay)').matches ||
      window.navigator.standalone === true
    );
  }

  function isAppleMobile() {
    const ua = window.navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    return isIOS && !window.MSStream;
  }

  function showIosInstallModal() {
    let modal = document.getElementById('pwaIosModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pwaIosModal';
      modal.style.cssText =
        'position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,0.55);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;';
      modal.innerHTML = `
        <div style="background:var(--surface,#fff);color:var(--text,#0f172a);border:1px solid var(--border,#e2e8f0);border-radius:20px;max-width:380px;width:100%;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,0.25);text-align:center;font-family:inherit;">
          <img src="/icons/icon-180x180.png" alt="App Icon" style="width:60px;height:60px;border-radius:14px;margin:0 auto 12px;display:block;box-shadow:0 4px 12px rgba(0,0,0,0.12);">
          <h3 style="font-size:1.1rem;font-weight:800;margin:0 0 8px;">Install Muhammad Haerul App</h3>
          <p style="font-size:0.88rem;color:var(--text-secondary,#475569);line-height:1.55;margin:0 0 18px;">
            To install this app on your iPhone or iPad, tap the <strong>Share</strong> button in Safari and select <strong>"Add to Home Screen"</strong>.
          </p>
          <button type="button" id="pwaIosModalClose" style="width:100%;padding:10px 16px;border-radius:999px;border:none;background:#1A73E8;color:#fff;font-weight:700;font-size:0.88rem;cursor:pointer;">Got it</button>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'pwaIosModalClose') {
          modal.style.display = 'none';
        }
      });
    } else {
      modal.style.display = 'flex';
    }
  }

  window.installPortfolioPWA = async function () {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } catch (e) {}
      deferredInstallPrompt = null;
      updateInstallButtonsVisibility();
      return;
    }
    if (isAppleMobile()) {
      showIosInstallModal();
    }
  };

  function updateInstallButtonsVisibility() {
    const btns = document.querySelectorAll('.pwa-install-btn');
    const canShow = !isStandaloneMode() && (Boolean(deferredInstallPrompt) || isAppleMobile());
    btns.forEach((btn) => {
      btn.style.display = canShow ? 'inline-flex' : 'none';
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    updateInstallButtonsVisibility();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateInstallButtonsVisibility();
    if (typeof window.showToast === 'function') {
      window.showToast('App installed successfully!');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateInstallButtonsVisibility();
  });
})();

