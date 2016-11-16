'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('ShippingCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.getInfo = function () {
      $http.get("/shipping/name").then(function(response) {
        $scope.name = response.data;
      });
      $http.get("/shipping/host").then(function(response) {
        $scope.host = response.data[1];
        $scope.operatingsystem = response.data[0];
        if($scope.operatingsystem == "Linux") {
          $scope.operatingsystem += " " + response.data[2] + " " + response.data[3];
        }
      });
    }
  }]);
