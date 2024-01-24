import { Router } from 'express';
import CostumerController from '../controllers/CostumerController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', CostumerController.index);
router.post('/', CostumerController.store);
router.get('/:id', CostumerController.show);
router.put('/:id', loginRequired, CostumerController.update);
router.delete('/', loginRequired, CostumerController.delete);

export default router;
