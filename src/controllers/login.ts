import {type Request, type Response} from 'express';
import pool from '../dbConfig';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type User = {
	id: number;
	username: string;
	password: string;
};

export const loginGameAccount = async (req: Request, res: Response) => {
	const {login, password} = req.query as {login: string; password: string};

	try {
		const {rows} = await pool.query<User>('SELECT id, username, password FROM users WHERE username = $1', [login]);

		if (rows.length === 0) {
			console.log('Login failed! Invalid user');
			return res.status(401).json({error: 'Invalid user'});
		}

		const user: User = {
			id: rows[0].id,
			username: rows[0].username,
			password: rows[0].password.toString(),
		};

		// eslint-disable-next-line
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (isPasswordValid) {
			// eslint-disable-next-line
			const token: string = jwt.sign({id: user.id}, process.env.LOGIN_KEY, {expiresIn: '48h'});
			console.log(`${user.username} successfully logged in`);
			return res.json({token});
		}

		console.log('Login failed! Invalid Password');
		return res.status(401).json({error: 'Invalid Password'});
	} catch (error) {
		console.log('Login failed! Login failed');
		res.status(500).json({error: 'Login failed'});
	}
};
