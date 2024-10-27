"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdministrationProcedure_1 = __importDefault(require("../../../domain/administration_procedure/AdministrationProcedure"));
const Drug_1 = __importDefault(require("../../../domain/drug/Drug"));
const Ram_1 = __importDefault(require("../../../domain/ram/Ram"));
const AdministrationProcedureAdapter_1 = __importDefault(require("../../administration_procedure/adapter/AdministrationProcedureAdapter"));
const DrugClassificationAdapter_1 = __importDefault(require("../../drug_classification/adapter/DrugClassificationAdapter"));
const RamAdapter_1 = __importDefault(require("../../ram/adapter/RamAdapter"));
class DrugAdapter {
    constructor() { }
    static ToJSON(drug) {
        return {
            name: drug.getName(),
            presentation: drug.getPresentation(),
            description: drug.getDescription(),
            drug_classifications: drug
                .getDrugClassifications()
                .map(DrugClassificationAdapter_1.default.ToJSON),
            rams: drug.getRams().map(RamAdapter_1.default.ToJSON),
            administration_procedures: drug
                .getAdministrationProcedures()
                .map(AdministrationProcedureAdapter_1.default.ToJSON),
        };
    }
    static FromDB(dbDrug) {
        let adaptedDrug = {
            name: dbDrug[0].name,
            presentation: dbDrug[0].presentation,
            description: dbDrug[0].description,
            administrationProcedures: new Array(),
            rams: [new Ram_1.default(dbDrug[0].reaction)],
            classifications: new Array(),
        };
        for (let row of dbDrug) {
            if (!adaptedDrug.administrationProcedures.find((ap) => ap.getMethod() === row.method)) {
                adaptedDrug.administrationProcedures.push(new AdministrationProcedure_1.default(row.method, row.procedure));
            }
        }
        return new Drug_1.default(adaptedDrug.name, adaptedDrug.presentation, adaptedDrug.description, adaptedDrug.classifications, adaptedDrug.rams, adaptedDrug.administrationProcedures);
    }
}
exports.default = DrugAdapter;
