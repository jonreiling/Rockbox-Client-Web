'use strict';

/**
 * @ngdoc function
 * @name rockboxWebClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rockboxWebClientApp
 */
angular.module('rockboxWebClientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
