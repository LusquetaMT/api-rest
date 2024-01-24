import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import PictureController from '../controllers/PictureController';

const router = new Router();

router.post('/', loginRequired, PictureController.store);

export default router;
