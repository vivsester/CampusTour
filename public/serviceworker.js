const CACHE_NAME = 'offline-cache';
const OFFLINE_URL = '/offline.html'; // Path to your offline page

self.addEventListener('install', function(event) {
  // Install service worker and cache the offline page
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Intercept fetch requests and serve the cached offline page if offline
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(OFFLINE_URL);
    })
  );
});

self.addEventListener('activate', function(event) {
  // Remove outdated caches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
