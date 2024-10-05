import Drug from './Drug'

export default interface DrugRepository {
	add: (drug: Drug) => Promise<void>
	getAll: () => Promise<Array<Drug>>
	findByType: (name: string) => Promise<Drug | undefined>
	update: (name: string, newValues: Drug) => Promise<void>
	delete: (drug: Drug) => Promise<void>
}