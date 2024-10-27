"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Drug {
    constructor(name, presentation, description, drugClassifications, rams, administrationProcedures) {
        this.name = name;
        this.presentation = presentation;
        this.description = description;
        this.drugClassifications = drugClassifications;
        this.rams = rams;
        this.administrationProcedures = administrationProcedures;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getPresentation() {
        return this.presentation;
    }
    getDrugClassifications() {
        return this.drugClassifications;
    }
    getRams() {
        return this.rams;
    }
    getAdministrationProcedures() {
        return this.administrationProcedures;
    }
}
exports.default = Drug;
