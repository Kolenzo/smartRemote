/**
 * TCP Connection to the remote
 */

'use strict';

var util = require('util');

var UserSettings = require('../api/userSettings/userSettings.model');
var Preferences = require('../api/preferences/preferences.model');
var Proposals = require('../api/proposals/proposals.model');
var Fingerprint = require('../api/fingerprint/fingerprint.model');

var gm = require('gm');
var carrier = require('carrier');

var currentUser = 'default';
var userTimeout;

var remoteSocket;

var EventEmitter = require('events').EventEmitter;

var TCP = function(tcp, devices){
  var server = tcp.createServer(function(socket) {
    remoteSocket = socket;
    carrier.carry(socket, function(data) {
      console.info('data', data.toString());
      var dataString = data.toString();
      var obj = JSON.parse(dataString);
      console.info(obj);
      if(obj.type){
        switch (obj.type){
          case 'remote user identified':
            currentUser = obj.userID;
            clearTimeout(userTimeout);
            userTimeout = setTimeout(function(){
              currentUser = 'default';
              var ee = new EventEmitter();
              ee.emit('userID', 'default');
            },5000);
            //getImage(obj, socket);
            var ee = new EventEmitter()
            ee.emit('userID', obj.userID);
            break;
          case 'remote user created':
            authUser(obj, socket);
            break;
          case 'fire action':
            devices.fireAction(obj.buttonID, currentUser);
            break;
          case 'remote status':
            //devices.connectDevices();
            break;
          default :
            break;
        }
      }
    });
  });

  server.listen(3000, '0.0.0.0');

  console.info('Server listening on port 3000');
  getImage({userID: '1'});
}

function authUser(obj, socket){
  Fingerprint.create({_id: obj.userID, active: true}, function(err, res){
    console.info("created", res);
  });
}

function getImage(obj, socket){
  UserSettings.find({userID: obj.userID}, function(err, res){
    if(err) throw err;
    if(res.length > 0){
      var settings = res[0];
      var image = gm();
      for(var i = 0; i<6; i++) {
        var index = obj.page * 6 + 1;
        if (index < settings.actions.length) {
          Preferences.findById({_id: settings.actions[index]}, function (err, action) {
            if (action) {
              image.in('-page', '+' + (((index % 2) * 87) + 13) + '+' + ((Math.floor(index / 2) * 82) + 18))
                .in('../icons/' + action.icon);
            }
          });
        }
      }
      image.mosaic().rotate('white', 180).command("convert XBM:-")
        .toBuffer(function(err, data) {
          console.info("bytes", data);
          //socket.write(data);
        });
    }
  });
}

util.inherits(TCP, EventEmitter);
module.exports = TCP;
