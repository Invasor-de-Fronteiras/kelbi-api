import axios, {type AxiosResponse} from 'axios';

type DiscordUserData = {
  id: string;
  username: string;
  avatar: string | undefined;
};

const getDiscordAvatar = async discordId => {
  try {
    const response: AxiosResponse<DiscordUserData> = await axios.get(`https://discord.com/api/users/${discordId}`);
    const userData = response.data;
    if (userData?.avatar) {
      return `https://cdn.discordapp.com/avatars/${discordId}/${userData.avatar}.png`;
    }

    return '';
  } catch (error) {
    console.error('Error fetching Discord avatar: ', error);
    return '';
  }
};
