import signInRouter from './signInRoutes.js';
import signOnRouter from './signOnRoutes.js';
import transactionsRouter from './transactionsRoutes.js';
import { Router } from 'express';

const router = Router();
router.use(signInRouter);
router.use(signOnRouter);
router.use(transactionsRouter);
export default router;