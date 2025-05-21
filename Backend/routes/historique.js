import express from 'express';
import { createHistorique } from '../controllers/historiqueControllers.js';

const router = express.Router();

router.post('/', createHistorique);

export default router;