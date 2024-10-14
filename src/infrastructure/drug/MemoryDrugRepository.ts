import AdministrationProcedure from '../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import DrugClassification from '../../domain/drug_classification/DrugClassification'
import Ram from '../../domain/ram/Ram'

export default class MemoryDrugRepository implements DrugRepository {
	private static drugs: Drug[]

	constructor() {
		if (MemoryDrugRepository.drugs) {
			throw new Error('No se puede instanciar este repositorio más de una vez.')
		}

		MemoryDrugRepository.drugs = [
			new Drug(
				'Ibuprofeno',
				'Medicamento utilizado para aliviar el dolor, reducir la inflamación y bajar la fiebre.',
				[
					new DrugClassification(
						'Antiinflamatorio',
						'Medicamentos que reducen la inflamación.'
					),
				],
				[
					new Ram(
						'Puede provocar úlceras, hemorragias o perforaciones en el esófago'
					),
				],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Tomar por vía oral cada 8 horas.'
					),
				]
			),
		]
	}

	async add(drug: Drug) {
		MemoryDrugRepository.drugs.push(drug)
	}

	async getAll(): Promise<Drug[]> {
		return MemoryDrugRepository.drugs
	}

	async findByName(name: string): Promise<Drug | null> {
		const drug = MemoryDrugRepository.drugs.find(
			(drug) => drug.getName() === name
		)
		return drug !== undefined ? drug : null
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
