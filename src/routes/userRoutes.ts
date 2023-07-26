import express from 'express';
import {countUsers} from '../controllers/usersController';

const router = express.Router();

router.get('/count', countUsers);

export default router;
