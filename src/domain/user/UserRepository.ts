import User from './User'

export default interface UserRepository {
	add: (user: User) => Promise<void>
	findByInstitutionalEmail: (institutionalEmail: string) => Promise<User | null>
	getUserRefreshToken: (user: User) => Promise<string | null>
	registerRefreshToken: (
		user: User,
		refreshToken: string,
		expirationDate: Date
	) => Promise<void>
}
