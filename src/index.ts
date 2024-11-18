import dotenv from 'dotenv'
import ApplicationServices from './application/ApplicationServices'
import DrugRepository from './domain/drug/DrugRepository'
import UserRepository from './domain/user/UserRepository'
import PostgresDrugRepository from './infrastructure/drug/postgres_repository/PostgresDrugRepository'
import PostgresUserRepository from './infrastructure/user/PostgresUserRepository'
import Api from './presentation/Api'
import Database from './presentation/database/Database'

dotenv.config()

const database = new Database()

// Repositorios
const userRepository: UserRepository = new PostgresUserRepository(database)
const drugRepository: DrugRepository = new PostgresDrugRepository(database)

const applicationServices: ApplicationServices = new ApplicationServices(
	userRepository,
	drugRepository
)

const api: Api = new Api(applicationServices)

api.run(process.env.PORT || 8080)
