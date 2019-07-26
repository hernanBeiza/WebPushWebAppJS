angular.module("cirugiaDAO",['CirugiaModel'])
.factory('cirugiaDAO',  ['$http','$q','ENV','CirugiaModel','$filter', function($http,$q,ENV,CirugiaModel,$filter){ 

    function obtener() {
        //console.info("cirugiaDAO: obtener();");
        var deferred = $q.defer();
        var ruta = ENV.URLRecursos+"data/cirugiasPAD.json";
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
            data: {
                usuario:usuario,
                contrasena:contrasena,
            },
            */
            /*
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            */
        }).then(function enviarComplete(json) {
            //console.info("cirugiaDAO.js: enviarComplete");
            //console.info(json);
            if(json.data.result){
                var cirugias = [];
                for (var i = 0;i<json.data.cirugias.length; i++) {
                    var row = json.data.cirugias[i];
                    var model = new CirugiaModel(row.id,row.nombre,row.total,row.copago);
                    cirugias.push(model);
                }
                deferred.resolve({result:true,cirugias:cirugias});
            } else {
                deferred.reject({result:false,errores:data.errores});
            }
        },function(error){
            //console.error(error);
            deferred.reject({result:false,errores:"No se pudieron cargar las cirugias"});                
        });

        return deferred.promise;
    }

    return {
        obtener:obtener,
    }

}]);