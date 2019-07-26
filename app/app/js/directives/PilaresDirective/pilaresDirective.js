angular.module("pilaresDirective",[])
.directive('pilaresDirective', function(){
    return {
      restrict: 'E',
      scope:{
      },
      //template: 'soy el revolutionSlider',
      templateUrl: 'js/directives/PilaresDirective/pilaresDirective.html',
      link: function(scope, element, attrs) {
        //console.log("pilaresDirective.js");

        if ($.isFunction($.fn['themePluginAnimate'])) {

          $(function() {
            $('[data-appear-animation]').each(function() {
              var $this = $(this),
                opts;

              var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
              if (pluginOptions)
                opts = pluginOptions;

              $this.themePluginAnimate(opts);
            });
          });

        }

      }

    }

});