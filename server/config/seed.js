/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Device = require('../api/devices/devices.model');
var UserSettings = require('../api/userSettings/userSettings.model');
var Preferences = require('../api/preferences/preferences.model');
var Fingerprint = require('../api/fingerprint/fingerprint.model');
var Proposals = require('../api/proposals/proposals.model');

Device.find({}).remove(function(){
  Device.create({
    _id: 'fsheufh',
    name: 'Philips Hue',
    type: 'hue-light',
    ipAddress: '127.0.0.1',
    macAddress: '00:00:00:00:00:00',
    info: {}
  });
});

Fingerprint.find({}).remove(function() {
  Fingerprint.create({
    _id: '123abc',
    active: true
  });
});

Preferences.find({}).remove(function() {
  Preferences.create({
    _id: 'irgubrkgb',
    userID: '123abc',
    device: 'fsheufh',
    subID: 0,
    name: 'Red',
    action: 'turn bathroom-light red',
    icon: 'icon_lights_red.png',
    proposal: 'bsrgr8g'
  });
});

UserSettings.find({}).remove(function() {
  UserSettings.create({
    userID: '123abc',
    actions: ['irgubrkgb']
  });
});

Proposals.find({}).remove(function() {
  Proposals.create({
    _id: 'bsrgr8g',
    name: 'Red',
    type: 'hue-light',
    icon: 'icon_lights_red.png',
    action: {
      rgb: '255,0,0'
    }
  },{
    _id: 'kughsr4',
    name: 'Blue',
    type: 'hue-light',
    icon: 'icon_lights_blue.png',
    action: {
      rgb: '0,0,255'
    }
  },{
    _id: 'izt498',
    name: 'Green',
    type: 'hue-light',
    icon: 'icon_lights_green.png',
    action: {
      rgb: '0,255,0'
    }
  });
});

Thing.find({}).remove(function() {

});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
