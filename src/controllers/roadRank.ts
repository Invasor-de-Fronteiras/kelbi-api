import {type Request, type Response} from 'express';
import pool from '../dbConfig';

export const soloFloorRank = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const rowsPerPage = req.query.rows ? parseInt(req.query.rows as string, 10) : 10;
    console.log('Sending data for soloFloorRank function');
    console.log(`Page: ${page} rowsPerPage: ${rowsPerPage}`);

    if (isNaN(page)) {
      res.status(400).json({error: 'Invalid page number'});
      return;
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM rengoku_score WHERE max_stages_sp > 0');
    const totalCount = parseInt(countResult.rows[0].count as string, 10);

    const offset = (page - 1) * rowsPerPage;

    const soloFloorRankQuery = (`SELECT characters.name, rengoku_score.max_stages_sp, rengoku_score.max_points_sp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_sp > 0 ORDER BY rengoku_score.max_stages_sp DESC LIMIT ${rowsPerPage} OFFSET ${offset};`);

    const {rows} = await pool.query(soloFloorRankQuery);
    res.status(200).json({total: totalCount, page, data: rows});
  } catch (error) {
    console.error('Error fetching top players: ', error);
    res.status(500).json({error: 'Error fetching top players'});
  }
};

export const groupFloorRank = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const rowsPerPage = req.query.rows ? parseInt(req.query.rows as string, 10) : 10;
    console.log('Sending data for groupFloorRank function');
    console.log(`Page: ${page} rowsPerPage: ${rowsPerPage}`);

    if (isNaN(page)) {
      res.status(400).json({error: 'Invalid page number'});
      return;
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM rengoku_score WHERE max_stages_sp > 0');
    const totalCount = parseInt(countResult.rows[0].count as string, 10);

    const offset = (page - 1) * rowsPerPage;

    const groupFloorRankQuery = (`SELECT characters.name, rengoku_score.max_stages_mp, rengoku_score.max_points_mp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_mp > 0 ORDER BY rengoku_score.max_stages_mp DESC LIMIT ${rowsPerPage} OFFSET ${offset};`);

    const {rows} = await pool.query(groupFloorRankQuery);
    res.status(200).json({total: totalCount, page, data: rows});
  } catch (error) {
    console.error('Error fetching top players: ', error);
    res.status(500).json({error: 'Error fetching top players'});
  }
};

export const soloPointsRank = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const rowsPerPage = req.query.rows ? parseInt(req.query.rows as string, 10) : 10;
    console.log('Sending data for soloPointsRank function');
    console.log(`Page: ${page} rowsPerPage: ${rowsPerPage}`);

    if (isNaN(page)) {
      res.status(400).json({error: 'Invalid page number'});
      return;
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM rengoku_score WHERE max_stages_sp > 0');
    const totalCount = parseInt(countResult.rows[0].count as string, 10);

    const offset = (page - 1) * rowsPerPage;

    const soloPointsRankQuery = (`SELECT characters.name, rengoku_score.max_stages_sp, rengoku_score.max_points_sp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_sp > 0 ORDER BY rengoku_score.max_points_sp DESC LIMIT ${rowsPerPage} OFFSET ${offset};`);

    const {rows} = await pool.query(soloPointsRankQuery);
    res.status(200).json({total: totalCount, page, data: rows});
  } catch (error) {
    console.error('Error fetching top players: ', error);
    res.status(500).json({error: 'Error fetching top players'});
  }
};

export const groupPointsRank = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const rowsPerPage = req.query.rows ? parseInt(req.query.rows as string, 10) : 10;
    console.log('Sending data for groupPointsRank function');
    console.log(`Page: ${page} rowsPerPage: ${rowsPerPage}`);

    if (isNaN(page)) {
      res.status(400).json({error: 'Invalid page number'});
      return;
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM rengoku_score WHERE max_stages_sp > 0');
    const totalCount = parseInt(countResult.rows[0].count as string, 10);

    const offset = (page - 1) * rowsPerPage;

    const groupPointsRankQuery = (`SELECT characters.name, rengoku_score.max_stages_mp, rengoku_score.max_points_mp FROM rengoku_score INNER JOIN characters ON rengoku_score.character_id = characters.id WHERE rengoku_score.max_stages_mp > 0 ORDER BY rengoku_score.max_points_mp DESC LIMIT ${rowsPerPage} OFFSET ${offset};`);

    const {rows} = await pool.query(groupPointsRankQuery);
    res.status(200).json({total: totalCount, page, data: rows});
  } catch (error) {
    console.error('Error fetching top players: ', error);
    res.status(500).json({error: 'Error fetching top players'});
  }
};
