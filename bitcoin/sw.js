var cacheName = 'bitcoin-v1';
var filesToCache = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-256x256.png',
  './icons/icon-512x512.png',
];

self.addEventListener('install', function(e) {
  console.log('SW: installing');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('SW: caching');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
    console.log('SW: activating');
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(name) {
                    if(name !== cacheName){
                        return caches.delete(cName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
  console.log('SW: fetch: ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) {
        console.log('SW: ' + e.request.url + ' exists in cache!');
        return r;
      }
      console.log('SW: Network request for ' + e.request.url);
      return fetch(e.request)
    }).catch(err => { 
      console.log(err);
    })
  );
});