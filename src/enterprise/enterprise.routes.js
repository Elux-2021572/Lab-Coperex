import {Router} from 'express';
import {registerEnterprise} from './enterprise.controller.js';  

const router = Router();

router.post('/registerEnterprise', registerEnterprise);

export default router;