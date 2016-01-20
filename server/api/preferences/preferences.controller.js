'use strict';

var _ = require('lodash');
var Preferences = require('./preferences.model');

// Get list of preferencess
exports.index = function(req, res) {
  Preferences.find(function (err, preferencess) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(preferencess);
  });
};

// Get a single preferences
exports.show = function(req, res) {
  Preferences.findById(req.params.id, function (err, preferences) {
    if(err) { return handleError(res, err); }
    if(!preferences) { return res.status(404).send('Not Found'); }
    return res.json(preferences);
  });
};

// Creates a new preferences in the DB.
exports.create = function(req, res) {
  Preferences.create(req.body, function(err, preferences) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(preferences);
  });
};

// Updates an existing preferences in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Preferences.findById(req.params.id, function (err, preferences) {
    if (err) { return handleError(res, err); }
    if(!preferences) { return res.status(404).send('Not Found'); }
    var updated = _.merge(preferences, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(preferences);
    });
  });
};

// Deletes a preferences from the DB.
exports.destroy = function(req, res) {
  Preferences.findById(req.params.id, function (err, preferences) {
    if(err) { return handleError(res, err); }
    if(!preferences) { return res.status(404).send('Not Found'); }
    preferences.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}