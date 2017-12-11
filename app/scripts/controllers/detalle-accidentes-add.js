'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:DetalleAccidentesAddCtrl
 * @description
 * # DetalleAccidentesAddCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('DetalleAccidentesAddCtrl', function ($scope, TipoVehiculosService, 
    TipoServiciosService, $uibModalInstance, $utilsViewService,
    $uibModal) {
        
    $scope.getTipoVehiculos = function() {
        TipoVehiculosService.get(function(data) {
            $scope.tipo_vehiculos = data.tipo_vehiculos;
        });
    };
      
    $scope.getTipoServicios = function() {
        TipoServiciosService.get(function(data) {
            $scope.tipo_servicios = data.tipo_servicios;
        });
    };
    
    $scope.init = function() {
        $scope.getTipoVehiculos();
        $scope.getTipoServicios();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveDetalleAccidente = function(detalle_accidente, btn) {
        $utilsViewService.disable('#' + btn);
        $uibModalInstance.close(detalle_accidente);
    };
    
    $scope.showTipoVehiculosAdd = function($event) {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/tipo-vehiculos-add.html',
            controller: 'TipoVehiculosAddCtrl',
            backdrop: false
        });

        modalInstanceAdd.result.then(function (data) {
            console.log(data);
            $scope.message = data.message;
        });
    };
    
    
    $scope.showTipoServiciosAdd = function($event) {
        
    };
    
    $scope.init();
});