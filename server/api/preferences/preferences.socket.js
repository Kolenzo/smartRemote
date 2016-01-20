/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Preferences = require('./preferences.model');

exports.register = function(socket) {
  Preferences.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Preferences.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('preferences:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('preferences:remove', doc);
}