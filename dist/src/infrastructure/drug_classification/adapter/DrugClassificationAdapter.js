"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DrugClassificationAdapter {
    constructor() { }
    static ToJSON(drugClassification) {
        return {
            classification: drugClassification.getClassification(),
            description: drugClassification.getDescription(),
        };
    }
}
exports.default = DrugClassificationAdapter;
