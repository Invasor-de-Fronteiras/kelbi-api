import {type Request, type Response} from 'express';
import pool from '../../dbConfig';

const countAccountsQuery = 'SELECT COUNT(*) FROM users';
const countCharactersQuery = 'SELECT COUNT(*) FROM characters WHERE name IS NOT NULL AND name != \'\'';
const countGuildsQuery = 'SELECT COUNT(*) FROM guilds';
const countOnlineNow = 'SELECT SUM (current_players) FROM servers;';

export const countUsers = async (req: Request, res: Response) => {
  try {
    const totalAccountsResult = await pool.query(countAccountsQuery);
    const totalAccounts = Number(totalAccountsResult.rows[0].count);
    const countCharactersResult = await pool.query(countCharactersQuery);
    const totalCharacters = Number(countCharactersResult.rows[0].count);
    const totalGuildsResult = await pool.query(countGuildsQuery);
    const totalGuilds = Number(totalGuildsResult.rows[0].count);
    const onlineNowResult = await pool.query(countOnlineNow);
    const onlineNow = Number(onlineNowResult.rows[0].sum);
    const serverStatus = {totalAccounts, totalCharacters, totalGuilds, onlineNow};
    console.log(serverStatus);
    res.json(serverStatus);
  } catch (error) {
    console.error('Error fetching users: ', error);
    res.status(500).json({error: 'Error fetching users'});
  }
};
