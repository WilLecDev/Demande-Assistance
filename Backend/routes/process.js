import express from 'express';
import { createProcess, getAllProcess } from '../controllers/processControllers.js';

const router = express.Router();

router.post('/', createProcess);
router.get('/', getAllProcess);

export default router;
