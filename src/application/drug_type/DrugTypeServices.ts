import DrugType from '../../domain/drug_type/DrugType'
import DrugTypeRepository from '../../domain/drug_type/DrugTypeRepository'
import IDrugTypeServices from './IDrugTypeServices'
import { makeGetDrugTypes } from './use_cases/get_drug_types'
import { makeRegisterDrugType } from './use_cases/register_drug_type'

export default class DrugTypeServices implements IDrugTypeServices {
	constructor(private drugTypeRepository: DrugTypeRepository) {}

	getDrugTypes: () => Promise<DrugType[]> = makeGetDrugTypes(
		this.drugTypeRepository
	)
	registerDrugType: (dtype: string, description: string) => Promise<DrugType> =
		makeRegisterDrugType(this.drugTypeRepository)
}

// Factory functions javascript
