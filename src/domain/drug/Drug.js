"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Drug = /** @class */ (function () {
    function Drug(name, presentation, description, drugClassifications, rams, administrationProcedures) {
        this.name = name;
        this.presentation = presentation;
        this.description = description;
        this.drugClassifications = drugClassifications;
        this.rams = rams;
        this.administrationProcedures = administrationProcedures;
    }
    Drug.prototype.getName = function () {
        return this.name;
    };
    Drug.prototype.getDescription = function () {
        return this.description;
    };
    Drug.prototype.getPresentation = function () {
        return this.presentation;
    };
    Drug.prototype.getDrugClassifications = function () {
        return this.drugClassifications;
    };
    Drug.prototype.getRams = function () {
        return this.rams;
    };
    Drug.prototype.getAdministrationProcedures = function () {
        return this.administrationProcedures;
    };
    return Drug;
}());
exports.default = Drug;
