angular.module('SliderModel', [])
.factory('SliderModel', ['$http', function($http) {  
    function SliderModel(id,url,target,foto,tiempo) {
    	this.id = id;
        this.url = url;
    	this.target = target;
        this.foto = foto;
        this.tiempo = tiempo;
    };
    SliderModel.prototype = {
        setData: function(data) {
            //console.log("ContactoModel: setData();");
            angular.extend(this, data);
        }
    };
    return SliderModel;
}]);