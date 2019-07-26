var CACHE_NAME = 'myapp-cache-v1';
var urlsToCache = [
 'index.html'
];

self.addEventListener('install', function(event) {
  console.log("install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log("fetch");
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  console.log("activate");
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(e) {
  console.log("push");
  //console.log(e);

  let data = e.data ? JSON.parse(e.data.text()) : {};
  let notificationUrl = data.url;
  //console.log(data);
  let actions = data.actions;
  console.log(actions);

  var options = {
    body: data.message,
    icon: data.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'open', 
        title: 'Ver novedades',
        icon: data.icon
      },
      {
        action: 'close', 
        title: 'Cerrar',
        icon: data.icon
      },
    ]
  };

  e.waitUntil(
    self.registration.showNotification(data.title, options)
  );

});

self.addEventListener('notificationclick', function(e) {
  console.log("notificationclick");
  console.log(e);

  var notification = e.notification;
  var data = notification.data;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  console.log(action);
  console.log(data);

  switch(action){
    case "close":
      notification.close();
    break;
    case "open":
      clients.openWindow(data.url);
      notification.close();
    break;
  }

});

self.addEventListener('notificationclose', function(e) {
  console.log("notificationclose");

  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});