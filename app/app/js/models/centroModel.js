angular.module('CentroModel', [])
.factory('CentroModel', ['$http', function($http) {  
    function CentroModel(id,slug,nombre,subtitulo,bajada,foto,coordenadas) {
    	this.id = id;
    	this.slug = slug;
        this.nombre = nombre;
        this.subtitulo = subtitulo;
        this.bajada = bajada;
        this.foto = foto;
    	this.coordenadas = coordenadas;
    };
    CentroModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return CentroModel;
}]);