import DrugClassification from '../../domain/drug_classification/DrugClassification'
import DrugClassificationRepository from '../../domain/drug_classification/DrugClassificationRepository'
import IDrugClassificationServices from './IDrugClassificationServices'
import { makeDeleteDrugClassification } from './use_cases/delete_drug_classification'
import { makeRegisterDrugClassification } from './use_cases/register_drug_classification'

export default class DrugClassificationServices
	implements IDrugClassificationServices
{
	constructor(
		private drugClassificationRepository: DrugClassificationRepository
	) {}

	registerDrugClassification: (
		dtype: string,
		description: string
	) => Promise<DrugClassification> = makeRegisterDrugClassification(
		this.drugClassificationRepository
	)

	deleteDrugClassification: (
		classification: string
	) => Promise<DrugClassification> = makeDeleteDrugClassification(
		this.drugClassificationRepository
	)
}
