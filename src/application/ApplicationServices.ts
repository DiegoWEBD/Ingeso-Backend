import DrugRepository from '../domain/drug/DrugRepository'
import DrugClassificationRepository from '../domain/drug_classification/DrugClassificationRepository'
import DrugServices from './drug/DrugServices'
import IDrugServices from './drug/IDrugServices'
import DrugClassificationServices from './drug_classification/DrugClassificationServices'
import IDrugClassificationServices from './drug_classification/IDrugClassificationServices'

export default class ApplicationServices {
	private drugClassificationServices: IDrugClassificationServices
	private drugServices: IDrugServices

	constructor(
		drugClassificationRepository: DrugClassificationRepository,
		drugRepository: DrugRepository
	) {
		this.drugClassificationServices = new DrugClassificationServices(
			drugClassificationRepository
		)
		this.drugServices = new DrugServices(
			drugRepository,
			drugClassificationRepository
		)
	}

	getDrugClassificationServices(): IDrugClassificationServices {
		return this.drugClassificationServices
	}

	getDrugServices(): IDrugServices {
		return this.drugServices
	}
}
