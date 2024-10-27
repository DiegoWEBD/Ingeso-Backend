import dotenv from 'dotenv'
import ApplicationServices from './application/ApplicationServices'
import DrugRepository from './domain/drug/DrugRepository'
import DrugClassificationRepository from './domain/drug_classification/DrugClassificationRepository'
import MemoryDrugRepository from './infrastructure/drug/MemoryDrugRepository'
import Api from './presentation/Api'
import MemoryDrugClassificationRepository from './infrastructure/drug_classification/MemoryDrugClassificationRepository'
import Database from './presentation/database/Database'
import PostgresDrugRepository from './infrastructure/drug/postgres_repository/PostgresDrugRepository'

dotenv.config()

const database = new Database()

// Repositorios
const drugClassificationRepository: DrugClassificationRepository =
	new MemoryDrugClassificationRepository()
const drugRepository: DrugRepository = new PostgresDrugRepository(database)

const applicationServices: ApplicationServices = new ApplicationServices(
	drugClassificationRepository,
	drugRepository
)

const api: Api = new Api(applicationServices)

api.run(process.env.PORT || 8080)
