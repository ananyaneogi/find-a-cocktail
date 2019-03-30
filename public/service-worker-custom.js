// Name our cache
var CACHE_NAME = 'find-a-cocktail-v1';

var urlsToCache = [
    '/',
    '/styles/styles.css',
    '/static/js/bundle.js'
];

// Delete old caches that are not our current one!
// self.addEventListener("activate", event => {
//     const cacheWhitelist = [CACHE_NAME];
//     event.waitUntil(
//         caches.keys()
//             .then(keyList =>
//                 Promise.all(keyList.map(key => {
//                     if (!cacheWhitelist.includes(key)) {
//                         console.log('Deleting cache: ' + key)
//                         return caches.delete(key);
//                     }
//                 }))
//             )
//     );
// });

// self.addEventListener('activate', function (event) {
//     // `claim()` sets this worker as the active worker for all clients that
//     // match the workers scope and triggers an `oncontrollerchange` event for
//     // the clients.
//     return self.clients.claim();
// });

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('install', function (event) {
    // waitUntil() ensures that the Service Worker will not
    // install until the code inside has successfully occurred
    event.waitUntil(
        // Create cache with the name supplied above and
        // return a promise for it
        caches.open(CACHE_NAME).then(function (cache) {
            // Important to `return` the promise here to have `skipWaiting()`
            // fire after the cache has been updated.
            return cache.addAll(urlsToCache);
        }).then(function () {
            // `skipWaiting()` forces the waiting ServiceWorker to become the
            // active ServiceWorker, triggering the `onactivate` event.
            // Together with `Clients.claim()` this allows a worker to take effect
            // immediately in the client(s).
            return self.skipWaiting();
        })
    );
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
// self.addEventListener('fetch', function (event) {
//     // Ignore non-get request like when accessing the admin panel
//     // Don't try to handle non-secure assets because fetch will fail

//     // Here's where we cache all the things!
//     event.respondWith(
//         // Open the cache created when install
//         caches.open(CACHE_NAME).then(function (cache) {
//             // Go to the network to ask for that resource
//             return fetch(event.request).then(function (networkResponse) {
//                 // Add a copy of the response to the cache (updating the old version)
//                 cache.put(event.request, networkResponse.clone());
//                 // Respond with it
//                 return networkResponse;
//             }).catch(function (e) {
//                 // If there is no internet connection, try to match the request
//                 // to some of our cached resources
//                 return caches.match(event.request);
//             })
//         })
//     );
//});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                var fetchPromise = fetch(event.request).then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
                return response || fetchPromise;
            }).catch (function (e) {
                // If there is no internet connection, try to match the request
                // to some of our cached resources
                return caches.match(event.request);
            })
        })
    );
});