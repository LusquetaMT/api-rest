import { Router } from 'express';
import TokeenController from '../controllers/TokenController';

const router = new Router();

router.post('/', TokeenController.store);

export default router;
