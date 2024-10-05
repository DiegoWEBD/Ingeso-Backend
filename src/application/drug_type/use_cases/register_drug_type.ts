import DrugType from '../../../domain/drug_type/DrugType'
import DrugTypeRepository from '../../../domain/drug_type/DrugTypeRepository'

export const makeRegisterDrugType = (
	drugTypeRepository: DrugTypeRepository
) => {
	return async (dtype: string, description: string): Promise<DrugType> => {
		const drugType = await drugTypeRepository.findByType(dtype)

		if (drugType === undefined) {
			throw new Error(`El tipo de fármaco '${dtype}' ya está registrado.`)
		}

		return new DrugType(dtype, description)
	}
}
