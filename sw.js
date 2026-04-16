// Aura ERP - Service Worker v3 (NO CACHE)
// This SW does NOT cache - always fetch fresh from network

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Delete ALL caches
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => {
        console.log('Deleting cache:', key);
        return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // ALWAYS go to network - no caching
  e.respondWith(fetch(e.request));
});
