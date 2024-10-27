"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delete_drug_classification_1 = require("./use_cases/delete_drug_classification");
var register_drug_classification_1 = require("./use_cases/register_drug_classification");
var DrugClassificationServices = /** @class */ (function () {
    function DrugClassificationServices(drugClassificationRepository) {
        this.drugClassificationRepository = drugClassificationRepository;
        this.registerDrugClassification = (0, register_drug_classification_1.makeRegisterDrugClassification)(this.drugClassificationRepository);
        this.deleteDrugClassification = (0, delete_drug_classification_1.makeDeleteDrugClassification)(this.drugClassificationRepository);
    }
    return DrugClassificationServices;
}());
exports.default = DrugClassificationServices;
