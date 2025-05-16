import express from 'express';
import { createprocedures } from '../controllers/proceduresControllers.js';

const router = express.Router();

router.post('/', createprocedures);

export default router;