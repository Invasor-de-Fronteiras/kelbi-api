import express from 'express';
import {roadRank} from './roadController';

const router = express.Router();

router.get('/rank', roadRank);

export default router;
