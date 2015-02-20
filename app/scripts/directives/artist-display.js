'use strict';

/**
 * @ngdoc directive
 * @name rockboxWebClientApp.directive:artistDisplay
 * @description
 * # artistDisplay
 */
angular.module('rockboxWebClientApp')
  .directive('artistDisplay', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/artist-display.html'
    };
  });
