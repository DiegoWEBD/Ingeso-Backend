"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DrugClassificationAdapter = /** @class */ (function () {
    function DrugClassificationAdapter() {
    }
    DrugClassificationAdapter.ToJSON = function (drugClassification) {
        return {
            classification: drugClassification.getClassification(),
            description: drugClassification.getDescription(),
        };
    };
    return DrugClassificationAdapter;
}());
exports.default = DrugClassificationAdapter;
