import User from '../../domain/user/User'
import StudentJSON from './StudentJSON'

export default class StudentJSONAdapter implements StudentJSON {
	name: string
	institutional_email: string

	constructor(user: User) {
		this.name = user.getName()
		this.institutional_email = user.getInstitutionalEmail()
	}
}
