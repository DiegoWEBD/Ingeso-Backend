import Database from '../../../presentation/database/Database'

export const makeGetAllNames = (database: Database) => {
	return async (): Promise<Array<string>> => {
		const drugsNames = await database.queryMany('select name from drug', [])
		return drugsNames.map((obj) => obj.name)
	}
}
