import express from 'express';
import { createProcedures } from '../controllers/proceduresControllers.js'; 
import { getProcedures } from '../controllers/proceduresControllers.js';

const router = express.Router();

router.post('/', createProcedures); 
router.get('/:id', getProcedures);


export default router;