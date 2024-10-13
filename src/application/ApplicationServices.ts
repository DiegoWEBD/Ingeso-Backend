import DrugRepository from '../domain/drug/DrugRepository'
import DrugTypeRepository from '../domain/drug_classification/DrugClassificationRepository'
import DrugServices from './drug/DrugServices'
import IDrugServices from './drug/IDrugServices'
import DrugTypeServices from './drug_type/DrugClassificationServices'
import IDrugTypeServices from './drug_type/IDrugClassificationServices'

export default class ApplicationServices {
	private drugTypeServices: IDrugTypeServices
	private drugServices: IDrugServices

	constructor(
		drugTypeRepository: DrugTypeRepository,
		drugRepository: DrugRepository
	) {
		this.drugTypeServices = new DrugTypeServices(drugTypeRepository)
		this.drugServices = new DrugServices(drugRepository, drugTypeRepository)
	}

	getDrugTypeServices(): IDrugTypeServices {
		return this.drugTypeServices
	}

	getDrugServices(): IDrugServices {
		return this.drugServices
	}
}
