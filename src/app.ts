import express from 'express';
import pool from './dbConfig';
import userRoutes from './routes/userRoutes';
import rankRoutes from './routes/rankRoutes';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/road', rankRoutes);

const testDatabaseConnection = async () => {
	try {
		const client = await pool.connect();
		console.log('Database connection successfully established!');
		client.release();
	} catch (error) {
		console.log(process.env.DB_PASSWORD);
		console.error('Error connecting to database: ', error);
	}
};

(async () => {
	try {
		await testDatabaseConnection();
		app.listen(3000, () => {
			console.log('Server running in port 3000');
		});
	} catch (error) {
		console.error('Error starting the server:', error);
	}
})();
