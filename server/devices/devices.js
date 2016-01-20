/**
 * Network devices configuration
 */

'use strict';

var Devices = require('../api/devices/devices.model');
//var UserSettings = require('../api/userSettings/userSettings.model');
var Preferences = require('../api/preferences/preferences.model');
var Proposals = require('../api/proposals/proposals.model');

var hue = require('node-hue-api');
var Mopidy = require("mopidy");

var deviceList = {};


function searchDevices() {
  hue.nupnpSearch(function (err, result) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      Device.update({macAddress: result[i].mac}, {
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

function fireAction(id) {
  Preferences.findById({_id: id}, function (err, action) {
    if (!err) {
      Proposals.findById({_id: action.proposal}, function(err,proposal){
        if(!err){
          var dev = deviceList[action.device];
          if (dev) {
            switch (dev.device.type) {
              case 'hue-light':
                if(action.subID){
                  deviceList[action.device].api.setLightState(action.subID, proposal.action);
                }
                break;
              case 'mopidy':
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

function connectDevices() {
  Devices.find({}, function (err, result) {
    for (var i = 0; i < result.length; i++) {
      switch (result[i].type) {
        case 'hue-light':
          var hueAPI = hue.HueApi;
          var username = '3ffd0751bc3b5e7277e67411f9bad13';
          var api = new hueAPI(result[i].ipaddress, username);
          deviceList[result[i]._id].api = api;
          deviceList[result[i]._id].device = result[i];
          break;
        case 'mopidy':
          break;
        default:
          break;
      }
    }
  });
}

function getDevices() {
  /*
  var dev = [];
  for(var i = 0; i < deviceList.length; i++){

  }
  */
  return [{_id: 'fsheufh', subID: 0, name: 'bathroom-light', type: 'hue-light'}, {_id: 'fsheufh', subID: 1, name: 'bedroom-light', type: 'hue-light'}];
}

exports.searchDevices = searchDevices;
exports.fireAction = fireAction;
exports.connectDevices = connectDevices;
exports.getDevices = getDevices;
