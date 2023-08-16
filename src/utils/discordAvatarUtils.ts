import axios from 'axios';

type UserInfo = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: number | undefined;
  accent_color: number;
  global_name: string;
  avatar_decoration: string | undefined;
  banner_color: string;
  avatarUrl: string | undefined;
};

const uri = 'https://discord.com/api/v10/users/';

const config = {
  headers: {
    authorization: `Bot ${process.env.BOT_TOKEN}`,
  },
};

export const getDiscordInfo = async (userId: string): Promise<UserInfo | undefined> => {
  try {
    const response = await axios.get<UserInfo>(uri + userId, config);
    const user = response.data;
    const ext = user.avatar.startsWith('a_') ? '.gif' : '.png';
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}${ext}`;
    return {...user, avatarUrl};
  } catch (error) {
    return undefined;
  }
};
