import Drug from '../drug/Drug'

export default class AdverseReaction {
	constructor(private drug1: Drug, private drug2: Drug) {}

	getDrug1(): Drug {
		return this.drug1
	}

	getDrug2(): Drug {
		return this.drug2
	}
}
