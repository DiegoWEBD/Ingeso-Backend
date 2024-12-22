import User from '../../../domain/user/User'
import UserRepository from '../../../domain/user/UserRepository'
import NotFoundError from '../../errors/not_found'
import UnauthorizedError from '../../errors/unauthorized'

export const makeVerifyUserRefreshToken = (userRepository: UserRepository) => {
	return async (
		institutionalEmail: string,
		refreshToken: string
	): Promise<void> => {
		const user: User | null = await userRepository.findByInstitutionalEmail(
			institutionalEmail
		)

		if (user === null) {
			throw new NotFoundError(
				`Correo ${institutionalEmail} no registrado.`
			)
		}

		const registeredRefreshToken: string | null =
			await userRepository.getUserRefreshToken(user)

		if (
			registeredRefreshToken === null ||
			refreshToken !== registeredRefreshToken
		) {
			throw new UnauthorizedError('Token inválido.')
		}
	}
}
