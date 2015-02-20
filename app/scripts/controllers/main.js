'use strict';

/**
 * @ngdoc function
 * @name rockboxWebClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rockboxWebClientApp
 */
angular.module('rockboxWebClientApp')
  .controller('MainCtrl', function ($scope,Spotify) {


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
