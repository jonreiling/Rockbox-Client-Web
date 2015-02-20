'use strict';

/**
 * @ngdoc overview
 * @name rockboxWebClientApp
 * @description
 * # rockboxWebClientApp
 *
 * Main module of the application.
 */
angular
  .module('rockboxWebClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io',
    'spotify'
  ])
  .factory('socket', function (socketFactory) {

      var mySocket = socketFactory({
        ioSocket: io.connect('rockbox-reiling.rhcloud.com:8000/rockbox-client')
      });

      mySocket.forward('trackUpdate');
      mySocket.forward('stateUpdate');
      mySocket.forward('volumeUpdate');

      return mySocket;
  })  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/search/:searchterm', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/artist/:id', {
        templateUrl: 'views/artist.html',
        controller: 'ArtistCtrl'
      })
      .when('/album/:id', {
        templateUrl: 'views/album.html',
        controller: 'AlbumCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

