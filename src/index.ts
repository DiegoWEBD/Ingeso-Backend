import dotenv from 'dotenv'
import ApplicationServices from './application/ApplicationServices'
import DrugRepository from './domain/drug/DrugRepository'
import DrugClassificationRepository from './domain/drug_classification/DrugClassificationRepository'
import PostgresDrugRepository from './infrastructure/drug/postgres_repository/PostgresDrugRepository'
import MemoryDrugClassificationRepository from './infrastructure/drug_classification/MemoryDrugClassificationRepository'
import Api from './presentation/Api'
import Database from './presentation/database/Database'
import UserRepository from './domain/user/UserRepository'
import PostgresUserRepository from './infrastructure/user/PostgresUserRepository'

dotenv.config()

const database = new Database()

// Repositorios
const userRepository: UserRepository = new PostgresUserRepository(database)
const drugClassificationRepository: DrugClassificationRepository =
	new MemoryDrugClassificationRepository()
const drugRepository: DrugRepository = new PostgresDrugRepository(database)

const applicationServices: ApplicationServices = new ApplicationServices(
	userRepository,
	drugClassificationRepository,
	drugRepository
)

const api: Api = new Api(applicationServices)

api.run(process.env.PORT || 8080)
