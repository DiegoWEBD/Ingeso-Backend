import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import Ram from '../../../domain/ram/Ram'
import AdministrationProcedureAdpater from '../../administration_procedure/adapter/AdministrationProcedureAdapter'
import RamAdapter from '../../ram/adapter/RamAdapter'
import { DrugJSON } from './DrugJSON'

export default class DrugAdapter {
	private constructor() {}

	static ToJSON(drug: Drug): DrugJSON {
		return {
			name: drug.getName(),
			presentation: drug.getPresentation(),
			description: drug.getDescription(),
			rams: drug.getRams().map(RamAdapter.ToJSON),
			administration_procedures: drug
				.getAdministrationProcedures()
				.map(AdministrationProcedureAdpater.ToJSON),
		}
	}

	static FromDB(dbDrug: Array<any>): Drug {
		let adaptedDrug = {
			name: dbDrug[0].name,
			presentation: dbDrug[0].presentation,
			description: dbDrug[0].description,
			administrationProcedures: new Array<AdministrationProcedure>(),
			rams: [new Ram(dbDrug[0].reaction)],
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
			adaptedDrug.rams,
			adaptedDrug.administrationProcedures
		)
	}
}
