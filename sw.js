self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/data/restaurants.json',
  ];

  event.waitUntil(
    caches.open('restaurant-v1').then(function(cache) {
      cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);

    }));
  caches.open('restaurant-v1').then(function(cache) {
    return fetch(event.request).then(function(response) {
      cache.put(event.request, response.clone());
      return response;
    });
  });


});
