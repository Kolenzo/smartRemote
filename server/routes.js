/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/proposalss', require('./api/proposals'));
  app.use('/api/fingerprints', require('./api/fingerprint'));
  app.use('/api/devicess', require('./api/devices'));
  app.use('/api/userSettingss', require('./api/userSettings'));
  app.use('/api/preferencess', require('./api/preferences'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
