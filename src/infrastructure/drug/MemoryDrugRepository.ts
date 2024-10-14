import AdministrationProcedure from '../../domain/administration_procedure/AdministrationProcedure'
import AdministrationRoute from '../../domain/administration_route/AdministrationRoute'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import DrugType from '../../domain/drug_type/DrugType'

export default class MemoryDrugRepository implements DrugRepository {
	private static drugs: Drug[]

	constructor() {
		if (MemoryDrugRepository.drugs) {
			throw new Error('No se puede instanciar este repositorio más de una vez.')
		}

		MemoryDrugRepository.drugs = [
			new Drug(
				'Ibuprofeno',
				'Medicamento utilizado para aliviar el dolor, reducir la inflamación y bajar la fiebre.',
				[
					new DrugType(
						'Antiinflamatorio',
						'Medicamentos que reducen la inflamación.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Se administra por vía oral.'),
						'Tomar por vía oral cada 8 horas.'
					),
					new AdministrationProcedure(
						new AdministrationRoute('tópica', 'Se aplica en la piel.'),
						'Aplicar sobre la piel en la zona afectada.'
					),
					new AdministrationProcedure(
						new AdministrationRoute('rectal', 'Se administra vía rectal.'),
						'Inserción rectal, usualmente en supositorios.'
					),
				]
			),
			new Drug(
				'Paracetamol',
				'Medicamento utilizado para aliviar el dolor y reducir la fiebre.',
				[
					new DrugType('Analgésico', 'Alivia el dolor.'),
					new DrugType('Antipirético', 'Reduce la fiebre.'),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar por vía oral cada 6 horas.'
					),
					new AdministrationProcedure(
						new AdministrationRoute('rectal', 'Vía rectal.'),
						'Administrar vía rectal si no es posible la administración oral.'
					),
				]
			),
			new Drug(
				'Amoxicilina',
				'Antibiótico utilizado para tratar infecciones bacterianas.',
				[
					new DrugType(
						'Antibiótico',
						'Medicamentos que combaten infecciones bacterianas.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar cada 8 horas por 7-10 días.'
					),
					new AdministrationProcedure(
						new AdministrationRoute(
							'intravenosa',
							'Administración intravenosa.'
						),
						'Se administra por vía intravenosa en situaciones graves.'
					),
				]
			),
			new Drug(
				'Loratadina',
				'Antihistamínico utilizado para aliviar síntomas de alergias.',
				[
					new DrugType(
						'Antihistamínico',
						'Bloquea los efectos de la histamina.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día, con o sin alimentos.'
					),
				]
			),
			new Drug(
				'Omeprazol',
				'Medicamento que reduce la producción de ácido en el estómago.',
				[
					new DrugType(
						'Inhibidor de la bomba de protones',
						'Disminuye la acidez estomacal.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día antes del desayuno.'
					),
				]
			),
			new Drug(
				'Metformina',
				'Medicamento para el tratamiento de la diabetes tipo 2.',
				[
					new DrugType(
						'Antidiabético',
						'Ayuda a controlar los niveles de glucosa en sangre.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una o dos veces al día, preferiblemente con las comidas.'
					),
				]
			),
			new Drug(
				'Dipirona',
				'Medicamento utilizado para aliviar el dolor y reducir la fiebre.',
				[
					new DrugType('Analgésico', 'Alivia el dolor.'),
					new DrugType('Antipirético', 'Reduce la fiebre.'),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar por vía oral cada 6-8 horas.'
					),
					new AdministrationProcedure(
						new AdministrationRoute('intravenosa', 'Vía intravenosa.'),
						'Se administra en forma intravenosa en casos de dolor severo.'
					),
				]
			),
			new Drug(
				'Atorvastatina',
				'Medicamento utilizado para reducir los niveles de colesterol.',
				[
					new DrugType(
						'Estatina',
						'Reduce los niveles de colesterol y triglicéridos en la sangre.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día, preferentemente por la noche.'
					),
				]
			),
			new Drug(
				'Losartán',
				'Medicamento utilizado para tratar la presión arterial alta.',
				[new DrugType('Antihipertensivo', 'Reduce la presión arterial.')],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día, con o sin alimentos.'
					),
				]
			),
			new Drug(
				'Salbutamol',
				'Broncodilatador utilizado para aliviar los síntomas del asma.',
				[
					new DrugType(
						'Broncodilatador',
						'Abre las vías respiratorias en los pulmones.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('inhalatoria', 'Vía inhalatoria.'),
						'Inhalar cada 4-6 horas según necesidad.'
					),
					new AdministrationProcedure(
						new AdministrationRoute('intravenosa', 'Vía intravenosa.'),
						'Administrar por vía intravenosa en situaciones de emergencia.'
					),
				]
			),
			new Drug(
				'Furosemida',
				'Diurético utilizado para eliminar el exceso de líquidos del cuerpo.',
				[
					new DrugType(
						'Diurético',
						'Aumenta la producción de orina para eliminar el exceso de líquidos.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día por la mañana.'
					),
					new AdministrationProcedure(
						new AdministrationRoute('intravenosa', 'Vía intravenosa.'),
						'Administrar por vía intravenosa en casos graves de retención de líquidos.'
					),
				]
			),
			new Drug(
				'Levotiroxina',
				'Medicamento utilizado para tratar el hipotiroidismo.',
				[new DrugType('Hormona tiroidea', 'Suplementa la hormona tiroidea.')],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día en ayunas, por la mañana.'
					),
				]
			),
			new Drug(
				'Insulina',
				'Hormona utilizada para controlar los niveles de glucosa en la diabetes.',
				[
					new DrugType(
						'Antidiabético',
						'Regula los niveles de glucosa en sangre.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('subcutánea', 'Inyección subcutánea.'),
						'Administrar según las indicaciones del médico, generalmente antes de las comidas.'
					),
				]
			),
			new Drug(
				'Warfarina',
				'Anticoagulante utilizado para prevenir coágulos sanguíneos.',
				[new DrugType('Anticoagulante', 'Previene la formación de coágulos.')],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día a la misma hora.'
					),
				]
			),
			new Drug(
				'Clopidogrel',
				'Medicamento utilizado para prevenir la formación de coágulos en personas con alto riesgo de enfermedad cardiovascular.',
				[
					new DrugType(
						'Antiplaquetario',
						'Previene la agregación de plaquetas.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día, con o sin alimentos.'
					),
				]
			),
			new Drug(
				'Lisinopril',
				'Medicamento utilizado para tratar la hipertensión y la insuficiencia cardíaca.',
				[
					new DrugType(
						'Inhibidor de la ECA',
						'Reduce la presión arterial y mejora la función cardíaca.'
					),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día, con o sin alimentos.'
					),
				]
			),
			new Drug(
				'Aspirina',
				'Medicamento utilizado para reducir el dolor, la fiebre y prevenir coágulos.',
				[
					new DrugType('Analgésico', 'Alivia el dolor.'),
					new DrugType('Antipirético', 'Reduce la fiebre.'),
					new DrugType('Antiplaquetario', 'Previene la formación de coágulos.'),
				],
				[],
				[
					new AdministrationProcedure(
						new AdministrationRoute('oral', 'Vía oral.'),
						'Tomar una vez al día como antiplaquetario, o cada 4-6 horas para aliviar dolor o fiebre.'
					),
				]
			),
		]
	}

	async add(drug: Drug) {
		MemoryDrugRepository.drugs.push(drug)
	}

	async getAll(): Promise<Drug[]> {
		return MemoryDrugRepository.drugs
	}

	async findByName(name: string): Promise<Drug | undefined> {
		return MemoryDrugRepository.drugs.find((drug) => drug.getName() === name)
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
