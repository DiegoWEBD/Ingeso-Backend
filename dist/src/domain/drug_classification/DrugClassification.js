"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DrugClassification {
    constructor(classification, description) {
        this.classification = classification;
        this.description = description;
    }
    getClassification() {
        return this.classification;
    }
    getDescription() {
        return this.description;
    }
}
exports.default = DrugClassification;
