'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProposalsSchema = new Schema({
  _id: String,
  name: String,
  type: String,
  icon: String,
  action: {}
});

module.exports = mongoose.model('Proposals', ProposalsSchema);
