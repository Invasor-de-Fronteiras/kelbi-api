import express from 'express';
import {countUsers} from '../controllers/usersController';
import cors from 'cors';
import {corsOption} from '../app';

const router = express.Router();

router.get('/count', cors(corsOption), countUsers);

export default router;
