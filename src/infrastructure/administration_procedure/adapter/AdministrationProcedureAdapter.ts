import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import { AdministrationProcedureJSON } from './AdministrationProcedureJSON'

export default class AdministrationProcedureAdpater {
	private constructor() {}

	static ToJSON(
		administrationProcedure: AdministrationProcedure
	): AdministrationProcedureJSON {
		return {
			method: administrationProcedure.getMethod(),
			procedure: administrationProcedure.getProcedure(),
		}
	}
}
