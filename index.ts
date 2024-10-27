import dotenv from 'dotenv'
import ApplicationServices from './src/application/ApplicationServices'
import DrugRepository from './src/domain/drug/DrugRepository'
import DrugClassificationRepository from './src/domain/drug_classification/DrugClassificationRepository'
import PostgresDrugRepository from './src/infrastructure/drug/postgres_repository/PostgresDrugRepository'
import MemoryDrugClassificationRepository from './src/infrastructure/drug_classification/MemoryDrugClassificationRepository'
import Api from './src/presentation/Api'
import Database from './src/presentation/database/Database'
import UserRepository from './src/domain/user/UserRepository'
import PostgresUserRepository from './src/infrastructure/user/PostgresUserRepository'

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
