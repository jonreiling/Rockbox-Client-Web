'use strict';

/**
 * @ngdoc directive
 * @name rockboxWebClientApp.directive:albumDisplay
 * @description
 * # albumDisplay
 */
angular.module('rockboxWebClientApp')
  .directive('albumDisplay', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/album-display.html'
    };
  });
