'use strict';

var _ = require('lodash');
var Proposals = require('./proposals.model');

// Get list of proposalss
exports.index = function(req, res) {
  Proposals.find(function (err, proposalss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(proposalss);
  });
};

// Get a single proposals
exports.show = function(req, res) {
  Proposals.findById(req.params.id, function (err, proposals) {
    if(err) { return handleError(res, err); }
    if(!proposals) { return res.status(404).send('Not Found'); }
    return res.json(proposals);
  });
};

// Creates a new proposals in the DB.
exports.create = function(req, res) {
  Proposals.create(req.body, function(err, proposals) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(proposals);
  });
};

// Updates an existing proposals in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Proposals.findById(req.params.id, function (err, proposals) {
    if (err) { return handleError(res, err); }
    if(!proposals) { return res.status(404).send('Not Found'); }
    var updated = _.merge(proposals, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(proposals);
    });
  });
};

// Deletes a proposals from the DB.
exports.destroy = function(req, res) {
  Proposals.findById(req.params.id, function (err, proposals) {
    if(err) { return handleError(res, err); }
    if(!proposals) { return res.status(404).send('Not Found'); }
    proposals.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}