import {type Request, type Response} from 'express';
import pool from '../dbConfig';
import bcrypt from 'bcrypt';
import jwt, {type Secret} from 'jsonwebtoken';

type User = {
	id: number;
	username: string;
	password: string;
};

type DecodedToken = {
	id: number;
	iat: number;
	exp: number;
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
			const token: string = jwt.sign({id: user.id}, process.env.LOGIN_KEY, {expiresIn: '720h'});
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

export const validateToken = (token: string) => {
	try {
		// eslint-disable-next-line
		const decoded = jwt.verify(token, process.env.LOGIN_KEY as Secret) as DecodedToken;
		return decoded;
	} catch (error) {
		console.log('Error processing token');
		throw new Error('Invalid token');
	}
};

export const getUserData = async (req: Request, res: Response) => {
	const {token} = req.query as {token: string};

	try {
		const decoded = validateToken(token);
		const {rows} = await pool.query('SELECT u.id, u.username, u.dev, uc.provider_id FROM users u JOIN user_connections uc ON u.id = uc.user_id WHERE u.id = $1;', [decoded.id]);

		res.status(200).json({...rows[0]});
	} catch (error) {
		console.log('Error processing token');
		res.status(401).json({error: 'Error processing token'});
	}
};
