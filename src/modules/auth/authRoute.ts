import express from 'express';
import {getUserData, loginGameAccount} from './authController';

const router = express.Router();

router.get('/ingame', loginGameAccount);
router.get('/userdata', getUserData);

export default router;
