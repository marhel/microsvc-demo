'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:WarehouseCtrl
 * @description
 * # WarehouseCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('WarehouseCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.getInfo = function () {
      $http.get("/warehouse/name").then(function(response) {
        $scope.name = response.data;
      });
      $http.get("/warehouse/host").then(function(response) {
        $scope.host = response.data[1];
        $scope.operatingsystem = response.data[0];
        if($scope.operatingsystem == "Linux") {
          $scope.operatingsystem += " " + response.data[2] + " " + response.data[3];
        }
      });
    }
  }]);
