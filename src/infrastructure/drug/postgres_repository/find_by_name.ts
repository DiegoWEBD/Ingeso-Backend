import Drug from '../../../domain/drug/Drug'
import Database from '../../../presentation/database/Database'
import DrugAdapter from '../adapter/DrugAdapter'

export const makeFindByName = (database: Database) => {
	return async (name: string): Promise<Drug | null> => {
		const drugData = await database.queryMany(
			'select d.name, d.presentation, d.description, ap.method, ap.procedure, r.reaction ' +
				'from drug d left join administration_procedure ap on d.name = ap.drug_name ' +
				'left join ram r on d.name = r.drug_name ' +
				'where d.name = $1',
			[name]
		)

		return drugData.length > 0 ? DrugAdapter.FromDB(drugData) : null
	}
}
