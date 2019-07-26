angular.module("notificacionDAO",['NotificacionModel'])
.factory('notificacionDAO',  ['$http','$q','ENV','NotificacionModel', function($http,$q,ENV,NotificacionModel){ 

    function guardar(subscription) {
        console.info("notificacionDAO: guardar();");
        console.log(subscription);

        var deferred = $q.defer();
        var ruta = ENV.NotificacionEndPoint+"subscriptor";

        console.info(ruta);

        $http({
            method: 'POST',
            url: ruta,
            headers: {
                //'Content-Type': 'form-data',
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },

            data: JSON.stringify(subscription),
            /*
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            */

        }).then(function enviarComplete(json) {

            console.info("notificacion.js: enviarComplete");
            console.info(json);
            
            if(json.data.result){
                deferred.resolve({result:true,mensajes:json.data.mensajes});
            } else {
                deferred.reject({result:false,errores:json.data.errores});
            }

        },function(error){

            console.error(error);
            deferred.reject({result:false,errores:"No se pudo guardar el token de este usuario"});                

        });

        return deferred.promise;
    }

    function obtener(notificacion){
        console.info("notificacionDAO: obtener();");

        var deferred = $q.defer();
        var ruta = ENV.NotificacionEndPoint+"subscriptor";

        console.info(ruta);

        $http({
            method: 'POST',
            url: ruta,
            headers: {
                //'Content-Type': 'form-data',
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },

            data: JSON.stringify(subscription),
            /*
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            */

        }).then(function enviarComplete(json) {

            console.info("notificacion.js: enviarComplete");
            console.info(json);
            
            if(json.data.result){
                deferred.resolve({result:true,mensajes:json.data.mensajes});
            } else {
                deferred.reject({result:false,errores:json.data.errores});
            }

        },function(error){

            console.error(error);
            deferred.reject({result:false,errores:"No se pudo guardar el token de este usuario"});                

        });

        return deferred.promise;

    }

    return {
        guardar:guardar,
    }

}]);