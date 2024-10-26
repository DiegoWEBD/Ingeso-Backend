import User from '../../../domain/user/User'
import UserRepository from '../../../domain/user/UserRepository'
import NotFoundError from '../../errors/not_found'

export const makeFindUser = (userRepository: UserRepository) => {
	return async (institutionalEmail: string): Promise<User | null> => {
		return await userRepository.findByInstitutionalEmail(institutionalEmail)
	}
}
