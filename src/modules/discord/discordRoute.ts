import express from 'express';
import {getDiscordUserInfo} from './discordController';

const router = express.Router();

router.get('/info', getDiscordUserInfo);

export default router;
