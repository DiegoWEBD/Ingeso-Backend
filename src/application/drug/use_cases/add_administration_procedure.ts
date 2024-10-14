import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import AlreadyExistsError from '../../errors/already_exists'
import NotFoundError from '../../errors/not_found'

export const makeAddAdministrationProcedure = (
	drugRepository: DrugRepository
) => {
	return async (
		drugName: string,
		method: string,
		procedure: string
	): Promise<Drug> => {
		const drug = await drugRepository.findByName(drugName)

		if (drug === null) {
			throw new NotFoundError(`El fármaco '${drugName}' no está registrado.`)
		}

		for (let administrationProcedure of drug.getAdministrationProcedures()) {
			if (administrationProcedure.getMethod() === method) {
				throw new AlreadyExistsError(
					`Ya hay un procedimiento registrado para el fármaco '${drugName}' mediante el método '${method}'.`
				)
			}
		}

		const administrationProcedure = new AdministrationProcedure(
			method,
			procedure
		)
		drug.getAdministrationProcedures().push(administrationProcedure)

		await drugRepository.update(drugName, drug)
		return drug
	}
}
