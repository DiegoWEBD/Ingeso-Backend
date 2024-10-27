"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, institutionalEmail) {
        this.name = name;
        this.institutionalEmail = institutionalEmail;
    }
    getName() {
        return this.name;
    }
    getInstitutionalEmail() {
        return this.institutionalEmail;
    }
}
exports.default = User;
