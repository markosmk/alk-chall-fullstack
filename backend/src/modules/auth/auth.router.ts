import { Router } from 'express';
import { validateForm } from 'src/middlewares/validate-form.middleware';
import { asyncHandler } from 'src/utils/async-handler';
import * as AuthController from './auth.controller';
import { UserLogin, UserCreated, ForgetPass } from './auth.schema';

const router = Router();

router.post('/login', validateForm(UserLogin), asyncHandler(AuthController.login));
router.post('/register', validateForm(UserCreated), asyncHandler(AuthController.register));
router.post('/forget', validateForm(ForgetPass), asyncHandler(AuthController.forget));
router.get('/reset', asyncHandler(AuthController.reset));
router.post('/resetPass', asyncHandler(AuthController.resetPass));

export default router;
