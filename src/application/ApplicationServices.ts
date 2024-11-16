import DrugRepository from '../domain/drug/DrugRepository'
import UserRepository from '../domain/user/UserRepository'
import DrugServices from './drug/DrugServices'
import IDrugServices from './drug/IDrugServices'
import IUserServices from './user/IUserServices'
import UserServices from './user/UserServices'

export default class ApplicationServices {
	private userServices: IUserServices
	private drugServices: IDrugServices

	constructor(userRepository: UserRepository, drugRepository: DrugRepository) {
		this.userServices = new UserServices(userRepository)
		this.drugServices = new DrugServices(drugRepository)
	}

	getUserServices(): IUserServices {
		return this.userServices
	}

	getDrugServices(): IDrugServices {
		return this.drugServices
	}
}
