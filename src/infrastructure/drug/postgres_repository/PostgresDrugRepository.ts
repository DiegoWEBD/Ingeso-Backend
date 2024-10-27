import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import Database from '../../../presentation/database/Database'
import { makeFindByName } from './find_by_name'
import { makeGetAllNames } from './get_all_names'

export default class PostgresDrugRepository implements DrugRepository {
	constructor(private database: Database) {}

	add: (drug: Drug) => Promise<void> = async () => {}

	getAll: () => Promise<Array<Drug>> = async () => {
		throw new Error('To do.')
	}

	getAllNames: () => Promise<Array<string>> = makeGetAllNames(this.database)

	findByName: (drugName: string) => Promise<Drug | null> = makeFindByName(
		this.database
	)

	update: (name: string, newValues: Drug) => Promise<void> = async () => {
		throw new Error('To do.')
	}

	delete: (drug: Drug) => Promise<void> = async () => {}
}
