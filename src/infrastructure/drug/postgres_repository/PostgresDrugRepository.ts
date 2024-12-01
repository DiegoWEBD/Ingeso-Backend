import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import Database from '../../../presentation/database/Database'
import { makeAdd } from './add'
import { makeDelete } from './delete'
import { makeFindByName } from './find_by_name'
import { makeGetAllNames } from './get_all_names'
import { makeUpdate } from './update'

export default class PostgresDrugRepository implements DrugRepository {
	constructor(private database: Database) {}

	add: (drug: Drug) => Promise<void> = makeAdd(this.database)
	getAllNames: () => Promise<Array<string>> = makeGetAllNames(this.database)
	findByName: (drugName: string) => Promise<Drug | null> = makeFindByName(
		this.database
	)
	update: (name: string, newValues: Drug) => Promise<void> = makeUpdate(
		this.database
	)
	delete: (drug: Drug) => Promise<void> = makeDelete(this.database)
}
