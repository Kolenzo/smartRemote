'use strict';

angular.module('smartRemoteApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.color = '#FFFFFF';

    socket.socket.on('proposals', function(data){
      console.log('proposals', JSON.stringify(data));
    });

    socket.socket.on('actions', function(data){
      console.log('actions', JSON.stringify(data));
    });

    socket.socket.on('devices', function(data){
      console.log('devices', JSON.stringify(data));
    });

  });
