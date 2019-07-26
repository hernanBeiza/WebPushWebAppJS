angular.module('EspecialidadModel', [])
.factory('EspecialidadModel', ['$http', function($http) {  
    function EspecialidadModel(id,menu,slug,nombre,subtitulo,bajada,foto,fotoDetalle,preguntas) {
    	this.id = id;
        this.menu = menu;
    	this.slug = slug;
        this.nombre = nombre;
    	this.subtitulo = subtitulo;
        this.bajada = bajada;
        this.foto = foto;
    	this.fotoDetalle = fotoDetalle;
    	this.preguntas = preguntas;        
    };
    EspecialidadModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return EspecialidadModel;
}]);