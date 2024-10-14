import dotenv from 'dotenv'
import ApplicationServices from './application/ApplicationServices'
import AdministrationRouteRepository from './domain/administration_route/AdministrationRouteRepository'
import DrugRepository from './domain/drug/DrugRepository'
import DrugTypeRepository from './domain/drug_type/DrugTypeRepository'
import MemoryAdministrationRouteRepository from './infrastructure/administration_route/MemoryAdministrationRouteRepository'
import MemoryDrugRepository from './infrastructure/drug/MemoryDrugRepository'
import MemoryDrugTypeRepository from './infrastructure/drug_type/MemoryDrugTypeRepository'
import Api from './presentation/Api'

dotenv.config()

// Repositorios
const drugTypeRepository: DrugTypeRepository = new MemoryDrugTypeRepository()
const drugRepository: DrugRepository = new MemoryDrugRepository()
const administrationRouteRepository: AdministrationRouteRepository =
	new MemoryAdministrationRouteRepository()

const applicationServices: ApplicationServices = new ApplicationServices(
	drugTypeRepository,
	drugRepository,
	administrationRouteRepository
)

const api: Api = new Api(applicationServices)

api.run(process.env.PORT || 8080)
