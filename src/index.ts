import dotenv from 'dotenv'
import DrugTypeServices from './application/drug_type/DrugTypeServices'
import IDrugTypeServices from './application/drug_type/IDrugTypeServices'
import DrugTypeRepository from './domain/drug_type/DrugTypeRepository'
import MemoryDrugTypeRepository from './infrastructure/drug_type/MemoryDrugTypeRepository'
import Api from './presentation/Api'

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
