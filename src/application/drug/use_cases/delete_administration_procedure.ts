import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import NotFoundError from '../../errors/not_found'
import InvalidInputError from '../../errors/invalid_input'

export const makeDeleteAdministrationProcedure = (
    drugRepository: DrugRepository
) => {
    return async (
        drugName: string,
        method: string
    ): Promise<Drug> => {
        const validMethods: Set<string> = new Set([
            'bolo directo',
            'bolo intermitente',
            'infusión continua',
        ])

        if (!validMethods.has(method)) {
            throw new InvalidInputError(`Método '${method}' inválido.`)
        }

        const drug = await drugRepository.findByName(drugName)

        if (drug === null) {
            throw new NotFoundError(`El fármaco '${drugName}' no está registrado.`)
        }

        const procedures = drug.getAdministrationProcedures()
        const index = procedures.findIndex(
            (proc) => proc.getMethod() === method
        )

        if (index === -1) {
            throw new NotFoundError(
                `No se encontró un procedimiento registrado para el fármaco '${drugName}' mediante el método '${method}'.`
            )
        }

        procedures.splice(index, 1)

        await drugRepository.update(drugName, drug)
        return drug
    }
}
