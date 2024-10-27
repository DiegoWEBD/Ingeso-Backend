"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdministrationProcedure = /** @class */ (function () {
    function AdministrationProcedure(method, procedure) {
        this.method = method;
        this.procedure = procedure;
    }
    AdministrationProcedure.prototype.getMethod = function () {
        return this.method;
    };
    AdministrationProcedure.prototype.getProcedure = function () {
        return this.procedure;
    };
    return AdministrationProcedure;
}());
exports.default = AdministrationProcedure;
