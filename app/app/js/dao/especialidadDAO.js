angular.module("especialidadDAO",['EspecialidadModel'])
.factory('especialidadDAO',  ['$http','$q','ENV','EspecialidadModel','$filter', function($http,$q,ENV,EspecialidadModel,$filter){ 

    function obtener() {
        //console.info("especialidadDAO: obtener();");
        var deferred = $q.defer();
        //TODO
        //Completar para cada especialidad
        /*
        var pregunta1 = {label:"Pregunta Uno",bajada:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque neque eget diam posuere porta. Quisque ut nulla at nunc <a href='#'>vehicula</a> lacinia. Proin adipiscing porta tellus, ut feugiat nibh adipiscing sit amet. In eu justo a felis faucibus ornare vel id metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In eu libero ligula. Fusce eget metus lorem, ac viverra leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque neque eget diam posuere porta. Quisque ut nulla at nunc <a href='#'>vehicula</a> lacinia. </p>"};
        var pregunta2 = {label:"Pregunta Dos",bajada:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque neque eget diam posuere porta. Quisque ut nulla at nunc <a href='#'>vehicula</a> lacinia. Proin adipiscing porta tellus, ut feugiat nibh adipiscing sit amet. In eu justo a felis faucibus ornare vel id metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In eu libero ligula. Fusce eget metus lorem, ac viverra leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque neque eget diam posuere porta. Quisque ut nulla at nunc <a href='#'>vehicula</a> lacinia. </p>"};
        var preguntas = [pregunta1,pregunta2];         
        // Especialidades        
        var cardiologia = {id:1,slug:"cardiologia",nombre:"Cardiología",subtitulo:"Sub Cardio",preguntas:preguntas}
        var neurologia = {id:2,slug:"neurologia",nombre:"Neurología",subtitulo:"Sub Neuro",preguntas:preguntas}
        var dental = {id:3,slug:"dental",nombre:"Dental",subtitulo:"Sub Dent",preguntas:preguntas}
        var ginecologia = {id:4,slug:"ginecologia",nombre:"Ginecología",subtitulo:"Sub Gine",preguntas:preguntas}
        var kinesiologia = {id:5,slug:"kinesiologia",nombre:"Kinesiología",subtitulo:"Sub Kine",preguntas:preguntas}

        var especialidades = [cardiologia,neurologia,dental,ginecologia,kinesiologia];   

        deferred.resolve({result:true,especialidades:especialidades});
        return deferred.promise;
        */
        var ruta = ENV.URLRecursos+"data/especialidades.json";
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
            //console.info("especialidadDAO.js: enviarComplete");
            //console.info(json);
            if(json.data.result){
                var especialidades = [];
                for (var i = 0;i<json.data.especialidades.length; i++) {
                    var row = json.data.especialidades[i];
                    var model = new EspecialidadModel(row.id,row.menu,row.slug,row.nombre,row.subtitulo,row.bajada,row.foto,row.fotoDetalle,row.preguntas);
                    especialidades.push(model);
                }
                deferred.resolve({result:true,especialidades:especialidades});
            } else {
                deferred.reject({result:false,errores:data.errores});
            }
        }, function enviarError(data){
            console.error("especialidadDAO.js: enviarError");
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
    
    function obtenerConID (especialidades,id) {
        //console.info("especialidadDAO: obtenerConID(); " + id);
        var deferred = $q.defer();
        // Especialidades
        /*
        this.obtener().then(function(data){
            console.log(data);
            if(data.result){
                var especialidades = data.especialidades;
                //$filter('filter')(array, expression, comparator, anyPropertyKey)
                var filtrado = $filter('filter')(especialidades,id,"id");
                if(filtrado.length>0){
                    //console.log("filtrado",especialidad[0]);
                    deferred.resolve({result:true,especialidad:filtrado[0]});                                    
                } else {
                   deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                
                }
            } else {
                deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                
            }
        },function(error){
            deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                
        });
        */
        var filtrado = $filter('filter')(especialidades,id,"id");
        if(filtrado.length>0){
            //console.log("filtrado",especialidad[0]);
            deferred.resolve({result:true,especialidad:filtrado[0]});                                    
        } else {
           deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                
        }
        return deferred.promise;
    }

    function obtenerConSlug (especialidades,slug) {
        //console.info("especialidadDAO: obtenerConSlug(); " + slug);
        var deferred = $q.defer();
        // Especialidades
        /*
        this.obtener().then(function(data){
            console.log(data);
            if(data.result){
                var especialidades = data.especialidades;
                //$filter('filter')(array, expression, comparator, anyPropertyKey)
                var filtrado = $filter('filter')(especialidades,slug,"slug");
                if(filtrado.length>0){
                    //console.log("filtrado",especialidad[0]);
                    deferred.resolve({result:true,especialidad:filtrado[0]});                                    
                } else {
                   deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                
                }
            } else {
               deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                                
            }
        },function(error){
            deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                
        });
        */
        var filtrado = $filter('filter')(especialidades,slug,"slug");
        if(filtrado.length>0){
            //console.log("filtrado",especialidad[0]);
            deferred.resolve({result:true,especialidad:filtrado[0]});                                    
        } else {
           deferred.reject({result:false,errores:"No se encontró detalle para esta especialidad"});                
        }
        return deferred.promise;
    }

    return {
        obtener:obtener,
        obtenerConID:obtenerConID,
        obtenerConSlug:obtenerConSlug
    }

}]);