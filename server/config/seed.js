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
    _id: '1',
    name: 'Philips Hue',
    type: 'hue-light',
    ipAddress: '192.168.178.34',
    macAddress: '00:00:00:00:00:00',
    info: {}
  },{
    _id: '2',
    name: 'Mopidy-Player',
    type: 'mopidy',
    ipAddress: '192.168.178.35',
    macAddress: '00:00:00:00:00:00',
    info: {}
  },{
    _id: '3',
    name: 'Coffee Maker',
    type: 'coffee',
    ipAddress: '192.168.178.100',
    macAddress: '00:00:00:00:00:00',
    info: {}
  });
});

Fingerprint.find({}).remove(function(){
  Fingerprint.create({
    _id: "1",
    active: true
  },{
    _id: "2",
    active: true
  });
});

Preferences.find({}).remove(function() {
  Preferences.create({
    _id: '1',
    userID: '1',
    device: '3',
    subID: 1,
    name: 'Milk Coffee',
    action: 'Make milk coffee',
    icon: 'icon_coffee_milkcoffee.png',
    proposal: '17'
  },{
    _id: '2',
    userID: '1',
    device: '3',
    subID: 1,
    name: 'Coffee',
    action: 'Make coffee',
    icon: 'icon_coffee_coffee.png',
    proposal: '14'
  },{
    _id: '3',
    userID: '1',
    device: '3',
    subID: 1,
    name: 'Crema',
    action: 'Make Crema',
    icon: 'icon_coffee_crema.png',
    proposal: '15'
  },{
    _id: '4',
    userID: '1',
    device: '3',
    subID: 1,
    name: 'Latte',
    action: 'Make Latte',
    icon: 'icon_coffee_late.png',
    proposal: '16'
  },{
    _id: '5',
    userID: '1',
    device: '1',
    subID: 1,
    name: 'Green',
    action: 'Turn bedroom light green',
    icon: 'icon_lights_green.png',
    proposal: '3'
  },{
    _id: '6',
    userID: '1',
    device: '1',
    subID: 1,
    name: 'Yellow',
    action: 'Turn bedroom light yellow',
    icon: 'icon_lights_yellow.png',
    proposal: '4'
  },{
    _id: '7',
    userID: '1',
    device: '2',
    subID: 1,
    name: 'Play',
    action: 'Play Mediaplayer',
    icon: 'icon_stereo_play.png',
    proposal: '9'
  },{
    _id: '8',
    userID: '1',
    device: '2',
    subID: 1,
    name: 'Fast Forawrd',
    action: 'Fast Forward Mediaplayer',
    icon: 'icon_stereo_fastforward.png',
    proposal: '13'
  },{
    _id: '9',
    userID: '1',
    device: '2',
    subID: 1,
    name: 'Previous',
    action: 'Play previous song',
    icon: 'icon_stereo_lastsong.png',
    proposal: '12'
  },{
    _id: '10',
    userID: '1',
    device: '2',
    subID: 1,
    name: 'Next',
    action: 'Play next song',
    icon: 'icon_stereo_nextsong.png',
    proposal: '11'
  },{
    _id: '11',
    userID: '1',
    device: '2',
    subID: 1,
    name: 'Pause',
    action: 'Play Mediaplayer',
    icon: 'icon_stereo_pause.png',
    proposal: '10'
  },{
    _id: '12',
    userID: '1',
    device: '3',
    subID: 1,
    name: 'Milk Coffee',
    action: 'Make Milkcoffee',
    icon: 'icon_coffee_milkcoffee.png',
    proposal: '17'
  },{
    _id: '13',
    userID: '2',
    device: '1',
    subID: 1,
    name: 'Darker',
    action: 'Darken the bedroom light',
    icon: 'icon_lights_fewer.png',
    proposal: '7'
  },{
    _id: '14',
    userID: '2',
    device: '1',
    subID: 1,
    name: 'Brighter',
    action: 'Brighten the bedroom lights',
    icon: 'icon_lights_brighter.png',
    proposal: '8'
  },{
    _id: '15',
    userID: '2',
    device: '1',
    subID: 1,
    name: 'Blue',
    action: 'turn bedroom-light blue',
    icon: 'icon_lights_blue.png',
    proposal: '2'
  },{
    _id: '16',
    userID: '2',
    device: '2',
    subID: 1,
    name: 'Red',
    action: 'turn bedroom-light red',
    icon: 'icon_lights_red.png',
    proposal: '1'
  },{
    _id: '17',
    userID: '2',
    device: '2',
    subID: 1,
    name: 'Green',
    action: 'turn bedroom-light green',
    icon: 'icon_lights_green.png',
    proposal: '3'
  },{
    _id: '18',
    userID: '2',
    device: '2',
    subID: 1,
    name: 'Yellow',
    action: 'turn bedroom-light yellow',
    icon: 'icon_lights_yellow.png',
    proposal: '4'
  },{
    _id: '19',
      userID: '2',
      device: '1',
      subID: 1,
      name: 'Darker',
    action: 'Darken the bedroom light',
    icon: 'icon_lights_fewer.png',
      proposal: '7'
  },{
    _id: '20',
      userID: '2',
      device: '1',
      subID: 1,
      name: 'Fast Forward',
    action: 'Fast Forward Mediaplayer',
    icon: 'icon_stereo_fastforward.png',
      proposal: '13'
  },{
    _id: '21',
      userID: '2',
      device: '1',
      subID: 1,
      name: 'Crema',
    action: 'Make coffee Crema',
    icon: 'icon_coffee_crema.png',
      proposal: '15'
  },{
    _id: '22',
      userID: '2',
      device: '2',
      subID: 1,
      name: 'Play',
      action: 'Play music player',
      icon: 'icon_stereo_play.png',
      proposal: '9'
  },{
    _id: '23',
      userID: '2',
      device: '2',
      subID: 1,
      name: 'Green',
    action: 'turn bedroom-light green',
    icon: 'icon_lights_green.png',
      proposal: '3'
  },{
    _id: '24',
      userID: '2',
      device: '2',
      subID: 1,
      name: 'Milkcoffee',
    action: 'Make milk coffee',
    icon: 'icon_coffee_milkcoffee.png',
      proposal: '17'
  },{
    _id: '25',
    userID: 'default',
    device: '2',
    subID: 1,
    name: 'Play',
    action: 'Play music player',
    icon: 'icon_stereo_play.png',
    proposal: '9'
  },{
    _id: '26',
    userID: 'default',
    device: '2',
    subID: 1,
    name: 'Next',
    action: 'Next song',
    icon: 'icon_stereo_nextsong.png',
    proposal: '11'
  },{
    _id: '27',
    userID: 'default',
    device: '2',
    subID: 1,
    name: 'Coffee',
    action: 'Make Coffee',
    icon: 'icon_coffee_coffee.png',
    proposal: '14'
  },{
    _id: '28',
    userID: 'default',
    device: '2',
    subID: 1,
    name: 'Red',
    action: 'Turn bedroom light red',
    icon: 'icon_lights_red.png',
    proposal: '1'
  },{
    _id: '29',
    userID: 'default',
    device: '1',
    subID: 1,
    name: 'Green',
    action: 'turn bedroom light green',
    icon: 'icon_lights_green.png',
    proposal: '3'
  },{
    _id: '30',
    userID: 'default',
    device: '1',
    subID: 1,
    name: 'Crema',
    action: 'Make coffee Crema',
    icon: 'icon_coffee_crema.png',
    proposal: '15'
  });
});

