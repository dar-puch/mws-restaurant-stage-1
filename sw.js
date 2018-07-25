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
  caches.open('restaurant-v1').then(function(cache){
    console.log('cache open');
    cache.addAll(urlsToCache);
  })
);
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('restaurant-v1').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});

/*self.addEventListener('fetch', (event) => {
	if (!urlsToCache.includes(event.request.url)) {
		urlsToCache.push(event.request.url);
	}

	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});*/
