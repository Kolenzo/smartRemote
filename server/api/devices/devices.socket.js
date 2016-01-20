/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Devices = require('./devices.model');

exports.register = function(socket) {
  Devices.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Devices.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('devices:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('devices:remove', doc);
}