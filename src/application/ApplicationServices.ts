import DrugRepository from '../domain/drug/DrugRepository'
import DrugClassificationRepository from '../domain/drug_classification/DrugClassificationRepository'
import UserRepository from '../domain/user/UserRepository'
import DrugServices from './drug/DrugServices'
import IDrugServices from './drug/IDrugServices'
import DrugClassificationServices from './drug_classification/DrugClassificationServices'
import IDrugClassificationServices from './drug_classification/IDrugClassificationServices'
import IUserServices from './user/IUserServices'
import UserServices from './user/UserServices'

export default class ApplicationServices {
	private userServices: IUserServices
	private drugClassificationServices: IDrugClassificationServices
	private drugServices: IDrugServices

	constructor(
		userRepository: UserRepository,
		drugClassificationRepository: DrugClassificationRepository,
		drugRepository: DrugRepository
	) {
		this.userServices = new UserServices(userRepository)
		this.drugClassificationServices = new DrugClassificationServices(
			drugClassificationRepository
		)
		this.drugServices = new DrugServices(
			drugRepository,
			drugClassificationRepository
		)
	}

	getUserServices(): IUserServices {
		return this.userServices
	}

	getDrugClassificationServices(): IDrugClassificationServices {
		return this.drugClassificationServices
	}

	getDrugServices(): IDrugServices {
		return this.drugServices
	}
}
