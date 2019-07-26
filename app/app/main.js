console.log("main.js");
/*
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js', { scope: '/pwa/' }).then(function(registration) {
      var serviceWorker;
      if (registration.installing) {
        serviceWorker = registration.installing;
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
      } else if (registration.active) {
        serviceWorker = registration.active;
      }

      if (serviceWorker) {
        console.log("ServiceWorker phase:", serviceWorker.state);
        serviceWorker.addEventListener('statechange', function (e) {
          console.log("ServiceWorker phase:", e.target.state);
        });
      }

      registration.pushManager.getSubscription().then(function(sub) {
        if (sub === null) {
          // Update UI to ask user to register for Push
          console.log('Not subscribed to push service!');
        } else {
          // We have a subscription, update the database
          console.log('Subscription object: ', sub);
        }
      });

    });
  navigator.serviceWorker.ready.then(function(registration) {
    console.log('ServiceWorker registration ready', registration);
  });
}
*/