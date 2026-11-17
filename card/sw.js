/* LUXTECH contact card V5.6 - resilient offline cache */
const CACHE = 'luxtech-card-v5-6-1';
const PRELOAD = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
const OPTIONAL = ['./Tudor_Neamtu_Contact.vcf', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Missing optional files should not abort the service worker installation.
    await Promise.allSettled([...PRELOAD, ...OPTIONAL].map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('luxtech-card-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok && new URL(request.url).pathname.startsWith('/card/')) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(request,copy)).catch(() => {}));
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const fallback = await caches.match('./index.html');
        if (fallback) return fallback;
      }
      return Response.error();
    }
  })());
});
