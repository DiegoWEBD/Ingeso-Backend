import User from '../../../domain/user/User'
import { UserJSON } from './UserJSON'

export default class UserAdapter {
	private constructor() {}

	static ToJSON(user: User): UserJSON {
		return {
			name: user.getName(),
			institutional_email: user.getInstitutionalEmail(),
		}
	}
}
