angular.module('modalController', [])
.controller('modalController', ['$scope', '$routeParams','$uibModalInstance',
  
	function($scope,$routeParams,$uibModalInstance){

		$scope.init = function(){
			//console.log("modalController: init();");
		}

		$scope.cerrar = function(){
			//console.log("modalController: cerrar();");
			$uibModalInstance.dismiss("cancel");
		}

	}

])