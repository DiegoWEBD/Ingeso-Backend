import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import DrugType from '../../domain/drug_type/DrugType'

export default class MemoryDrugRepository implements DrugRepository {
	private static drugs: Drug[]

	constructor() {
		if (MemoryDrugRepository.drugs) {
			throw new Error('No se puede instanciar este repositorio más de una vez.')
		}

		MemoryDrugRepository.drugs = [
			new Drug(
				'Ibuprofeno',
				'Descripción Ibuprofeno.',
				[new DrugType('Antiinflamatorio', 'Descripcion antiinflamatorios.')],
				[],
				[]
			),
		]
	}

	async add(drug: Drug) {
		MemoryDrugRepository.drugs.push(drug)
	}

	async getAll(): Promise<Drug[]> {
		return MemoryDrugRepository.drugs
	}

	async findByName(name: string): Promise<Drug | undefined> {
		return MemoryDrugRepository.drugs.find((drug) => drug.getName() === name)
	}

	async update(name: string, newValues: Drug) {
		MemoryDrugRepository.drugs.map((drug) => {
			if (drug.getName() !== name) return drug
			return newValues
		})
	}

	async delete(drug: Drug) {
		MemoryDrugRepository.drugs.filter((d) => d.getName() !== drug.getName())
	}
}
