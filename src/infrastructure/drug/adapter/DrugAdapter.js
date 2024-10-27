"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdministrationProcedure_1 = require("../../../domain/administration_procedure/AdministrationProcedure");
var Drug_1 = require("../../../domain/drug/Drug");
var Ram_1 = require("../../../domain/ram/Ram");
var AdministrationProcedureAdapter_1 = require("../../administration_procedure/adapter/AdministrationProcedureAdapter");
var DrugClassificationAdapter_1 = require("../../drug_classification/adapter/DrugClassificationAdapter");
var RamAdapter_1 = require("../../ram/adapter/RamAdapter");
var DrugAdapter = /** @class */ (function () {
    function DrugAdapter() {
    }
    DrugAdapter.ToJSON = function (drug) {
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
    };
    DrugAdapter.FromDB = function (dbDrug) {
        var adaptedDrug = {
            name: dbDrug[0].name,
            presentation: dbDrug[0].presentation,
            description: dbDrug[0].description,
            administrationProcedures: new Array(),
            rams: [new Ram_1.default(dbDrug[0].reaction)],
            classifications: new Array(),
        };
        var _loop_1 = function (row) {
            if (!adaptedDrug.administrationProcedures.find(function (ap) { return ap.getMethod() === row.method; })) {
                adaptedDrug.administrationProcedures.push(new AdministrationProcedure_1.default(row.method, row.procedure));
            }
        };
        for (var _i = 0, dbDrug_1 = dbDrug; _i < dbDrug_1.length; _i++) {
            var row = dbDrug_1[_i];
            _loop_1(row);
        }
        return new Drug_1.default(adaptedDrug.name, adaptedDrug.presentation, adaptedDrug.description, adaptedDrug.classifications, adaptedDrug.rams, adaptedDrug.administrationProcedures);
    };
    return DrugAdapter;
}());
exports.default = DrugAdapter;
