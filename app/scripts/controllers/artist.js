'use strict';

/**
 * @ngdoc function
 * @name rockboxWebClientApp.controller:ArtistCtrl
 * @description
 * # ArtistCtrl
 * Controller of the rockboxWebClientApp
 */
angular.module('rockboxWebClientApp')
  .controller('ArtistCtrl', function ($scope,$routeParams,Spotify) {
	

	Spotify.getArtist($routeParams.id).then(function (artistData) {

		Spotify.getArtistAlbums($routeParams.id,{ album_type: 'album,single,appears_on' , limit:'50', country:'US'}).then(function (albumData) {

			$scope.artist = artistData;
			$scope.albums = albumData.items;

		});
	});

  });