'use strict';

/**
 * @ngdoc function
 * @name rockboxWebClientApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the rockboxWebClientApp
 */
angular.module('rockboxWebClientApp')
  .controller('PlayerCtrl', function ($scope,socket,$location,$rootScope,$timeout,$window) {

    var timeoutInterval;
    var volumeSlideEngaged = true;

  	$scope.playing = false;
    $scope.radio = true;
  	$scope.volume = 20;
    $rootScope.queue = "";

    $scope.$on('socket:queueUpdate', function (ev, data) {

//        console.log(data);
        data = data.queue;
        if ( data == null ) data = [];
    	$scope.track = ( data.length != 0 ) ? data[0] : null;
        
        if ( data.length > 1 ) {
            $window.document.title = "Rockbox - " + data.length + " songs in the queue";
        } else {
            $window.document.title = "Rockbox";
        }

        //Build the queue string that we check against later.
        $rootScope.queue = "";
        for ( var i = 0 ; i < data.length ; i ++ ) {
            $rootScope.queue += data[i].uri+",";
        }

    });

    $scope.$on('socket:stateUpdate', function (ev, data) {
    	$scope.playing = data.playing;
        $scope.radio = data.radio;
    });

    $scope.$on('socket:volumeUpdate',function(ev, data) {
        $scope.volume = data.volume;
    });

    $scope.$on('socket:passthroughConnectionUpdate',function(ev, data) {
        if (!data) {
            alert('disconnected');
        }
    });

    $scope.toggleRadio = function() {
        $scope.radio = !$scope.radio;
        socket.emit('setRadio',$scope.radio);

    };

    $scope.togglePlayPause = function() {
    	socket.emit('pause');
    }

    $scope.skip = function() {
    	socket.emit('skip');
    }

    $scope.test = function() {
    	socket.emit('add','spotify:track:5ER4CebTR7M7JEV9XE5quI')
    }

    $scope.search = function() {
    	$location.path('/search/'+$scope.searchterms);
    }

    $scope.keyPress = function(keyCode) {
    	if ( keyCode == 13 ) {
	    	$location.path('/search/'+$scope.searchterms);
		}
    }

    $scope.updateVolume = function() {
        $timeout.cancel(timeoutInterval);
        timeoutInterval = $timeout(function() {
            socket.emit('setVolume',$scope.volume);

        }, 400);
    }

    $scope.volumeDown = function() {
        var vol = Number($scope.volume) - 10;
        if ( vol < 0 ) vol = 0;
        $scope.volume = vol;
        socket.emit('setVolume',vol);
    }

    $scope.volumeUp = function() {
        var vol = Number($scope.volume) + 10;
        if ( vol > 100 ) vol = 100;
        $scope.volume = vol;
        socket.emit('setVolume',vol);
    }

  });
