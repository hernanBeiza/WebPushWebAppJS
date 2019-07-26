angular.module('topController', [])

.controller('topController', ['$scope', '$routeParams','$location','$ngBootbox',
  
	function($scope,$routeParams,$location,$ngBootbox){
      
		$scope.init = function(){
			console.log("topController: init();");
		}

	}

])
