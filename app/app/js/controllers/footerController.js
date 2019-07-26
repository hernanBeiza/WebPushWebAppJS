angular.module('footerController', [])

.controller('footerController', ['$scope', '$routeParams','$location',
  
	function($scope,$routeParams,$location){
      
		$scope.init = function(){
			console.log("footerController: init();");
		}

  }


])
