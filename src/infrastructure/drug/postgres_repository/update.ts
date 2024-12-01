import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import Database from '../../../presentation/database/Database'

export const makeUpdate = (database: Database) => {
	return async (name: string, newValues: Drug): Promise<void> => {
		let currentAdministrationProcedures = await database.queryMany(
			'select * from drug d ' +
				'left join administration_procedure ap ' +
				'on d.name = ap.drug_name ' +
				'where d.name = $1',
			[name]
		)

		currentAdministrationProcedures = currentAdministrationProcedures.map(
			(administrationProcedure: any) => ({
				method: administrationProcedure.method,
				procedure: administrationProcedure.procedure,
			})
		)

		//console.log('Current\n', currentAdministrationProcedures)
		const newAdministrationProcedures =
			newValues.getAdministrationProcedures()
		//console.log('New\n', newAdministrationProcedures)

		const administrationProceduresToDelete: any[] =
			currentAdministrationProcedures.filter(
				(administrationProcedure: any) =>
					!newAdministrationProcedures.find(
						(ap) =>
							ap.getMethod() === administrationProcedure.method
					)
			)

		//console.log('To delete\n', administrationProceduresToDelete)

		const administrationProceduresToUpdate: AdministrationProcedure[] = []
		const administrationProceduresToCreate: AdministrationProcedure[] =
			newAdministrationProcedures.filter((administrationProcedure) => {
				if (
					currentAdministrationProcedures.find(
						(ap) =>
							ap.method === administrationProcedure.getMethod()
					)
				) {
					administrationProceduresToUpdate.push(
						administrationProcedure
					)
					return false
				}
				return true
			})

		//console.log('To update\n', administrationProceduresToUpdate)
		//console.log('To create\n', administrationProceduresToCreate)

		for (let administrationProcedure of administrationProceduresToDelete) {
			await database.execute(
				'delete from administration_procedure ap where ap.drug_name = $1 and ap.method = $2',
				[name, administrationProcedure.method]
			)
		}

		for (let administrationProcedure of administrationProceduresToUpdate) {
			await database.execute(
				'update administration_procedure set procedure = $1 where drug_name = $2 and method = $3',
				[
					administrationProcedure.getProcedure(),
					name,
					administrationProcedure.getMethod(),
				]
			)
		}

		for (let administrationProcedure of administrationProceduresToCreate) {
			await database.execute(
				'insert into administration_procedure(drug_name, method, procedure) values ($1, $2, $3)',
				[
					name,
					administrationProcedure.getMethod(),
					administrationProcedure.getProcedure(),
				]
			)
		}

		await database.execute(
			'update drug set name = $1, presentation = $2, description = $3 where name = $4',
			[
				newValues.getName(),
				newValues.getPresentation(),
				newValues.getDescription(),
				name,
			]
		)
	}
}
