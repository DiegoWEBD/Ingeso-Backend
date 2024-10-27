import AdministrationProcedure from '../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import DrugClassification from '../../domain/drug_classification/DrugClassification'
import Ram from '../../domain/ram/Ram'

export default class MemoryDrugRepository implements DrugRepository {
	private static drugs: Drug[]

	constructor() {
		if (MemoryDrugRepository.drugs) {
			throw new Error('No se puede instanciar este repositorio más de una vez.')
		}

		MemoryDrugRepository.drugs = [
			// Medicamentos anteriores...

			new Drug(
				'Vancomicina',
				'Antibiótico utilizado para tratar infecciones graves causadas por bacterias resistentes.',
				[
					new DrugClassification(
						'Antibiótico',
						'Medicamentos que eliminan o detienen el crecimiento de bacterias.'
					),
				],
				[new Ram('Toxicidad renal, síndrome del hombre rojo, fiebre.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Se administra en 10-15 minutos para infecciones severas, aunque este método puede aumentar el riesgo de toxicidad y reacciones adversas.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Se administra lentamente en un periodo de 1 a 2 horas para minimizar las reacciones adversas como el síndrome del hombre rojo.'
					),
				]
			),
			new Drug(
				'Ciprofloxacina',
				'Antibiótico utilizado para tratar infecciones bacterianas graves, especialmente infecciones del tracto urinario y respiratorias.',
				[
					new DrugClassification(
						'Antibiótico',
						'Medicamentos que eliminan o detienen el crecimiento de bacterias.'
					),
				],
				[new Ram('Náuseas, diarrea, tendinitis, fotosensibilidad.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en 10-15 minutos para infecciones agudas como la neumonía o infecciones urinarias complicadas.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado durante 30-60 minutos para mantener niveles adecuados en infecciones persistentes o complicadas.'
					),
				]
			),
			new Drug(
				'Dexametasona',
				'Corticosteroide utilizado para reducir la inflamación en condiciones como el asma, la artritis y las alergias graves.',
				[
					new DrugClassification(
						'Corticosteroide',
						'Medicamentos que reducen la inflamación y modulan el sistema inmunológico.'
					),
				],
				[new Ram('Aumento de peso, hipertensión, inmunosupresión.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en 1-2 minutos para condiciones inflamatorias graves como anafilaxia o exacerbaciones de asma.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado durante 30 minutos en casos donde se requiere un control prolongado de la inflamación.'
					),
				]
			),
			new Drug(
				'Furosemida',
				'Diurético de asa utilizado para tratar la retención de líquidos en condiciones como la insuficiencia cardíaca y la hipertensión.',
				[
					new DrugClassification(
						'Diurético',
						'Medicamentos que aumentan la producción de orina.'
					),
				],
				[new Ram('Deshidratación, desequilibrio electrolítico, hipotensión.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en 1-2 minutos para reducir rápidamente el edema o en casos de emergencia hipertensiva.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado durante 30 minutos a una hora para un control sostenido de la eliminación de líquidos.'
					),
				]
			),
			new Drug(
				'Heparina',
				'Anticoagulante utilizado para prevenir la formación de coágulos sanguíneos.',
				[
					new DrugClassification(
						'Anticoagulante',
						'Medicamentos que previenen la coagulación de la sangre.'
					),
				],
				[new Ram('Sangrado, trombocitopenia inducida por heparina.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en menos de 1 minuto para anticoagulación rápida en emergencias como trombosis venosa profunda o embolia pulmonar.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado lentamente durante varias horas para mantener niveles terapéuticos constantes de anticoagulación.'
					),
				]
			),
			new Drug(
				'Morfina',
				'Opioide utilizado para tratar el dolor agudo y crónico intenso.',
				[
					new DrugClassification(
						'Opioide',
						'Medicamentos que alivian el dolor al actuar sobre el sistema nervioso central.'
					),
				],
				[new Ram('Depresión respiratoria, somnolencia, náuseas.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en 1-2 minutos para un alivio rápido del dolor en casos de dolor agudo, como en traumatismos o postoperatorio.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado durante 30 minutos o más en casos de dolor crónico o control de dolor postoperatorio prolongado.'
					),
				]
			),
			new Drug(
				'Midazolam',
				'Benzodiazepina utilizada para sedación y manejo de convulsiones.',
				[
					new DrugClassification(
						'Benzodiazepina',
						'Medicamentos que actúan sobre el sistema nervioso central para producir sedación y controlar convulsiones.'
					),
				],
				[new Ram('Depresión respiratoria, somnolencia, hipotensión.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en menos de 2 minutos para sedación rápida o control de convulsiones en emergencias.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado lentamente durante más de 30 minutos para mantener la sedación en pacientes en UCI o en procedimientos prolongados.'
					),
				]
			),
			new Drug(
				'Cloruro de potasio',
				'Solución utilizada para tratar o prevenir la hipopotasemia (niveles bajos de potasio en sangre).',
				[
					new DrugClassification(
						'Suplemento electrolítico',
						'Medicamentos que reponen o equilibran los niveles de electrolitos en el cuerpo.'
					),
				],
				[new Ram('Hiperkalemia, arritmias cardíacas, irritación venosa.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'No recomendado debido al riesgo de arritmias cardíacas graves.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Se administra lentamente durante varias horas para restaurar de manera segura los niveles de potasio, generalmente diluido en solución salina.'
					),
				]
			),
			new Drug(
				'Ondansetrón',
				'Antiemético utilizado para prevenir las náuseas y vómitos inducidos por la quimioterapia, radioterapia o cirugía.',
				[
					new DrugClassification(
						'Antiemético',
						'Medicamentos que previenen o alivian las náuseas y los vómitos.'
					),
				],
				[
					new Ram(
						'Dolor de cabeza, estreñimiento, prolongación del intervalo QT.'
					),
				],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en 2-5 minutos para un control rápido de las náuseas y vómitos.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado lentamente durante 15-30 minutos para prevenir los efectos a largo plazo de las náuseas inducidas por la quimioterapia.'
					),
				]
			),
			new Drug(
				'Ketamina',
				'Anestésico utilizado para la inducción y el mantenimiento de la anestesia general, así como para el manejo del dolor agudo.',
				[
					new DrugClassification(
						'Anestésico disociativo',
						'Medicamentos que inducen anestesia y sedación.'
					),
				],
				[
					new Ram(
						'Alucinaciones, aumento de la presión arterial, depresión respiratoria.'
					),
				],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en menos de 1 minuto para la inducción rápida de anestesia en situaciones de emergencia.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado durante 30 minutos a varias horas para mantener la anestesia o como parte del manejo del dolor.'
					),
				]
			),
			new Drug(
				'Levofloxacino',
				'Antibiótico utilizado para tratar infecciones bacterianas graves como la neumonía, infecciones del tracto urinario y pielonefritis.',
				[
					new DrugClassification(
						'Antibiótico',
						'Medicamentos que eliminan o detienen el crecimiento de bacterias.'
					),
				],
				[new Ram('Tendinitis, prolongación del intervalo QT, diarrea.')],
				[
					new AdministrationProcedure(
						'bolo directo',
						'Administrado en 10-15 minutos para infecciones agudas como neumonía o infecciones urinarias complicadas.'
					),
					new AdministrationProcedure(
						'infusión continua',
						'Administrado lentamente durante 30-60 minutos para infecciones persistentes o graves.'
					),
				]
			),
		]
	}
	async getAllNames(): Promise<Array<string>> {
		return []
	}

	async add(drug: Drug) {
		MemoryDrugRepository.drugs.push(drug)
	}

	async getAll(): Promise<Drug[]> {
		return MemoryDrugRepository.drugs
	}

	async findByName(name: string): Promise<Drug | null> {
		const drug = MemoryDrugRepository.drugs.find(
			(drug) => drug.getName() === name
		)
		return drug !== undefined ? drug : null
	}

	async update(name: string, newValues: Drug) {
		MemoryDrugRepository.drugs.map((drug) => {
			if (drug.getName() !== name) return drug
			return newValues
		})
	}

	async delete(drug: Drug) {
		MemoryDrugRepository.drugs.filter((d) => d.getName() !== drug.getName())
	}
}
