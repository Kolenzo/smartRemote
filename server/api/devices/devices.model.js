'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DevicesSchema = new Schema({
  _id: String,
  name: String,
  username: String,
  password: String,
  type: String,
  ipAddress: String,
  macAddress: String,
  info: {}
});

module.exports = mongoose.model('Devices', DevicesSchema);
