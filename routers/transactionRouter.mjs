import express from 'express';
import transactionController from '../controllers/transactionController.mjs';
import validateType from '../middleware/validateTransaction.mjs';

const router = express.Router();

router.route('/').get(transactionController.allTransactions)
                  .post(transactionController.borrowOrReturn);

router.route('/:id').get(transactionController.searchTransaction)
                    .patch(validateType,transactionController.borrowOrReturn);    
                    
router.route('/users/:userId/transactions').get(transactionController.searchTransaction);

export default router;

