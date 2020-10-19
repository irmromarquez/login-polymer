self.addEventListener('install', function(event) {
    if (self.skipWaiting) { self.skipWaiting(); }
      event.waitUntil(
        caches.open('cache01').then(function(cache) {
          return cache.addAll([
            './',
            'index.html',
            './src/'
          ]);
        })
      );
    });
    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });
      var cacheWhitelist = ['cache01'];
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        });
        caches.keys().then(function(cacheKeys) {
        console.log('Versión SW: '+cacheKeys);
    });
