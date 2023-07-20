import {type Request, type Response} from 'express';
import pool from '../dbConfig';

const soloFloorRankQuery = ('SELECT characters.name, rengoku_score.max_stages_sp, rengoku_score.max_points_sp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_sp > 0 ORDER BY rengoku_score.max_stages_sp DESC;');
const groupFloorRankQuery = ('SELECT characters.name, rengoku_score.max_stages_mp, rengoku_score.max_points_mp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_mp > 0 ORDER BY rengoku_score.max_stages_mp DESC;');
const soloPointsRankQuery = ('SELECT characters.name, rengoku_score.max_stages_sp, rengoku_score.max_points_sp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_sp > 0 ORDER BY rengoku_score.max_points_sp DESC;');
const groupPointsRankQuery = ('SELECT characters.name, rengoku_score.max_stages_mp, rengoku_score.max_points_mp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_mp > 0 ORDER BY rengoku_score.max_points_mp DESC;');

export const soloFloorRank = async (req: Request, res: Response) => {
	try {
		const {rows} = await pool.query(soloFloorRankQuery);
		res.json(rows);
	} catch (error) {
		console.error('Error fetching top players: ', error);
		res.status(500).json({error: 'Error fetching top players'});
	}
};

export const groupFloorRank = async (req: Request, res: Response) => {
	try {
		const {rows} = await pool.query(groupFloorRankQuery);
		res.json(rows);
	} catch (error) {
		console.error('Error fetching top players: ', error);
		res.status(500).json({error: 'Error fetching top players'});
	}
};

export const soloPointsRank = async (req: Request, res: Response) => {
	try {
		const {rows} = await pool.query(soloPointsRankQuery);
		res.json(rows);
	} catch (error) {
		console.error('Error fetching top players: ', error);
		res.status(500).json({error: 'Error fetching top players'});
	}
};

export const groupPointsRank = async (req: Request, res: Response) => {
	try {
		const {rows} = await pool.query(groupPointsRankQuery);
		res.json(rows);
	} catch (error) {
		console.error('Error fetching top players: ', error);
		res.status(500).json({error: 'Error fetching top players'});
	}
};
