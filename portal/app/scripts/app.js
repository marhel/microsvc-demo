'use strict';

/**
 * @ngdoc overview
 * @name portalApp
 * @description
 * # portalApp
 *
 * Main module of the application.
 */
angular
  .module('portalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        controllerAs: 'shop'
      })
      .when('/warehouse', {
        templateUrl: 'views/warehouse.html',
        controller: 'WarehouseCtrl',
        controllerAs: 'warehouse'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
