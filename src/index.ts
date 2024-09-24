import dotenv from 'dotenv'
import Api from './presentation/Api'

dotenv.config()

const api: Api = new Api()

api.serve(process.env.PORT || 8080)
