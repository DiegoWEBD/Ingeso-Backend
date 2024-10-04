import dotenv from 'dotenv'
import Api from './presentation/Api'
import User from './domain/user/User'
import Teacher from './domain/teacher/Teacher'

dotenv.config()

const api: Api = new Api()

api.run(process.env.PORT || 8080)
