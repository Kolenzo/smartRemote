'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSettingsSchema = new Schema({
  userID: String,
  actions: [String]
});

module.exports = mongoose.model('UserSettings', UserSettingsSchema);
