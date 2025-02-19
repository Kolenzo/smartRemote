/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

var Device = require('../api/devices/devices.model');
var UserSettings = require('../api/userSettings/userSettings.model');
var Preferences = require('../api/preferences/preferences.model');
var Proposals = require('../api/proposals/proposals.model');
var Fingerprint = require('../api/fingerprint/fingerprint.model');

var gm = require('gm');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket, socketio, devices, tcp) {
  tcp.on('userID', function(id){
    socketio.sockets.emit('newUser', id);
  });

  socket.emit('devices', devices.getDevices());

  socket.on('executeAction', function(id){
    devices.fireAction(id);
  });

  socket.on('addUser', function(id){
    tcp.addUser();
    //Fingerprint.create({_id: id, active: true}, function(){});
  });

  socket.on('getRemoteImage', function(data){
    UserSettings.find({userID: data.user}, function(err, res){
      if(err) throw err;
      if(res.length > 0){
        var settings = res[0];
        var image = gm();
        for(var i = 0; i<6; i++) {
          var index = data.page * 6 + 1;
          if (index < settings.actions.length) {
            Preferences.findById({_id: settings.actions[index]}, function (err, action) {
              if (action) {
                image.in('-page', '+' + (((index % 2) * 87) + 13) + '+' + ((Math.floor(index / 2) * 82) + 18))
                  .in('../icons/' + action.icon);
              }
            });
          }
        }
        image.mosaic()
          .toBuffer(function(err, data) {
            if (err) { throw err; }
            socketio.sockets.emit('remoteImage', {img: data});
          });
      }
    });
  });

  socket.on('getActions', function(user){
    var sortedActions = [];
    UserSettings.find({userID: 'default'}, function(err, res){
      if(err) throw err;
      if(res.length > 0){
        var defaultSettings = res[0];
          Preferences.find({_id: { $in: defaultSettings.actions}}, function (err, actions) {
            for(var m = 0; m < defaultSettings.actions.length; m++){
              for(var n=0;n<actions.length;n++){
                if(actions[n]._id == defaultSettings.actions[m]){
                  sortedActions.push(actions[n]);
                }
              }
            }
            if(user == 'default'){
              console.info("actions", sortedActions);
              socketio.sockets.emit('actions', sortedActions);
            }else{
              UserSettings.find({userID: user}, function(err, res){
                if(err) throw err;
                if(res.length > 0){
                  var settings = res[0];
                    Preferences.find({_id: { $in: settings.actions}}, function (err, actions) {
                      for(var j = 0; j < settings.actions.length; j++){
                        for(var k=0;k<actions.length;k++){
                          if(actions[k]._id == settings.actions[j]){
                            sortedActions.push(actions[k]);
                          }
                        }
                      }
                      console.info("actions", sortedActions);
                      socketio.sockets.emit('actions', sortedActions);
                    });

                }
              });
            }
          });

      }
    });
  });

  socket.on('getProposals', function(){
    Proposals.find({}, function(err, res){
      if(err) throw err;
      socketio.sockets.emit('proposals', res);
    });
  });

  /*
  socket.on('getDevices', function(){
    devices.getDevices();
  });
  */

  socket.on('setPreferences', function(data){
    UserSettings.update({userID: data.user}, {actions: data.actions}, function (err, res) {

    });
  });

  socket.on('storeAction', function(action){
    Preferences.update({ _id: action._id}, action, {upsert: true}, function (err, preference) {
      UserSettings.update({userID: action.userID}, {$push:{actions: action._id}}, function (err, res) {
        socketio.sockets.emit('storedAction', {action: preference});
      });
    });
  });

  // Insert sockets below
  require('../api/proposals/proposals.socket').register(socket);
  require('../api/fingerprint/fingerprint.socket').register(socket);
  require('../api/devices/devices.socket').register(socket);
  require('../api/userSettings/userSettings.socket').register(socket);
  require('../api/preferences/preferences.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio, devices, tcp) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket, socketio, devices, tcp);
    console.info('[%s] CONNECTED', socket.address);
  });
};
