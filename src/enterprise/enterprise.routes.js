import {Router} from 'express';
import {registerEnterprise, getEnterprises, updateEnterprise, generateEnterpriseReport, getEnterprisesByOrder, getEnterprisesByCategory} from './enterprise.controller.js';  
import { registerEnterpriseValidator, updateEnterpriseValidator, getEnterpriseByCategoryValidator } from '../middlewares/enterprise-validators.js';

const router = Router();

router.post('/registerEnterprise', registerEnterpriseValidator, registerEnterprise);
router.get('/getEnterprises', getEnterprises);
router.put('/updateEnterprise/:id', updateEnterpriseValidator, updateEnterprise);
router.get('/generateEnterprise/Report', generateEnterpriseReport);
router.get('/getEnterprisesByOrder', getEnterprisesByOrder);
router.get('/getEnterprisesByCategory/:category',getEnterpriseByCategoryValidator, getEnterprisesByCategory);


export default router;