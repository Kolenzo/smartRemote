'use strict';

var _ = require('lodash');
var Fingerprint = require('./fingerprint.model');

// Get list of fingerprints
exports.index = function(req, res) {
  Fingerprint.find(function (err, fingerprints) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(fingerprints);
  });
};

// Get a single fingerprint
exports.show = function(req, res) {
  Fingerprint.findById(req.params.id, function (err, fingerprint) {
    if(err) { return handleError(res, err); }
    if(!fingerprint) { return res.status(404).send('Not Found'); }
    return res.json(fingerprint);
  });
};

// Creates a new fingerprint in the DB.
exports.create = function(req, res) {
  Fingerprint.create(req.body, function(err, fingerprint) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(fingerprint);
  });
};

// Updates an existing fingerprint in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fingerprint.findById(req.params.id, function (err, fingerprint) {
    if (err) { return handleError(res, err); }
    if(!fingerprint) { return res.status(404).send('Not Found'); }
    var updated = _.merge(fingerprint, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(fingerprint);
    });
  });
};

// Deletes a fingerprint from the DB.
exports.destroy = function(req, res) {
  Fingerprint.findById(req.params.id, function (err, fingerprint) {
    if(err) { return handleError(res, err); }
    if(!fingerprint) { return res.status(404).send('Not Found'); }
    fingerprint.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}