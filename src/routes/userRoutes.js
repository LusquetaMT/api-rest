import { Router } from 'express';
import UserController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// router.get('/', UserController.index);
// router.get('/:id', UserController.show);

router.post('/', loginRequired, UserController.store);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;

/*
index -> List all
store/create -> Create a new
delete -> Delete one
show -> Show one
update -> Update one
*/
