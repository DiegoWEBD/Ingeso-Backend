import { Request } from 'express'
import User from '../../../domain/user/User'

export default interface RequestWithUser extends Request {
	user?: User
}
