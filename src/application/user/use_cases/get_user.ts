import User from '../../../domain/user/User'
import UserRepository from '../../../domain/user/UserRepository'
import NotFoundError from '../../errors/not_found'

export const makeGetUser = (userRepository: UserRepository) => {
	return async (institutionalEmail: string): Promise<User> => {
		const user = await userRepository.findByInstitutionalEmail(
			institutionalEmail
		)

		if (user === null) {
			throw new NotFoundError(`Correo ${institutionalEmail} no registrado.`)
		}

		return user
	}
}
