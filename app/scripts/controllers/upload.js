'use strict';

/**
 * @ngdoc function
 * @name sanesacttFrontendApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the sanesacttFrontendApp
 */
angular.module('sanesacttFrontendApp')
.controller('UploadCtrl', function ($scope, AccidentesService, UbicacionesService, CausasService, $uibModal) {
    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
        if( col.filters[0].term ){
            return 'header-filtered';
        } else {
            return '';
        }
    };
    
    $scope.lang = 'es';
    
    $scope.gridOptions = {
        showGridFooter: true,
        enableFiltering: true,
        enableSorting: true,
        enableGridMenu: true, 
        enableCellEditOnFocus: true,
        columnDefs: [
            { displayName: 'N°', name: 'nro', field: 'nro', headerCellClass: $scope.highlightFilteredHeader, enableCellEditOnFocus: false, width: '7%', minWidth: '2', enableCellEdit: false },
            { displayName: 'Fecha',  name: 'fecha', field: 'fecha', width: '10%', enableCellEditOnFocus: false, minWidth: '10', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { displayName: 'Hora',  name: 'hora', field: 'hora', width: '10%', enableCellEditOnFocus: false, minWidth: '10', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { displayName: 'Ubicación',  name: 'ubicacion', field: 'ubicacion', enableCellEditOnFocus: true, headerCellClass: $scope.highlightFilteredHeader, width: '25%', minWidth: '25'},
            { displayName: 'Causa',  name: 'causa', field: 'causa', enableCellEditOnFocus: true, width: '20%', minWidth: '20', headerCellClass: $scope.highlightFilteredHeader },
            { displayName: 'Tipo de Vehículo',  name: 'tipo_vehiculo', field: 'tipo_vehiculo', enableCellEditOnFocus: true, width: '20%', minWidth: '20', headerCellClass: $scope.highlightFilteredHeader },
            { displayName: 'Tipo de Servicio',  name: 'tipo_servicio', field: 'tipo_servicio', enableCellEditOnFocus: true, width: '20%', minWidth: '20', headerCellClass: $scope.highlightFilteredHeader },
            { displayName: 'Fll. H.',  name: 'fallecidos_hombres', field: 'fallecidos_hombres', enableCellEditOnFocus: false, width: '10%', minWidth: '10', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { displayName: 'Fll. M.',  name: 'fallecidos_mujeres', field: 'fallecidos_mujeres', enableCellEditOnFocus: false, width: '10%', minWidth: '10', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { displayName: 'Hr. H.',  name: 'heridos_hombres', field: 'heridos_hombres', enableCellEditOnFocus: false, width: '10%', minWidth: '10', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { displayName: 'Hr. M.',  name: 'heridos_mujeres', field: 'heridos_mujeres', enableCellEditOnFocus: false, width: '10%', minWidth: '10', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { displayName: 'Día',  name: 'dia', field: 'dia', enableCellEditOnFocus: false, width: '12%', minWidth: '12', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false }
        ]
    };
            
    $scope.uploadFile = function(csv, errFiles) {
        var fd = new FormData();
        fd.append('file', csv);
        
        AccidentesService.load(fd, function(data) {
            $scope.gridOptions.data = data.accidentes;
        });
    };
    
    $scope.saveAccidentes = function(accidentes, boton) {
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        AccidentesService.saveMany(accidentes, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $scope.message = data.message;
        });
    };
});