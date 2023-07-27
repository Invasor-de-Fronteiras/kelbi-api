import express from 'express';
import cors, {type CorsOptions} from 'cors';
import userRoutes from './routes/userRoutes';
import rankRoutes from './routes/rankRoutes';
import loginRoutes from './routes/loginRoutes';

import {testDatabaseConnection} from './utils/databaseUtils';

export const corsOption: CorsOptions = {
	origin: process.env.ORIGIN,
	optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOption));

app.use('/users', userRoutes);
app.use('/road', rankRoutes);
app.use('/login', loginRoutes);

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
