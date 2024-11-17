import Drug from './Drug';

export interface IDrugValidator {
  validate(drug: Drug): Promise<string[]>;
}