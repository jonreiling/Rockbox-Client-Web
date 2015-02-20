'use strict';

/**
 * @ngdoc function
 * @name rockboxWebClientApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the rockboxWebClientApp
 */
angular.module('rockboxWebClientApp')
  .controller('SearchCtrl', function ($scope,$routeParams,Spotify,socket,$rootScope) {
  		Spotify.search($routeParams.searchterm, 'artist,track,album',{'limit':50,country:'US'}).then(function (data) {
  			$scope.tracks = data.tracks.items;
  			$scope.artists = data.artists.items;
  			$scope.albums = data.albums.items;
		});

  		$scope.addTrack = function(id) {
  			socket.emit('play',id);
  		}

      $scope.checkInQueue = function(id) {
        return ($rootScope.queue.indexOf(id) != -1 );
      }

      

  });


angular.module('rockboxWebClientApp').directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
});