import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import IDrugServices from './IDrugServices'
import { makeAddAdministrationProcedure } from './use_cases/add_administration_procedure'
import { makeAddRamToDrug } from './use_cases/add_ram_to_drug'
import { makeDeleteDrug } from './use_cases/delete_drug'
import { makeGetDrugInformation } from './use_cases/get_drug_information'
import { makeGetDrugsNames } from './use_cases/get_drugs_names'
import { makeRegisterDrug } from './use_cases/register_drug'
import { makeUpdateDrug } from './use_cases/update_drug'
import { makeDeleteAdministrationProcedure } from './use_cases/delete_administration_procedure'

export default class DrugServices implements IDrugServices {
	constructor(private drugRepository: DrugRepository) {}

	getDrugInformation: (name: string) => Promise<Drug> = makeGetDrugInformation(
		this.drugRepository
	)

	getDrugsNames: () => Promise<Array<string>> = makeGetDrugsNames(
		this.drugRepository
	)

	registerDrug: (
		name: string,
		presentation: string,
		description: string,
		reactions: Array<string>,
		administrationProceduresWithMethod: Map<string, string>
	) => Promise<Drug> = makeRegisterDrug(this.drugRepository)

	addRamToDrug: (drugName: string, reaction: string) => Promise<Drug> =
		makeAddRamToDrug(this.drugRepository)

	addAdministrationProcedure: (
		drugName: string,
		method: string,
		procedure: string
	) => Promise<Drug> = makeAddAdministrationProcedure(this.drugRepository)

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
	deleteAdministrationProcedure: (
        drugName: string,
        method: string
    ) => Promise<Drug> = makeDeleteAdministrationProcedure(this.drugRepository)
}
