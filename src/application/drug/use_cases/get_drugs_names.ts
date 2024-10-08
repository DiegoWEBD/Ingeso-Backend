import DrugRepository from '../../../domain/drug/DrugRepository'

export const makeGetDrugsNames = (drugRepository: DrugRepository) => {
	return async (): Promise<string[]> => {
		const drugs = await drugRepository.getAll()
		const drugsNames = drugs.map((drug) => drug.getName())

		return drugsNames
	}
}
