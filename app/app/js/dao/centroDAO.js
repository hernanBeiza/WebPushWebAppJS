angular.module("centroDAO",['CentroModel'])
.factory('centroDAO',  ['$http','$q','ENV','CentroModel','$filter', function($http,$q,ENV,CentroModel,$filter){ 
    
    function obtener() {
        //console.info("centroDAO: obtener();");
        var deferred = $q.defer();
        /*
        var puente = {id:1,slug:"medico-puente",nombre:"Centro Médico Puente Alto",subtitulo:"Sub Puente"}
        var dental = {id:2,slug:"dental-puente",nombre:"Centro Dental Puente Alto",subtitulo:"Sub Dental Puente"}
        var florida = {id:3,slug:"centro-florida",nombre:"Centro Médico La Florida",subtitulo:"Sub La Florida"}
        var centros = [puente,dental,florida];
        deferred.resolve({result:true,centros:centros});
        return deferred.promise;
        */
        var ruta = ENV.URLRecursos+"data/centros.json";
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
            //console.info("centroDAO.js: enviarComplete");
            //console.info(json);
            if(json.data.result){
                var centros = [];
                for (var i = 0;i<json.data.centros.length; i++) {
                    var row = json.data.centros[i];
                    var model = new CentroModel(row.idcentro,row.slug,row.nombre,row.subtitulo,row.bajada,row.foto,row.coordenadas);
                    centros.push(model);
                }
                deferred.resolve({result:true,centros:centros});
            } else {
                deferred.reject({result:false,errores:data.errores});
            }
        }, function enviarError(data){
            console.error("contactoDAO.js: enviarError");
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
    
    function obtenerConID (centros,id) {
        //console.info("centroDAO: obtenerConID(); " + id);
         var deferred = $q.defer();
        // Especialidades
        /*
        this.obtener().then(function(data){
            console.log(data);
            if(data.result){
                var centros = data.centros;
                //$filter('filter')(array, expression, comparator, anyPropertyKey)
                var filtrado = $filter('filter')(centros,id,"id");
                if(filtrado.length>0){
                    deferred.resolve({result:true,centro:filtrado[0]});                                    
                } else {
                   deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
                }
            } else {
               deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
            }
        },function(error){
           deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
        });
        */

        var filtrado = $filter('filter')(centros,id,"id");
        if(filtrado.length>0){
            deferred.resolve({result:true,centro:filtrado[0]});                                    
        } else {
           deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
        }

        return deferred.promise;
    }

    function obtenerConSlug (centros,slug) {
        //console.info("centroDAO: obtenerConSlug(); " + slug);
        var deferred = $q.defer();
        /*
        this.obtener().then(function(data){
            console.log(data);
            if(data.result){
                var centros = data.centros;
                //$filter('filter')(array, expression, comparator, anyPropertyKey)
                var filtrado = $filter('filter')(centros,slug,"slug");
                if(filtrado.length>0){
                    deferred.resolve({result:true,centro:filtrado[0]});                                    
                } else {
                   deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
                }
            } else {
                   deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
            }
        },function(error){
                   deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
        });
        */

        var filtrado = $filter('filter')(centros,slug,"slug");
        //console.log(filtrado);
        if(filtrado.length>0){
            deferred.resolve({result:true,centro:filtrado[0]});                                    
        } else {
           deferred.reject({result:false,errores:"No se encontró detalle para este centro"});                
        }
        return deferred.promise;
    }

    return {
        obtener:obtener,
        obtenerConID:obtenerConID,
        obtenerConSlug:obtenerConSlug
    }

}]);