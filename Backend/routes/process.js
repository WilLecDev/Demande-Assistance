import express from 'express';
import { createProcess } from '../controllers/processControllers.js';

const router = express.Router();

router.post('/', createProcess);

export default router;
