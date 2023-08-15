import {type Request, type Response} from 'express';
import pool from '../../dbConfig';

export const roadRank = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const rowsPerPage = req.query.rows ? parseInt(req.query.rows as string, 10) : 10;
    const rankType = req.query.type ? String(req.query.type) : 'groupf';

    if (isNaN(page)) {
      res.status(400).json({error: 'Invalid page number'});
      return;
    }

    const dbQuery = roadRankQuery(rankType);
    const countResult = await pool.query(dbQuery.count);
    const totalCount = parseInt(countResult.rows[0].count as string, 10);

    const offset = (page - 1) * rowsPerPage;
    const {rows} = await pool.query(dbQuery.query, [rowsPerPage, offset]);
    res.status(200).json({total: totalCount, page, data: rows});
  } catch (error) {
    res.status(500).json({error: 'Error fetching top players'});
  }
};

const roadRankQuery = (type: string) => {
  let count = '';
  let query = '';

  switch (type) {
    case 'groupf':
      count = 'SELECT COUNT(*) FROM rengoku_score WHERE max_stages_mp > 0';
      query = (`
        SELECT
          characters.user_id,
          characters.name,
          rengoku_score.max_stages_mp AS max_stages,
          rengoku_score.max_points_mp AS max_points,
          user_connections.provider_id
        FROM rengoku_score
        LEFT JOIN characters ON rengoku_score.character_id = characters.id
        LEFT JOIN user_connections ON characters.user_id = user_connections.user_id
        WHERE rengoku_score.max_stages_mp > 0
        ORDER BY rengoku_score.max_stages_mp DESC
        LIMIT $1 OFFSET $2;
		`);
      break;

    case 'groupp':
      count = 'SELECT COUNT(*) FROM rengoku_score WHERE max_stages_mp > 0';
      query = (`
        SELECT
          characters.user_id,
          characters.name,
          rengoku_score.max_stages_mp AS max_stages,
          rengoku_score.max_points_mp AS max_points,
          user_connections.provider_id
        FROM rengoku_score
        LEFT JOIN characters ON rengoku_score.character_id = characters.id
        LEFT JOIN user_connections ON characters.user_id = user_connections.user_id
        WHERE rengoku_score.max_stages_mp > 0
        ORDER BY rengoku_score.max_points_mp DESC
        LIMIT $1 OFFSET $2;
		`);
      break;

    case 'solof':
      count = 'SELECT COUNT(*) FROM rengoku_score WHERE max_stages_sp > 0';
      query = (`
        SELECT
          characters.user_id,
          characters.name,
          rengoku_score.max_stages_sp AS max_stages,
          rengoku_score.max_points_sp AS max_points,
          user_connections.provider_id
        FROM rengoku_score
        LEFT JOIN characters ON rengoku_score.character_id = characters.id
        LEFT JOIN user_connections ON characters.user_id = user_connections.user_id
        WHERE rengoku_score.max_stages_sp > 0
        ORDER BY rengoku_score.max_stages_sp DESC
        LIMIT $1 OFFSET $2;`);
      break;

    case 'solop':
      count = 'SELECT COUNT(*) FROM rengoku_score WHERE max_stages_sp > 0';
      query = (`
        SELECT
          characters.user_id,
          characters.name,
          rengoku_score.max_stages_sp AS max_stages,
          rengoku_score.max_points_sp AS max_points,
          user_connections.provider_id
        FROM rengoku_score
        LEFT JOIN characters ON rengoku_score.character_id = characters.id
        LEFT JOIN user_connections ON characters.user_id = user_connections.user_id
        WHERE rengoku_score.max_stages_sp > 0
        ORDER BY rengoku_score.max_points_sp DESC
        LIMIT $1 OFFSET $2;
		`);
      break;

    default:
      throw new Error(`Invalid ranking type: ${type}`);
  }

  const response = {count, query};
  return response;
};
