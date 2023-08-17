import {type Request, type Response} from 'express';
import {getDiscordInfo} from '../../utils/discordAvatarUtils';

export const getDiscordUserInfo = async (req: Request, res: Response) => {
  try {
    const discordUserId = req.query.id;

    if (discordUserId) {
      const discordUserInfo = await getDiscordInfo(String(discordUserId));
      res.status(200).json({discordUserInfo});
      return;
    }

    res.status(400).json({error: 'Invalid id'});
  } catch (error) {
    res.status(500).json({error: 'Internal error'});
  }
};
