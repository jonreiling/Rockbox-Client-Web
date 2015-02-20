'use strict';

/**
 * @ngdoc directive
 * @name rockboxWebClientApp.directive:trackDisplay
 * @description
 * # trackDisplay
 */
angular.module('rockboxWebClientApp')
  .directive('trackDisplay', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/track-display.html'
    };
  });
