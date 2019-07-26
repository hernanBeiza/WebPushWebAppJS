angular.module('NotificacionModel', [])
.factory('NotificacionModel', ['$http', function($http) {  
    function NotificacionModel(id,url,target,foto,tiempo) {
    	this.id = id;
        this.url = url;
    	this.target = target;
        this.foto = foto;
        this.tiempo = tiempo;
    };
    NotificacionModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return NotificacionModel;
}]);