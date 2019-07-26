angular.module("backButton",[])
.directive('backButton', function(){
    return {
      restrict: 'E',
      template: '<button class="btn btn-default btn-block">Volver </button>',
      link: function(scope, element, attrs) {
        //back-button = backButton
        element.bind('click', goBack);
        function goBack() {
          history.back();
          scope.$apply();
        }
      }
    }
});