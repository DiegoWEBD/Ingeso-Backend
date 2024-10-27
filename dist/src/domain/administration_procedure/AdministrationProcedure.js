"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdministrationProcedure {
    constructor(method, procedure) {
        this.method = method;
        this.procedure = procedure;
    }
    getMethod() {
        return this.method;
    }
    getProcedure() {
        return this.procedure;
    }
}
exports.default = AdministrationProcedure;
