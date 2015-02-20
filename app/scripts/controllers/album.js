'use strict';

/**
 * @ngdoc function
 * @name rockboxWebClientApp.controller:AlbumCtrl
 * @description
 * # AlbumCtrl
 * Controller of the rockboxWebClientApp
 */
angular.module('rockboxWebClientApp')
  .controller('AlbumCtrl', function ($scope,$routeParams,Spotify,socket,$rootScope) {
	Spotify.getAlbum($routeParams.id,{'limit':50}).then(function (data) {
  		$scope.album = data;
  		
	});

	$scope.addTrack = function(id) {
		socket.emit('play',id);
	}	

      $scope.checkInQueue = function(id) {
        return ($rootScope.queue.indexOf(id) != -1 );
      }	
  });
