'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FingerprintSchema = new Schema({
  _id: String,
  active: Boolean
});

module.exports = mongoose.model('Fingerprint', FingerprintSchema);
