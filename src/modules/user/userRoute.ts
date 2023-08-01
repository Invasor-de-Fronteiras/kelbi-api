import express from 'express';
import {countUsers} from './userController';

const router = express.Router();

router.get('/count', countUsers);

export default router;
