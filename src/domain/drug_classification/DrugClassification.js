"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DrugClassification = /** @class */ (function () {
    function DrugClassification(classification, description) {
        this.classification = classification;
        this.description = description;
    }
    DrugClassification.prototype.getClassification = function () {
        return this.classification;
    };
    DrugClassification.prototype.getDescription = function () {
        return this.description;
    };
    return DrugClassification;
}());
exports.default = DrugClassification;
