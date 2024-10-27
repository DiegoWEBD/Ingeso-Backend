import DrugClassification from '../../../domain/drug_classification/DrugClassification'
import { DrugClassificationJSON } from './DrugClassificationJSON'

export default class DrugClassificationAdapter {
	private constructor() {}

	static ToJSON(
		drugClassification: DrugClassification
	): DrugClassificationJSON {
		return {
			classification: drugClassification.getClassification(),
			description: drugClassification.getDescription(),
		}
	}
}
