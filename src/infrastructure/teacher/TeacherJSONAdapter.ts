import User from '../../domain/user/User'
import TeacherJSON from './TeacherJSON'

export default class TeacherJSONAdapter implements TeacherJSON {
	name: string
	institutional_email: string

	constructor(user: User) {
		this.name = user.getName()
		this.institutional_email = user.getInstitutionalEmail()
	}
}
