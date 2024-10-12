import DrugClassification from '../drug_classification/DrugClassification'
import Ram from '../ram/Ram'
import AdministrationProcedure from '../administration_procedure/AdministrationProcedure'
export default class Drug {
	constructor(
		private name: string,
		private description: string,
		private drugClassifications: Array<DrugClassification>,
		private rams: Array<Ram>,
		private administrationProcedures: Array<AdministrationProcedure>
	) {}

	getName(): string {
		return this.name
	}

	getDescription(): string {
		return this.description
	}

	getDrugClassifications(): Array<DrugClassification> {
		return this.drugClassifications
	}

	getRams(): Array<Ram> {
		return this.rams
	}

	getAdministrationProcedures(): Array<AdministrationProcedure> {
		return this.administrationProcedures
	}
}
