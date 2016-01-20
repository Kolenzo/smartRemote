/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var UserSettings = require('./userSettings.model');

exports.register = function(socket) {
  UserSettings.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  UserSettings.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('userSettings:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('userSettings:remove', doc);
}