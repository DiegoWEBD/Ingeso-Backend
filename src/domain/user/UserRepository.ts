import User from './User'

export default interface UserRepository {
	add: (user: User) => Promise<void>
	findByInstitutionalEmail: (institutionalEmail: string) => Promise<User | null>
}
