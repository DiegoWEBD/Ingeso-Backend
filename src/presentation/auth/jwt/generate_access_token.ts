import HttpError from '../../http/http_error'
import { TokenPayload } from './TokenPayload'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload: TokenPayload): string => {
	const jwtSecret = process.env.ACCESS_TOKEN_SECRET

	if (!jwtSecret) {
		throw new HttpError(
			500,
			'ACCESS_TOKEN_SECRET no está definido en las variables de entorno.'
		)
	}

	return jwt.sign(payload, jwtSecret, {
		expiresIn: '1d',
	})
}
