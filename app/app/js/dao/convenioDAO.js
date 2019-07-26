angular.module("convenioDAO",['ConvenioModel'])
.factory('convenioDAO',  ['$http','$q','ENV','ConvenioModel','$filter', function($http,$q,ENV,ConvenioModel,$filter){ 

    //TODO
    //Pasar a un archivo XML
    function obtener() {
        //console.info("convenioDAO: obtener();");
        var deferred = $q.defer();
        var ruta = ENV.URLRecursos+"data/convenios.json";
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
            //console.info("convenioDAO.js: enviarComplete");
            //console.info(json);
            if(json.data.result){
                var convenios = [];
                for (var i = 0;i<json.data.convenios.length; i++) {
                    var row = json.data.convenios[i];
                    var model = new ConvenioModel(row.idconvenio,row.slug,row.nombre,row.subtitulo,row.bajada,row.foto,row.preguntas);
                    convenios.push(model);
                }
                deferred.resolve({result:true,convenios:convenios});
            } else {
                deferred.reject({result:false,errores:data.errores});
            }
        },function(error){
            console.error(error);
            deferred.reject({result:false,errores:"No se pudieron cargar los convenios"});                
        });

        return deferred.promise;
    }
    
    function obtenerConID (convenios,id) {
        //console.info("convenioDAO: obtenerConID(); " + id);
        var deferred = $q.defer();
        /*
        this.obtener().then(function(data){
            console.log(data);
            if(data.result){
                var convenios = data.convenios;
                //$filter('filter')(array, expression, comparator, anyPropertyKey)
                var filtrado = $filter('filter')(convenios,id,"id");
                if(filtrado.length>0){
                    //console.log("filtrado",especialidad[0]);
                    deferred.resolve({result:true,convenio:filtrado[0]});                                    
                } else {
                   deferred.reject({result:false,errores:"No se encontró detalle para este convenio"});                
                }
            } else {
               deferred.reject({result:false,errores:"No se encontró detalle para este convenio"});                
            }
        },function(error){
           deferred.reject({result:false,errores:"No se encontró detalle para este convenio"});                
        });
        */
        var filtrado = $filter('filter')(convenios,id,"id");
        if(filtrado.length>0){
            //console.log("filtrado",especialidad[0]);
            deferred.resolve({result:true,convenio:filtrado[0]});                                    
        } else {
           deferred.reject({result:false,errores:"No se encontró detalle para este convenio"});                
        }
    }

    function obtenerConSlug (slug) {
        //console.info("convenioDAO: obtenerConSlug(); " + slug);
        var deferred = $q.defer();
        this.obtener().then(function(data){
            if(data.result){
                var convenios = data.convenios;
                var filtrado = convenios.filter(function(item){
                    return item.slug == slug
                });
                if(filtrado[0]){
                    deferred.resolve({result:true,convenio:filtrado[0]});                                    
                } else {
                   deferred.reject({result:false,errores:"No se encontró el detalle de este convenio"});                
                }
            } else {
               deferred.reject({result:false,errores:"No se pudieron cargar los convenios"});                
            }
        },function(error){
           deferred.reject({result:false,errores:"No se encontró detalle para este convenio"});                
        });
        return deferred.promise;
    }

    return {
        obtener:obtener,
        obtenerConID:obtenerConID,
        obtenerConSlug:obtenerConSlug
    }

}]);