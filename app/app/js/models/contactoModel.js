angular.module('ContactoModel', [])
.factory('ContactoModel', ['$http', function($http) {  
    function ContactoModel(rut,nombre,email,telefono,mensaje,archivo) {
        this.rut = rut;
    	this.nombre = nombre;
    	this.email = email;
        this.telefono = telefono;
        this.mensaje = mensaje;
        this.archivo = archivo
    };
    ContactoModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return ContactoModel;
}]);