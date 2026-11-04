const CACHE_VERSION = 'mh-pwa-v1.2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const API_CACHE = `${CACHE_VERSION}-api`;

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/browse.html',
  '/offline.html',
  '/styles.css?v=8.4',
  '/script.js?v=8.4',
  '/pwa.js?v=1.2',
  '/manifest.json',
  '/favicon.webp',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/assets/profile.webp',
  '/assets/profile.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-192x192.png',
  '/icons/icon-maskable-512x512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      await Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          fetch(url, { cache: 'reload' })
            .then((res) => {
              if (res && res.ok) {
                return cache.put(url, res);
              }
            })
            .catch(() => {})
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith('mh-pwa-') &&
                key !== STATIC_CACHE &&
                key !== DYNAMIC_CACHE &&
                key !== API_CACHE
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache auth or tracking endpoints
  if (
    url.pathname.startsWith('/api/auth') ||
    url.pathname.startsWith('/api/analytics') ||
    url.pathname.startsWith('/api/keep-alive')
  ) {
    return;
  }

  // 1. Portfolio API GET requests: Network-first with offline cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            const clone = networkRes.clone();
            caches.open(API_CACHE).then((cache) => {
              cache.put(request, clone);
              // Also store normalized pathname key so ?refresh=... can fall back when offline
              cache.put(url.pathname, clone.clone());
            });
          }
          return networkRes;
        })
        .catch(async () => {
          const cache = await caches.open(API_CACHE);
          const cached = (await cache.match(request)) || (await cache.match(url.pathname));
          if (cached) return cached;
          return new Response(
            JSON.stringify({ success: false, offline: true, message: 'Offline mode active' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // 2. HTML Navigation requests: Network-first, falling back to cached page or /offline.html
  if (
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html')
  ) {
    event.respondWith(
      fetch(request)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            const clone = networkRes.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, clone);
              cache.put(url.pathname, clone.clone());
            });
          }
          return networkRes;
        })
        .catch(async () => {
          const dynCache = await caches.open(DYNAMIC_CACHE);
          const statCache = await caches.open(STATIC_CACHE);

          const cachedExact =
            (await dynCache.match(request)) ||
            (await dynCache.match(url.pathname)) ||
            (await statCache.match(url.pathname));
          if (cachedExact) return cachedExact;

          // Browse routes fallback to cached /browse.html
          const browseRoutes = [
            '/browse',
            '/projects',
            '/talks',
            '/certifications',
            '/feedbacks',
            '/testimonials',
            '/awards',
            '/publications'
          ];
          if (browseRoutes.includes(url.pathname)) {
            const browseCached =
              (await dynCache.match('/browse.html')) ||
              (await statCache.match('/browse.html'));
            if (browseCached) return browseCached;
          }

          if (url.pathname === '/') {
            const homeCached =
              (await dynCache.match('/index.html')) ||
              (await statCache.match('/index.html'));
            if (homeCached) return homeCached;
          }

          const offlineFallback = await statCache.match('/offline.html');
          return (
            offlineFallback ||
            new Response('Offline — Please check your connection.', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            })
          );
        })
    );
    return;
  }

  // 3. Static Assets (CSS, JS, Images, Fonts, Icons): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedRes) => {
      const fetchPromise = fetch(request)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            const clone = networkRes.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return networkRes;
        })
        .catch(() => cachedRes);

      return cachedRes || fetchPromise;
    })
  );
});

