angular.module("medicoDAO",['MedicoModel'])
.factory('medicoDAO',  ['$http','$q','ENV','MedicoModel', function($http,$q,ENV,MedicoModel){ 

    function obtener() {
        //console.info("medicoDAO: obtener();");
        var deferred = $q.defer();
        var ruta = ENV.URLRecursos+"data/medicos.json";
        //console.info(ruta);
        $http({
            method: 'GET',
            url: ruta,
            headers: {
            //'x-access-token': token,
            'Content-Type': 'form-data',
            //'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            },
            /*
            data: { },
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            */
        }).then(function obtenerComplete(json) {
            //console.info("medicoDAO.js: obtenerComplete");
            //console.info(json);
            if(json.data.result){
                var medicos = [];
                for (var i = 0;i<json.data.medicos.length; i++) {
                    var row = json.data.medicos[i];
                    var model = new MedicoModel(row.id,row.nombre,row.cargo,row.foto);
                    medicos.push(model);
                }
                deferred.resolve({result:true,medicos:medicos});
            } else {
                deferred.reject({result:false,errores:data.errores});
            }
        }, function obtenerError(data){
            //console.error("medicoDAO.js: obtenerError");
            //console.error(data);
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

    return {
        obtener:obtener
    }

}]);