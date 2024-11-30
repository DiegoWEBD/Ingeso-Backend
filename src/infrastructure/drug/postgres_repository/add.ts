import Drug from '../../../domain/drug/Drug'
import Database from '../../../presentation/database/Database'

export const makeAdd = (database: Database) => {
	return async (drug: Drug): Promise<void> => {
		await database.execute(
			'insert into drug(name, presentation, description) values($1, $2, $3)',
			[drug.getName(), drug.getPresentation(), drug.getDescription()]
		)

		for (let administrationProcedure of drug.getAdministrationProcedures()) {
			await database.execute(
				'insert into administration_procedure(drug_name, method, procedure) values($1, $2, $3)',
				[
					drug.getName(),
					administrationProcedure.getMethod(),
					administrationProcedure.getProcedure(),
				]
			)
		}

		for (let ram of drug.getRams()) {
			await database.execute(
				'insert into ram(drug_name, reaction) values($1, $2)',
				[drug.getName(), ram.getReaction()]
			)
		}
	}
}
