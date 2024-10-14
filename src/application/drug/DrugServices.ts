import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import DrugClassificationREpository from '../../domain/drug_classification/DrugClassificationRepository'
import IDrugServices from './IDrugServices'
import { makeAddAdministrationProcedure } from './use_cases/add_administration_procedure'
import { makeAddClassificationToDrug } from './use_cases/add_drug_type_to_drug'
import { makeAddRamToDrug } from './use_cases/add_ram_to_drug'
import { makeGetDrugInformation } from './use_cases/get_drug_information'
import { makeGetDrugsNames } from './use_cases/get_drugs_names'
import { makeRegisterDrug } from './use_cases/register_drug'

export default class DrugServices implements IDrugServices {
	constructor(
		private drugRepository: DrugRepository,
		private drugClassificationRepository: DrugClassificationREpository
	) {}

	getDrugInformation: (name: string) => Promise<Drug> = makeGetDrugInformation(
		this.drugRepository
	)

	getDrugsNames: () => Promise<Array<string>> = makeGetDrugsNames(
		this.drugRepository
	)

	registerDrug: (
		name: string,
		description: string,
		classifications: Array<string>,
		rams: Array<string>,
		administrationProceduresWithMethod: Map<string, string>
	) => Promise<Drug> = makeRegisterDrug(
		this.drugRepository,
		this.drugClassificationRepository
	)

	addClassificationToDrug: (
		drugName: string,
		classification: string
	) => Promise<Drug> = makeAddClassificationToDrug(
		this.drugRepository,
		this.drugClassificationRepository
	)

	addRamToDrug: (drugName: string, reaction: string) => Promise<Drug> =
		makeAddRamToDrug(this.drugRepository)

	addAdministrationProcedure: (
		drugName: string,
		method: string,
		procedure: string
	) => Promise<Drug> = makeAddAdministrationProcedure(this.drugRepository)
}
