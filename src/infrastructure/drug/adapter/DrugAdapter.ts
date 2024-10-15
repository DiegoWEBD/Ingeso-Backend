import Drug from '../../../domain/drug/Drug'
import { DrugJSON } from './DrugJSON'

export default class DrugAdapter {
	private constructor() {}

	static toJSON(drug: Drug): DrugJSON {
		return {
			name: drug.getName(),
			description: drug.getDescription(),
			drug_classifications: drug
				.getDrugClassifications()
				.map((drugClassification) => ({
					classification: drugClassification.getClassification(),
					description: drugClassification.getDescription(),
				})),
			rams: drug.getRams().map((ram) => ({ reaction: ram.getReaction() })),
			administration_procedures: drug
				.getAdministrationProcedures()
				.map((administrationProcedure) => ({
					method: administrationProcedure.getMethod(),
					procedure: administrationProcedure.getProcedure(),
				})),
		}
	}
}
