angular.module('indexController', [])

.controller('indexController', ['$scope', '$routeParams','$location','$ngBootbox','$uibModal','notificacionDAO',
  
	function($scope,$routeParams,$location,$ngBootbox,$uibModal,$notificacionDAO){
      
  	$scope.init = function(){
			console.log("indexController: onInit();");      	

			$scope.model = {};

	    if('serviceWorker' in navigator) {
			  navigator.serviceWorker.register('./service-worker.js', { scope: '/' }).then(function(registration) {
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

		      console.log(registration);

		      registration.pushManager.getSubscription().then(function(subscription) {
		        if (subscription === null) {
		          // Update UI to ask user to register for Push
		          console.log('Not subscribed to push service!');

		          $scope.subscribir();

		        } else {
		          // We have a subscription, update the database
		          console.log('Subscription object: ', subscription);
		          //$scope.enviar(subscription);
		        }
		        
		      });

		    });

			}
		}

		/**
		 * urlBase64ToUint8Array
		 * 
		 * @param {string} base64String a public vavid key
		 */
		function urlBase64ToUint8Array(base64String) {
	    var padding = '='.repeat((4 - base64String.length % 4) % 4);
	    var base64 = (base64String + padding)
	        .replace(/\-/g, '+')
	        .replace(/_/g, '/');

	    var rawData = window.atob(base64);
	    var outputArray = new Uint8Array(rawData.length);

	    for (var i = 0; i < rawData.length; ++i) {
	        outputArray[i] = rawData.charCodeAt(i);
	    }
	    return outputArray;
		}

		$scope.subscribir = function(){
			console.log("subscribir();");

			console.log(Notification.permission);

			if (Notification.permission === "granted") {
			  /* do our magic */
 				console.log("Notificaciones aceptadas por el usuario");
 				
				if ('serviceWorker' in navigator) {
				    navigator.serviceWorker.ready.then(function(registration) {
			    	console.log(registration);

				    const vapidPublicKey = "BI4SvuJUErZVSZkTOS88w1W5uyuPQzXBgZ_FaUpXg3D6CMReI6IMyQeNj3vkwlkX2uX89BP5iyBfpUwqff-Ti20"; 
				    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

			      registration.pushManager.subscribe({
			        
			        userVisibleOnly: true,
	            applicationServerKey: convertedVapidKey

			      }).then(function(sub) {
			        
			        console.log(sub);

			        console.log('Endpoint URL: ', sub.endpoint);

			        $scope.enviar(sub);

			      }).catch(function(e) {

			        if (Notification.permission === 'denied') {
			          console.warn('Permission for notifications was denied');
			        } else {
			          console.error('Unable to subscribe to push', e);
			        }

			      });

			    }).catch(function(e) {
			    	console.error(e);
    				console.log(Notification.permission);
			    });
			  }

			} else if (Notification.permission === "blocked") {
				
				/* the user has previously denied push. Can't reprompt. */				
 				console.log("Notificaciones bloqueadas por el usuario");

			} else if (Notification.permission === "denied") {

				console.log("Notificaciones denegadas por el usuario");

			} else {

			  /* show a prompt to the user */
  			Notification.requestPermission(function(status) {

	    		console.log('Notification permission status:', status);

				});

			}

		}

		$scope.enviar = function(sub){
			console.log("enviar");

      $notificacionDAO.guardar(sub).then(function(data){

      	console.log(data);

      }).catch(function(e){

      	console.error(e);

      });

		}

  }

])
