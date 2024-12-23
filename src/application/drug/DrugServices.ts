import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import IDrugServices from './IDrugServices'
import { makeDeleteDrug } from './use_cases/delete_drug'
import { makeGetDrugInformation } from './use_cases/get_drug_information'
import { makeGetDrugsInitialData } from './use_cases/get_drugs_initial_data'
import { makeRegisterDrug } from './use_cases/register_drug'
import { makeUpdateDrug } from './use_cases/update_drug'
import DrugInitialData from './DrugInitialData'
import { makeFindDrug } from './use_cases/find_drug'

export default class DrugServices implements IDrugServices {
	constructor(private drugRepository: DrugRepository) {}

	getDrugInformation: (name: string) => Promise<Drug> =
		makeGetDrugInformation(this.drugRepository)

	getDrugsInitialData: (
		userEmail: string
	) => Promise<Array<DrugInitialData>> = makeGetDrugsInitialData(
		this.drugRepository
	)

	registerDrug: (
		name: string,
		presentation: string,
		description: string,
		reactions: Array<string>,
		administrationProceduresWithMethod: Map<string, string>
	) => Promise<Drug> = makeRegisterDrug(this.drugRepository)

	updateDrug: (
		name: string,
		newName?: string,
		newPresentation?: string,
		newDescription?: string,
		newReactions?: Array<string>,
		newAdministrationProcedures?: Map<string, string>
	) => Promise<Drug> = makeUpdateDrug(this.drugRepository)

	deleteDrug: (drugName: string) => Promise<Drug> = makeDeleteDrug(
		this.drugRepository
	)

	findDrug: (name: string) => Promise<Drug | null> = makeFindDrug(
		this.drugRepository
	)
}
