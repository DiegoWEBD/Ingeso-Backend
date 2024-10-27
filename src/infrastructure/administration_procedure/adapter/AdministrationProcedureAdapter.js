"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdministrationProcedureAdpater = /** @class */ (function () {
    function AdministrationProcedureAdpater() {
    }
    AdministrationProcedureAdpater.ToJSON = function (administrationProcedure) {
        return {
            method: administrationProcedure.getMethod(),
            procedure: administrationProcedure.getProcedure(),
        };
    };
    return AdministrationProcedureAdpater;
}());
exports.default = AdministrationProcedureAdpater;
