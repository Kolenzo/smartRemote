'use strict';

var _ = require('lodash');
var Devices = require('./devices.model');

// Get list of devicess
exports.index = function(req, res) {
  Devices.find(function (err, devicess) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(devicess);
  });
};

// Get a single devices
exports.show = function(req, res) {
  Devices.findById(req.params.id, function (err, devices) {
    if(err) { return handleError(res, err); }
    if(!devices) { return res.status(404).send('Not Found'); }
    return res.json(devices);
  });
};

// Creates a new devices in the DB.
exports.create = function(req, res) {
  Devices.create(req.body, function(err, devices) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(devices);
  });
};

// Updates an existing devices in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Devices.findById(req.params.id, function (err, devices) {
    if (err) { return handleError(res, err); }
    if(!devices) { return res.status(404).send('Not Found'); }
    var updated = _.merge(devices, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(devices);
    });
  });
};

// Deletes a devices from the DB.
exports.destroy = function(req, res) {
  Devices.findById(req.params.id, function (err, devices) {
    if(err) { return handleError(res, err); }
    if(!devices) { return res.status(404).send('Not Found'); }
    devices.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}