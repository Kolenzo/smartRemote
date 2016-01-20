'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferencesSchema = new Schema({
  _id: String,
  userID: String,
  device: String,
  subID: Number,
  name: String,
  action: String,
  icon: String,
  proposal: String
});

module.exports = mongoose.model('Preferences', PreferencesSchema);
