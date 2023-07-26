import pool from '../dbConfig';

export const testDatabaseConnection = async () => {
	try {
		const client = await pool.connect();
		console.log('Database connection successfully established!');
		client.release();
	} catch (error) {
		console.log(process.env.DB_PASSWORD);
		console.error('Error connecting to database: ', error);
	}
};