UserSettings.find({}).remove(function() {
  UserSettings.create({
    userID: 'default',
    actions: ['25', '26', '27', '28', '29', '30']
  },{
    userID: '1',
    actions: ['1', '2', '3', '4', '5']
  },{
    userID: '2',
    actions: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
  });
});

Proposals.find({}).remove(function() {
  Proposals.create({
    _id: '1',
    name: 'Red',
    type: 'hue-light',
    icon: 'icon_lights_red.png',
    action: {"on":true,"bri":222,"hue":65527,"sat":253,"effect":"none","xy":[0.6736,0.3221],"ct":500,"alert":"select","colormode":"xy","reachable":true}
  },{
    _id: '2',
    name: 'Blue',
    type: 'hue-light',
    icon: 'icon_lights_blue.png',
    action: {"on":true,"bri":245,"hue":65527,"sat":253,"effect":"none","xy":[0.1918,0.0882],"ct":500,"alert":"select","colormode":"xy","reachable":true}
  },{
    _id: '3',
    name: 'Green',
    type: 'hue-light',
    icon: 'icon_lights_green.png',
    action: {"on":true,"bri":254,"hue":16425,"sat":252,"effect":"none","xy":[0.4080,0.5170],"ct":447,"alert":"select","colormode":"xy","reachable":true}
  },{
    _id: '4',
    name: 'Yellow',
    type: 'hue-light',
    icon: 'icon_lights_yellow.png',
    action: {
      customAction: 'yellow'
    }
  },{
    _id: '5',
    name: 'Off',
    type: 'hue-light',
    icon: 'icon_lights_off.png',
    action: {"on":false}
  },{
    _id: '6',
    name: 'On',
    type: 'hue-light',
    icon: 'icon_lights_on.png',
    action: {"on":true}
  },{
    _id: '7',
    name: 'Darker',
    type: 'hue-light',
    icon: 'icon_lights_fewer.png',
    action: {
      customAction: 'darker'
    }
  },{
    _id: '8',
    name: 'Brighter',
    type: 'hue-light',
    icon: 'icon_lights_brighter.png',
    action: {
      customAction: 'brighter'
    }
  },{
    _id: '9',
    name: 'Play',
    type: 'mopidy',
    icon: 'icon_stereo_play.png',
    action: {action: 'play'}
  },{
    _id: '10',
    name: 'Pause',
    type: 'mopidy',
    icon: 'icon_stereo_pause.png',
    action: {action: 'pause'}
  },{
    _id: '11',
    name: 'Next',
    type: 'mopidy',
    icon: 'icon_stereo_nextsong.png',
    action: {action: 'next'}
  },{
    _id: '12',
    name: 'Previous',
    type: 'mopidy',
    icon: 'icon_stereo_lastsong.png',
    action: {action: 'previous'}
  },{
    _id: '13',
    name: 'Fast-Forward',
    type: 'mopidy',
    icon: 'icon_stereo_fastforward.png',
    action: {action: 'none'}
  },{
    _id: '14',
    name: 'Coffee',
    type: 'coffee',
    icon: 'icon_coffee_coffee.png',
    action: {action: 'none'}
  },{
    _id: '15',
    name: 'Crema',
    type: 'coffee',
    icon: 'icon_coffee_crema.png',
    action: {action: 'none'}
  },{
    _id: '16',
    name: 'Latte',
    type: 'coffee',
    icon: 'icon_coffee_late.png',
    action: {action: 'none'}
  },{
    _id: '17',
    name: 'Milkcoffee',
    type: 'coffee',
    icon: 'icon_coffee_milkcoffee.png',
    action: {action: 'none'}
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
