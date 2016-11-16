'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('ShopCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.getInfo = function () {
      $http.get("/webshop/name").then(function(response) {
        $scope.name = response.data;
      });
      $http.get("/webshop/host").then(function(response) {
        $scope.host = response.data[1];
        $scope.operatingsystem = response.data[0].split(" #1")[0];
        if($scope.operatingsystem == "Linux") {
          $scope.operatingsystem += " " + response.data[2];
        }
      });
    }
  }]);
