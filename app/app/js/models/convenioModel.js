angular.module('ConvenioModel', [])
.factory('ConvenioModel', ['$http', function($http) {  
    function ConvenioModel(id,slug,nombre,subtitulo,bajada,foto,preguntas) {
    	this.id = id;
    	this.slug = slug;
        this.nombre = nombre;
    	this.subtitulo = subtitulo;
        this.bajada = bajada;
        this.foto = foto;
        this.preguntas = preguntas;
    };
    ConvenioModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return ConvenioModel;
}]);