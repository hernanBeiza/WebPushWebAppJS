angular.module("trabajaDAO",['ContactoModel'])
.factory('trabajaDAO',  ['$http','$q','ENV','ContactoModel', function($http,$q,ENV,ContactoModel){ 
    return {
        enviar: function(model){
            console.info("trabajaDAO: enviar();");
            //console.info(model);
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"archivo";
            //console.info(ruta);

            var data = {
                idcampana:7,
                rut:model.rut,
                nombre:model.nombre,
                email:model.email,
                telefono:model.telefono,
                mensaje:model.mensaje,
                cv:model.archivo
            }
            //console.log(data);
            var formData = new FormData();
            angular.forEach(data, function (value, key) {
              //console.log(key,value);
              formData.append(key, value);
            });
            //console.log(formData);

            $http({
                method: 'POST',
                url: ruta,
                headers: {
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': undefined,
                },
                data: formData,
                /*
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        console.log(p);
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                */
            }).then(function enviarComplete(json) {
                //console.info("trabajaDAO.js: enviarComplete");
                //console.info(json);
                var data = json.data;
                //console.log(data);
                if(data.result){
                    deferred.resolve({result:true,mensajes:data.mensajes});
                } else {
                    deferred.reject({result:false,errores:data.errores});
                }
            }, function enviarError(data){
                console.error("trabajaDAO.js: enviarError");
                console.error(data);
                //console.log(data,data.statusText);
                /*
                console.info(status);
                console.info(headers);
                console.info(config);
                */
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        }
    };
}]);