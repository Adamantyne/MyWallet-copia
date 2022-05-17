import { Router } from "express";
import { 
    getTransaction,postTransaction,deleteTransaction 
} from "../controllers/transactionController.js";
import { 
    transactionPostValidation,tokenValidation,deleteValidation
} from '../untils/middlewares.js';

const transactionsRouter = Router();
transactionsRouter.use(tokenValidation);
transactionsRouter.post("/transactions",transactionPostValidation,postTransaction);
transactionsRouter.get("/transactions",getTransaction);
transactionsRouter.delete("/transactions",deleteValidation,deleteTransaction );

export default transactionsRouter;
