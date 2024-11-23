import User from '../../../domain/user/User'
import UserRepository from '../../../domain/user/UserRepository'
import { generateRefreshToken } from '../../../presentation/auth/jwt/generate_refresh_token'
import { TokenPayload } from '../../../presentation/auth/jwt/TokenPayload'
import NotFoundError from '../../errors/not_found'

export const makeGenerateUserRefreshToken = (
	userRepository: UserRepository
) => {
	return async (institutionalEmail: string): Promise<string> => {
		const user: User | null = await userRepository.findByInstitutionalEmail(
			institutionalEmail
		)

		if (user === null) {
			throw new NotFoundError(`Correo ${institutionalEmail} no registrado.`)
		}

		const payload: TokenPayload = {
			name: user.getName(),
			email: user.getInstitutionalEmail(),
		}
		const refreshToken = generateRefreshToken(payload, '28d')

		await userRepository.registerRefreshToken(
			user,
			refreshToken,
			new Date(new Date().getDate() + 28)
		)

		return refreshToken
	}
}
