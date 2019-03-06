"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var permit = function permit() {
  for (var _len = arguments.length, allowed = new Array(_len), _key = 0; _key < _len; _key++) {
    allowed[_key] = arguments[_key];
  }

  var isAllowed = function isAllowed(role) {
    return allowed.indexOf(role) > -1;
  };

  return function (req, res, next) {
    if (req.user && isAllowed(req.user.role)) next();else {
      _logger.default.error("Unauthorized access attempt by user: ".concat(req.user.email, " to route ").concat(req.path, "!"));

      res.status(403).json({
        status: 403,
        message: 'You are not authorized to access this resource'
      });
    }
  };
};

var _default = permit;
exports.default = _default;