angular.module("headerDirective",[])
.directive('headerDirective', function(){
    return {
      restrict: 'E',
      scope:{
        titulo:'@',
        subtitulo:'@'
      },
      templateUrl: 'js/directives/HeaderDirective/headerDirective.html',
      link: function(scope, element, attrs) {
        //console.log("headerDirective.js");
        //console.log(attrs);
      }

    }

});