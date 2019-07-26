angular.module("sliderDAO",['SliderModel'])
.factory('sliderDAO',  ['$http','$q','ENV','SliderModel', function($http,$q,ENV,SliderModel){ 

    function obtener() {
        console.info("sliderDAO: obtener();");
        var deferred = $q.defer();
        var ruta = ENV.URLRecursos+"data/sliders.json";
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
            console.info("sliderDAO.js: obtenerComplete");
            console.info(json);
            if(json.data.result){
                var sliders = [];
                for (var i = 0;i<json.data.sliders.length; i++) {
                    var row = json.data.sliders[i];
                    var model = new SliderModel(row.id,row.url,row.target,row.foto,row.tiempo);
                    sliders.push(model);
                }
                deferred.resolve({result:true,sliders:sliders});
            } else {
                deferred.reject({result:false,errores:data.errores});
            }
        }, function obtenerError(data){
            console.error("sliderDAO.js: obtenerError");
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

    return {
        obtener:obtener
    }

}]);