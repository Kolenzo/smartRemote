/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io'
});

//setting up devices
var devices = require('./devices/devices');

require('./config/socketio')(socketio, devices);
require('./config/express')(app);
require('./routes')(app);

var mdns = require('mdns');

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  var ad = mdns.createAdvertisement(mdns.tcp('_http'), 9000, {
    name: 'Smart-Remote-Server'
  });
  ad.start();

  var spark = require('spark');
  spark.login({accessToken: '552a4618eaf1149241c647b1dc33879eca2fa11f'}, function(err, body){
    spark.onEvent('btn_press', function(data) {
      console.info("spark data", data);
      if(data.data === '0'){
        socketio.sockets.emit('setScreenLight', {rgb: '#0000ff'});
      }else if(data.data === '1'){
        socketio.sockets.emit('setScreenLight', {rgb: '#00ff00'});
      }else if(data.data === '2'){
        socketio.sockets.emit('setScreenLight', {rgb: '#ff0000'});
      }
    });
  });
});

// Expose app
exports = module.exports = app;
