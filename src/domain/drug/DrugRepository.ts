import DrugInitialData from '../../application/drug/DrugInitialData'
import Drug from './Drug'

export default interface DrugRepository {
	add: (drug: Drug) => Promise<void>
	getDrugsInitialData: (userEmail: string) => Promise<Array<DrugInitialData>>
	findByName: (name: string) => Promise<Drug | null>
	update: (name: string, newValues: Drug) => Promise<void>
	delete: (drug: Drug) => Promise<void>
	isFavorite: (drugName: string, userEmail: string) => Promise<boolean>
}
