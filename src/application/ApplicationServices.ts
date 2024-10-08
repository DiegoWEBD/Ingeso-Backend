import AdministrationRouteRepository from '../domain/administration_route/AdministrationRouteRepository'
import DrugRepository from '../domain/drug/DrugRepository'
import DrugTypeRepository from '../domain/drug_type/DrugTypeRepository'
import DrugServices from './drug/DrugServices'
import IDrugServices from './drug/IDrugServices'
import DrugTypeServices from './drug_type/DrugTypeServices'
import IDrugTypeServices from './drug_type/IDrugTypeServices'

export default class ApplicationServices {
	private drugTypeServices: IDrugTypeServices
	private drugServices: IDrugServices

	constructor(
		drugTypeRepository: DrugTypeRepository,
		drugRepository: DrugRepository,
		administrationRouteRepository: AdministrationRouteRepository
	) {
		this.drugTypeServices = new DrugTypeServices(drugTypeRepository)
		this.drugServices = new DrugServices(
			drugRepository,
			drugTypeRepository,
			administrationRouteRepository
		)
	}

	getDrugTypeServices(): IDrugTypeServices {
		return this.drugTypeServices
	}

	getDrugServices(): IDrugServices {
		return this.drugServices
	}
}
