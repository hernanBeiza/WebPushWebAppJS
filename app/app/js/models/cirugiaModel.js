angular.module('CirugiaModel', [])
.factory('CirugiaModel', ['$http', function($http) {  
    function CirugiaModel(id,nombre,total,copago) {
    	this.id = id;
    	this.nombre = nombre;
        this.total = total;
        this.copago = copago;
    };
    CirugiaModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return CirugiaModel;
}]);