'use strict';

angular.module('smartRemoteApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.color = '#FFFFFF';

    socket.socket.on('setScreenLight', function(data){
      console.log('setLight', data);
      $scope.color = data.rgb;
      console.log('light', $scope.color);
    });
  });
