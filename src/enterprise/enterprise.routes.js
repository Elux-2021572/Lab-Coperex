import {Router} from 'express';
import {registerEnterprise, getEnterprises, updateEnterprise, generateEnterpriseReport} from './enterprise.controller.js';  
import { registerEnterpriseValidator, updateEnterpriseValidator } from '../middlewares/enterprise-validators.js';

const router = Router();

router.post('/registerEnterprise', registerEnterpriseValidator, registerEnterprise);
router.get('/getEnterprises', getEnterprises);
router.put('/updateEnterprise/:id', updateEnterpriseValidator, updateEnterprise);
router.get('/generateEnterpriseReport', generateEnterpriseReport);

export default router;