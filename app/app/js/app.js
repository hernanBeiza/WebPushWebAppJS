var app = angular.module('Policenter', [
  'constantes',
  'ngRoute','ngMessages','ngBootbox','ngSanitize',
  'ui.bootstrap','ngFileUpload','platanus.rut',
  'appController','topController','footerController',
  'indexController','modalController',
  'EspecialidadModel','CentroModel','ContactoModel','ConvenioModel','CirugiaModel','SliderModel','MedicoModel','NotificacionModel',
  'especialidadDAO','centroDAO','contactoDAO','trabajaDAO','convenioDAO','cirugiaDAO','sliderDAO','medicoDAO','notificacionDAO'
]);
app.config(['$locationProvider','$routeProvider',

  function($locationProvider,$routeProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');

    $routeProvider.
    when('/inicio', {
      templateUrl: 'views/indexView.html',
      controller: 'indexController',
      controllerAs: 'indexController'
    }).
    otherwise({
      redirectTo: '/inicio'
    });    

  }
])
.run(['$rootScope','ENV','$location','$window',
  function($rootScope,ENV,$location,$window){
  //console.log("app.js run");
  //console.log(ENV);    
}]);