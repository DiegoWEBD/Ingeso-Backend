import DrugInitialData from '../../../application/drug/DrugInitialData'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import Database from '../../../presentation/database/Database'
import { makeAdd } from './add'
import { makeDelete } from './delete'
import { makeFindByName } from './find_by_name'
import { makeGetDrugsInitialData } from './get_drugs_initial_data'
import { makeUpdate } from './update'

export default class PostgresDrugRepository implements DrugRepository {
	constructor(private database: Database) {}

	add: (drug: Drug) => Promise<void> = makeAdd(this.database)
	getDrugsInitialData: (
		userEmail: string
	) => Promise<Array<DrugInitialData>> = makeGetDrugsInitialData(
		this.database
	)
	findByName: (drugName: string) => Promise<Drug | null> = makeFindByName(
		this.database
	)
	update: (name: string, newValues: Drug) => Promise<void> = makeUpdate(
		this.database
	)
	delete: (drug: Drug) => Promise<void> = makeDelete(this.database)

	async isFavorite(drugName: string, userEmail: string): Promise<boolean> {
		const query = `
            SELECT count(*) FROM favorite_drug
            WHERE drug_name = $1 AND user_institutional_email = $2
        `

		const result = await this.database.queryOne(query, [
			drugName,
			userEmail,
		])

		return result.count > 0
	}
}
