/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Proposals = require('./proposals.model');

exports.register = function(socket) {
  Proposals.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Proposals.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('proposals:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('proposals:remove', doc);
}