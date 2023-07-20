import express from 'express';
import {groupFloorRank, groupPointsRank, soloFloorRank, soloPointsRank} from '../controllers/roadRank';

const router = express.Router();

router.get('/solof', soloFloorRank);
router.get('/groupf', groupFloorRank);
router.get('/solop', soloPointsRank);
router.get('/groupp', groupPointsRank);

export default router;
