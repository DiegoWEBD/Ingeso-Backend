"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdministrationProcedureAdpater {
    constructor() { }
    static ToJSON(administrationProcedure) {
        return {
            method: administrationProcedure.getMethod(),
            procedure: administrationProcedure.getProcedure(),
        };
    }
}
exports.default = AdministrationProcedureAdpater;
