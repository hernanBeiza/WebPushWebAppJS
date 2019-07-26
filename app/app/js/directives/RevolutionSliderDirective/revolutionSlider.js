angular.module("revolutionSlider",[])
.directive('revolutionSlider', ['sliderDAO', function($sliderDAO){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/RevolutionSliderDirective/revolutionSlider.html',
      link: function(scope, element, attrs) {
        console.log("revolutionSlider.js");
        //console.log(element);
        //Obtener sliders
        $sliderDAO.obtener().then(function(data){
          //console.log(data);
          if(data.result){

            scope.model.sliders = data.sliders;       

            if ($.isFunction($.fn['themePluginRevolutionSlider'])) {

              $(function() {
                $('[data-plugin-revolution-slider]:not(.manual), .slider-container .slider:not(.manual)').each(function() {
                  var $this = $(this);
                  var opts;

                  var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                  //Si no hay opciones del plugin
                  if(angular.equals(pluginOptions, {})){
                    //Iniciar manual
                    console.warn("Iniciar plugin desde la directiva");
                  } else {
                    //Iniciar usando la configuración
                    opts = pluginOptions;
                  }
                  //console.log(opts);
                  $this.themePluginRevolutionSlider(opts);
                });
              });

            }
                 
          } else {

            console.warn("Hubo un error al obtener los sliders");

          }
          
        },function(error){

          console.error(error);

        });
        
      }

    }

}]);