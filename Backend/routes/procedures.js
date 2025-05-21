import express from 'express';
import { createProcedures } from '../controllers/proceduresControllers.js'; 

const router = express.Router();

router.post('/', createProcedures); 

export default router;