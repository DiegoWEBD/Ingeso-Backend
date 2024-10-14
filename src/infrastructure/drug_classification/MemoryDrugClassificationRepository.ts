import DrugClassification from '../../domain/drug_classification/DrugClassification'
import DrugClassificationRepository from '../../domain/drug_classification/DrugClassificationRepository'

export default class MemoryDrugClassificationRepository
	implements DrugClassificationRepository
{
	async add(drugClassification: DrugClassification): Promise<void> {
		throw new Error('To Do!')
	}

	async getAll(): Promise<Array<DrugClassification>> {
		throw new Error('To Do!')
	}

	async findByClassification(
		classification: string
	): Promise<DrugClassification | null> {
		throw new Error('To Do!')
	}

	async update(
		classification: string,
		newValues: DrugClassification
	): Promise<void> {
		throw new Error('To Do!')
	}

	async delete(drugClassification: DrugClassification): Promise<void> {
		throw new Error('To Do!')
	}
}
