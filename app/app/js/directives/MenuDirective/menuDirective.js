angular.module("menuDirective",[])
.directive('menuDirective', function(){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/MenuDirective/menuDirective.html',
      link: function(scope, element, attrs) {
        //console.log("menuDirective.js");
        //console.log(element);
        // Nav Menu
        if (typeof theme.Nav !== 'undefined') {
          //console.log("ahora");
          //console.log(theme);
          //console.log(theme.Nav);
          theme.Nav.initialize();
          //Hay un problema cno los elementos creados dinámicamente
          /*
          angular.element(element).find('li>a[ui-sref]').on('click', function(e) {
            console.log("click ahora");
            //Subir 
            var delay = 1000;
            var easing = 'easeOutBack';
            angular.element('body, html').animate({scrollTop: 0}, delay, easing);
            //Cerrar menú
            angular.element(element).find("div").removeClass("in");
            //e.preventDefault();
          });
          */
        }

        scope.clickSeccion = function(){
          //console.log("menuDirective.js: clickSeccion();");          
          //Subir 
          var delay = 1000;
          var easing = 'easeOutBack';
          angular.element('body, html').animate({scrollTop: 0}, delay, easing);
          //Cerrar menú
          angular.element(element).find("div").removeClass("in");
        }

        //Activar plugin. Trar script de theme.init.js
        /*
        $(function() {
          // Ir al top

          // Nav Menu
          if (typeof theme.Nav !== 'undefined') {
            //console.log("ahora");
            //console.log(theme);
            //console.log(theme.Nav);
            theme.Nav.initialize();

            //angular.element(element)
            angular.element(element).find('a[ui-sref]').on('click', function(e) {
              //Subir 
              var delay = 1000;
              var easing = 'easeOutBack';
              angular.element('body, html').animate({scrollTop: 0}, delay, easing);
              //Cerrar menú
              angular.element(element).find("div").removeClass("in");
              //e.preventDefault();
            });

          }

        });
        */

      }

    }

});