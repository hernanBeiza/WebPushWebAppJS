angular.module("nosotrosDirective",[])
.directive('nosotrosDirective', function(){
    return {
      restrict: 'E',
      scope:{
        titulo:'@',
        preguntas:'='
      },
      //template: 'soy el revolutionSlider',
      templateUrl: 'js/directives/NosotrosDirective/nosotrosDirective.html',
      link: function(scope, element, attrs) {
        //console.log("nosotrosDirective.js");
        /*
        for (var i = 0;i<scope.preguntas.length; i++) {
          var pregunta = scope.preguntas[i];
          //console.log(pregunta);
        }
        */

        //Activar plugin JQuery
        if ($.isFunction($.fn['themePluginToggle'])) {

          $(function() {
            $('[data-plugin-toggle]:not(.manual)').each(function() {
              var $this = $(this),
                opts;

              var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
              if (pluginOptions)
                opts = pluginOptions;

              $this.themePluginToggle(opts);
            });
          });

        }


      }

    }

});