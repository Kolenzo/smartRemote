/**
 * Network devices configuration
 */

'use strict';

var Devices = require('../api/devices/devices.model');
var UserSettings = require('../api/userSettings/userSettings.model');
var Preferences = require('../api/preferences/preferences.model');
var Proposals = require('../api/proposals/proposals.model');

var hue = require('node-hue-api');
var Mopidy = require("mopidy");

var deviceList = new Array();


function searchDevices() {
  hue.nupnpSearch(function (err, result) {
    console.info("hue pnp", result);
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      Devices.update({macAddress: result[i].mac}, {
        _id: 'sbfsrsg23',
        name: result[i].name,
        type: 'hue-light',
        macAddress: result[i].mac,
        ipAddress: result[i].ipaddress,
        info: result[i]
      }, {upsert: true}, function (err, res) {

      });
    }
  });
}

function fireAction(button, user) {
  UserSettings.find({userID: user}, function(err, settings){
    var index = parseInt(button);
    console.log("settings",settings);
    if(settings.length > 0){
      var id = settings[0].actions[index];
      Preferences.findById({_id: id}, function (err, action) {
        if (!err) {
          console.log("prefs",action);
          Proposals.findById({_id: action.proposal}, function(err,proposal){
            console.log("proposal",proposal);
            if(!err){
              console.log("devList", deviceList);
              var dev = deviceList[action.device];
              console.log("device", dev);
              if (dev) {
                switch (dev.device.type) {
                  case 'hue-light':
                    if(!isNaN(action.subID)){
                      if(proposal.action.customAction){
                        switch (proposal.action.customAction){
                          case 'yellow':
                            deviceList[action.device].api.rgb(255,255,0);
                                break;
                          case 'brighter':
                            deviceList[action.device].api.bri_inc(10);
                                break;
                          case 'darker':
                            deviceList[action.device].api.bri_inc(-10);
                                break;
                          default:
                                break;
                        }
                      }else{
                        deviceList[action.device].api.setLightState(action.subID, proposal.action).fail(function(err){
                          console.info("error", err);
                        });
                      }
                      console.log("hue");

                    }
                    break;
                  case 'mopidy':
                    switch (proposal.action) {
                      case 'play':
                        deviceList[action.device].api.playback.resume();
                            break;
                      case 'pause':
                        deviceList[action.device].api.playback.pause();
                            break;
                      case 'next':
                        deviceList[action.device].api.playback.next();
                            break;
                      case 'previous':
                        deviceList[action.device].api.playback.previous();
                            break;
                      default:
                            break;
                    }
                    break;
                  default:
                    break;
                }
              }
            }
          });
        }
      });
    }
  });
}

function connectDevices() {
  Devices.find({}, function (err, result) {
    console.log("connect",result);
    for (var i = 0; i < result.length; i++) {
      switch (result[i].type) {
        case 'hue-light':
          var hueAPI = hue.HueApi;
          var username = '3ffd0751bc3b5e7277e67411f9bad13';
          console.log("connect-device", result[i]);
          var api = new hueAPI(result[i].ipAddress, username);
          deviceList[result[i]._id] = {};
          deviceList[result[i]._id].api = api;
          deviceList[result[i]._id].device = result[i];
          console.info(deviceList);
          break;
        case 'mopidy':
          var mopidy = new Mopidy({
            webSocketUrl: "ws://"+result[i].ipAddress+":6680/mopidy/ws/"
          });
          deviceList[result[i]._id] = {};
          deviceList[result[i]._id].api = mopidy;
          deviceList[result[i]._id].device = result[i];
          break;
        default:
          break;
      }
    }
  });
}

function getDevices() {
  //prodution code commented for live demo

  /**var dev = [];
  for(var i = 0; i < deviceList.length; i++){
    var type = deviceList[i].device.type;
    if(type == 'hue-light'){
      deviceList[i].api.lights(function(err, lights){
        if(!err){
          for(var j = 0; j < lights.lights.length; j++){
            dev.push({
              _id: deviceList.device._id,
              subID: lights.lights[j].id,
              name: lights.lights[j].name,
              type: type
            });
          }
        }
      });
    }else{
      dev.push(deviceList[i].device);
    }
  }
  return dev;**/

  return [{_id: '1', subID: 1, name: 'bedroom-light', type: 'hue-light'}, {_id: '2', name: 'Mopidy-Player', type: 'mopidy'}, {_id: '3', name: 'Coffee Maker', type: 'coffee'}];
}

exports.searchDevices = searchDevices;
exports.fireAction = fireAction;
exports.connectDevices = connectDevices;
exports.getDevices = getDevices;
