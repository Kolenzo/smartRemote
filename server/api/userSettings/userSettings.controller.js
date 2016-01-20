'use strict';

var _ = require('lodash');
var UserSettings = require('./userSettings.model');

// Get list of userSettingss
exports.index = function(req, res) {
  UserSettings.find(function (err, userSettingss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(userSettingss);
  });
};

// Get a single userSettings
exports.show = function(req, res) {
  UserSettings.findById(req.params.id, function (err, userSettings) {
    if(err) { return handleError(res, err); }
    if(!userSettings) { return res.status(404).send('Not Found'); }
    return res.json(userSettings);
  });
};

// Creates a new userSettings in the DB.
exports.create = function(req, res) {
  UserSettings.create(req.body, function(err, userSettings) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(userSettings);
  });
};

// Updates an existing userSettings in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  UserSettings.findById(req.params.id, function (err, userSettings) {
    if (err) { return handleError(res, err); }
    if(!userSettings) { return res.status(404).send('Not Found'); }
    var updated = _.merge(userSettings, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(userSettings);
    });
  });
};

// Deletes a userSettings from the DB.
exports.destroy = function(req, res) {
  UserSettings.findById(req.params.id, function (err, userSettings) {
    if(err) { return handleError(res, err); }
    if(!userSettings) { return res.status(404).send('Not Found'); }
    userSettings.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}