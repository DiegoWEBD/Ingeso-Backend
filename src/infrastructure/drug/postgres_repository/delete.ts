import Drug from '../../../domain/drug/Drug'
import Database from '../../../presentation/database/Database'

export const makeDelete = (database: Database) => {
	return async (drug: Drug): Promise<void> => {
		await database.execute('delete from drug where name = $1', [
			drug.getName(),
		])
	}
}
