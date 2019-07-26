angular.module("tomaHorasDirective",['ngBootbox'])
.directive('tomaHorasDirective',['$ngBootbox', function($ngBootbox){
    return {
      restrict: 'E',
      scope:{
      },
      //template: 'soy el revolutionSlider',
      templateUrl: 'js/directives/TomaHorasDirective/tomaHorasDirective.html',
      link: function(scope, element, attrs) {
        //console.log("tomaHorasDirective.js");

        scope.clickSeccion = function(){
          //console.log("clickSeccion");
          /*
          var url = "http://agenda.policenter.cl/agendacliente/";
          var options = {
            size: 'large',
            message: '<iframe style="border:0;" src="'+url+'" height="100%" width="100%"></iframe>',
            title: 'Toma tu hora aquí',
            className: 'test-class',
            buttons: {
                 warning: {
                     label: "Cancelar",
                     className: "btn-warning",
                     callback: function() {  
                     }
                 }
            }
          };
          $ngBootbox.customDialog(options);
          */
        }

      }
    }
}]);