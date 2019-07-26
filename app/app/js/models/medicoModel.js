angular.module('MedicoModel', [])
.factory('MedicoModel', ['$http', function($http) {  
    function MedicoModel(id,nombre,cargo,foto) {
    	this.id = id;
        this.nombre = nombre;
    	this.cargo = cargo;
        this.foto = foto;
    };
    MedicoModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return MedicoModel;
}]);