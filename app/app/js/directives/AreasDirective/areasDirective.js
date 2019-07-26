angular.module("areasDirective",[])
.directive('areasDirective', function(){
    return {
      restrict: 'E',
      //template: 'soy el revolutionSlider',
      templateUrl: 'js/directives/AreasDirective/areasDirective.html',
      link: function(scope, element, attrs) {
        //console.log("areasDirective.js");

        if ($.isFunction($.fn['themePluginCarousel'])) {

          $(function() {
            $('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
              var $this = $(this),
                opts;

              var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
              if (pluginOptions)
                opts = pluginOptions;

              $this.themePluginCarousel(opts);
            });
          });

        }

        scope.scrollTop = function(){
          //Subir 
          var delay = 1000;
          var easing = 'easeOutBack';
          angular.element('body, html').animate({scrollTop: 0}, delay, easing);
        }
        
      }

    }

});