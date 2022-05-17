import postSignIn from '../controllers/signInController.js';
import { signInValidation } from '../untils/middlewares.js';
import { Router } from 'express';

const signInRouter = Router();
signInRouter.post("/signIn", signInValidation,postSignIn);
export default signInRouter;