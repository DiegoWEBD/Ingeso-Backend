import AdministrationRouteRepository from '../../domain/administration_route/AdministrationRouteRepository'
import DrugRepository from '../../domain/drug/DrugRepository'
import DrugTypeRepository from '../../domain/drug_type/DrugTypeRepository'
import IDrugServices from './IDrugServices'
import { makeAddAdverseReactionBetweenDrugs } from './use_cases/add_adverse_reaction_between_drugs'
import { makeAddDrugAdministrationRoute } from './use_cases/add_drug_administration_route'
import { makeAddDrugTypeToDrug } from './use_cases/add_drug_type_to_drug'
import { makeGetDrugInformation } from './use_cases/get_drug_information'
import { makeGetDrugsNames } from './use_cases/get_drugs_names'
import { makeRegisterDrug } from './use_cases/register_drug'

export default class DrugServices implements IDrugServices {
	constructor(
		private drugRepository: DrugRepository,
		private drugTypeRepository: DrugTypeRepository,
		private administrationRouteRepository: AdministrationRouteRepository
	) {}

	getDrugInformation = makeGetDrugInformation(this.drugRepository)
	getDrugsNames = makeGetDrugsNames(this.drugRepository)
	registerDrug = makeRegisterDrug(
		this.drugRepository,
		this.drugTypeRepository,
		this.administrationRouteRepository
	)
	addDrugTypeToDrug = makeAddDrugTypeToDrug(
		this.drugRepository,
		this.drugTypeRepository
	)
	addAdverseReactionBetweenDrugs = makeAddAdverseReactionBetweenDrugs(
		this.drugRepository
	)
	addDrugAdministrationRoute = makeAddDrugAdministrationRoute(
		this.drugRepository,
		this.administrationRouteRepository
	)
}
