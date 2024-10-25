import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import DrugClassification from '../../../domain/drug_classification/DrugClassification'
import Ram from '../../../domain/ram/Ram'
import { DrugJSON } from './DrugJSON'

export default class DrugAdapter {
	private constructor() {}

	static ToJSON(drug: Drug): DrugJSON {
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

	static FromDB(dbDrug: Array<any>): Drug {
		let adaptedDrug = {
			name: dbDrug[0].name,
			presentation: dbDrug[0].presentation,
			description: dbDrug[0].description,
			administrationProcedures: new Array<AdministrationProcedure>(),
			rams: [new Ram(dbDrug[0].reaction)],
			classifications: new Array<DrugClassification>(),
		}

		for (let row of dbDrug) {
			if (
				!adaptedDrug.administrationProcedures.find(
					(ap) => ap.getMethod() === row.method
				)
			) {
				adaptedDrug.administrationProcedures.push(
					new AdministrationProcedure(row.method, row.procedure)
				)
			}
		}

		return new Drug(
			adaptedDrug.name,
			adaptedDrug.presentation,
			adaptedDrug.description,
			adaptedDrug.classifications,
			adaptedDrug.rams,
			adaptedDrug.administrationProcedures
		)
	}
}
