const CACHE_NAME = 'offline-cache';
const OFFLINE_URL = '/offline.html';
const OFFLINE_SVG = '/offline.svg'; 

self.addEventListener('install', function(event) {
  // Install service worker and cache the offline page and SVG file
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all([
        cache.add(new Request(OFFLINE_URL, { cache: 'reload' })),
        cache.add(new Request(OFFLINE_SVG, { cache: 'reload' }))
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Intercept fetch requests and serve the cached offline page and SVG file if offline
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.url.includes(OFFLINE_SVG)) {
          return caches.match(OFFLINE_SVG);
        } else {
          return caches.match(OFFLINE_URL);
        }
      });
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
