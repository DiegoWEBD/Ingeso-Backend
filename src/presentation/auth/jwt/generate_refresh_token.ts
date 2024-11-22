import HttpError from '../../http/http_error'
import { TokenPayload } from './TokenPayload'
import jwt from 'jsonwebtoken'

export const generateRefreshToken = (payload: TokenPayload): string => {
	const jwtSecret = process.env.REFRESH_TOKEN_SECRET

	if (!jwtSecret) {
		throw new HttpError(
			500,
			'REFRESH_TOKEN_SECRET no está definido en las variables de entorno.'
		)
	}

	return jwt.sign(payload, jwtSecret, {
		expiresIn: '28d',
	})
}
