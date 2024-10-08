import dotenv from 'dotenv'
import Api from './presentation/Api'
import DrugTypeRepository from './domain/drug_type/DrugTypeRepository'
import MemoryDrugTypeRepository from './infrastructure/drug_type/MemoryDrugTypeRepository'
import IDrugTypeServices from './application/drug_type/IDrugTypeServices'
import DrugTypeServices from './application/drug_type/DrugTypeServices'
import NotFoundError from './application/errors/not_found'

dotenv.config()

// Prueba

const drugTypeRepository: DrugTypeRepository = new MemoryDrugTypeRepository()
const drugTypeServices: IDrugTypeServices = new DrugTypeServices(
	drugTypeRepository
)

drugTypeServices
	.registerDrugType('Antibiótico', 'Combate infecciones bacterianas.')
	.then(drugTypeServices.getDrugTypes)
	.then(console.log)
	.catch(console.error)

const api: Api = new Api()

api.run(process.env.PORT || 8080)
