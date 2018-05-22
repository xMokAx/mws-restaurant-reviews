const version = "1.0.1";
const staticCacheName = `mws-restaurant-${version}`;

self.addEventListener("install", e => {
  e.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache =>
        cache
          .addAll([
            "./",
            "./index.html",
            "./restaurant.html",
            "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css",
            "./css/styles.css",
            "./js/main.js",
            "./js/dbhelper.js",
            "./js/restaurant_info.js",
            "./js/service_worker.js",
            "./img/1.jpg",
            "./img/2.jpg",
            "./img/3.jpg",
            "./img/4.jpg",
            "./img/5.jpg",
            "./img/6.jpg",
            "./img/7.jpg",
            "./img/8.jpg",
            "./img/9.jpg",
            "./img/10.jpg"
          ])
          .then(() => self.skipWaiting())
      )
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(
              cacheName =>
                cacheName.startsWith("mws-") && cacheName != staticCacheName
            )
            .map(cacheName => caches.delete(cacheName))
        )
      )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(
      response =>
        response ||
        fetch(e.request).then(response =>
          caches.open(staticCacheName).then(cache => {
            cache.put(e.request.url, response.clone());

            return response;
          })
        )
    )
  );
});
