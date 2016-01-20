/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Fingerprint = require('./fingerprint.model');

exports.register = function(socket) {
  Fingerprint.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Fingerprint.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('fingerprint:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('fingerprint:remove', doc);
}