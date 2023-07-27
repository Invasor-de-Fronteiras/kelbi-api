import express from 'express';
import {loginGameAccount} from '../controllers/login';

const router = express.Router();

router.get('/ingame', loginGameAccount);

export default router;
