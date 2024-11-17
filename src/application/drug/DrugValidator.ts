import { IDrugValidator } from '../../domain/drug/IDrugValidator';
import Drug from '../../domain/drug/Drug';

export class DrugValidator implements IDrugValidator {
  async validate(drug: Drug): Promise<string[]> {
    const errors: string[] = [];

    if (!drug.getName() || drug.getName().trim() === '') {
      errors.push('El nombre del fármaco es requerido.');
    }

    if (!drug.getPresentation() || drug.getPresentation().trim() === '') {
      errors.push('La presentación del fármaco es requerida.');
    }

    if (!drug.getDescription() || drug.getDescription().trim() === '') {
      errors.push('La descripción del fármaco es requerida.');
    }

    if (drug.getDrugClassifications().length === 0) {
      errors.push('El fármaco debe tener al menos una clasificación.');
    }

    if (drug.getRams().length === 0) {
      errors.push('El fármaco debe tener al menos una RAM.');
    }

    if (drug.getAdministrationProcedures().length === 0) {
      errors.push('El fármaco debe tener al menos un procedimiento de administración.');
    }
    return errors;
  }
}