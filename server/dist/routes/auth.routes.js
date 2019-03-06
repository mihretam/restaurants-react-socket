"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

var AuthController = _interopRequireWildcard(require("../controllers/auth.controller"));

var _permission = _interopRequireDefault(require("../lib/roles/permission"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router(); // Authorization routes

router.route('/login').post(AuthController.login);
router.route('/register').post(AuthController.register);
router.route('/forgotPassword').post(AuthController.forgotPasswordRequest);
router.route('/resetPassword/:token').post(AuthController.resetPassword);
router.route('/confirmEmail/:token').get(AuthController.emailConfirm); // Profile routes

router.route('/profile').get([_authenticate.default, (0, _permission.default)('Brand', 'Admin')], AuthController.profile);
var _default = router;
exports.default = _default;