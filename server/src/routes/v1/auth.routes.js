import { Router } from 'express';
import authenticate from '../../helpers/authenticate';
import * as AuthController from '../../controllers/auth.controller';
import permit from '../../lib/roles/permission';
import { asyncWrapper } from '../../helpers/asyncWrapper';

const router = new Router();

// Authorization routes
router.route('/login').post(asyncWrapper(AuthController.login));
router.route('/register').post(asyncWrapper(AuthController.register));
router.route('/forgotPassword').post(asyncWrapper(AuthController.forgotPasswordRequest));
router.route('/resetPassword/:token').post(asyncWrapper(AuthController.resetPassword));
router.route('/confirmEmail/:token').get(asyncWrapper(AuthController.emailConfirm));

// Profile routes
router.route('/profile').get([authenticate, permit('Brand', 'Influencer', 'Admin')], asyncWrapper(AuthController.profile));

export default router;
