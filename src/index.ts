import dotenv from 'dotenv'
import Api from './presentation/Api'

dotenv.config()

const api: Api = new Api()

api.run(process.env.PORT || 8080)
