"use strict";

require("./helpers/config");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _morgan = _interopRequireDefault(require("morgan"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var _logger = _interopRequireDefault(require("./lib/logger"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global process */
// Require environment variables
// Constants
var fs = require('fs');

var path = require('path');

var PORT = process.env.PORT || 3001;
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/serapion-server'; // Require passport configuration for authentication

require('./lib/passport'); // Initialize the Express server


var app = new _express.default(); // Creating a Morgan write stream

var accessLogStream = fs.createWriteStream(path.join(_appRootPath.default.path, '/logs/access.log'), {
  flags: 'a'
}); // Connecting to Mongo DB

_mongoose.default.promise = Promise;

_mongoose.default.set('useCreateIndex', true);

_mongoose.default.connect(MONGODB_URI, {
  useNewUrlParser: true
}).then(function () {
  _logger.default.info('Successfully connected to mongoDB');
}).catch(function (err) {
  _logger.default.error('Connection to MongoDB could not be established');
}); // Instantiate Express plugins and modules


app.use(_bodyParser.default.json({
  limit: '20mb'
}));
app.use(_bodyParser.default.urlencoded({
  limit: '20mb',
  extended: false
}));
app.use(_passport.default.initialize());
app.use((0, _cors.default)());
app.use((0, _morgan.default)('combined', {
  stream: accessLogStream
})); // Disable default X-powered-by header for security/bandwidth purposes.

app.disable('x-powered-by'); // Listing routes here for V1 api endpoints

app.use('/api/v1', _auth.default); // Catch all route declared for unhandled requests

app.all('*', function (req, res) {
  _logger.default.error("Attempted access to following route ".concat(req.path, " was intercepted by catch all route!"));

  return res.status(404).json({
    message: 'The resource you are looking for could not be found!'
  });
}); // Starting the server

app.listen(PORT, function (error) {
  if (!error) {
    _logger.default.info("Serapion server is running on port: ".concat(PORT, "!"));
  }
});