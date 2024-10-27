"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_drug_classification_1 = require("./use_cases/delete_drug_classification");
const register_drug_classification_1 = require("./use_cases/register_drug_classification");
class DrugClassificationServices {
    constructor(drugClassificationRepository) {
        this.drugClassificationRepository = drugClassificationRepository;
        this.registerDrugClassification = (0, register_drug_classification_1.makeRegisterDrugClassification)(this.drugClassificationRepository);
        this.deleteDrugClassification = (0, delete_drug_classification_1.makeDeleteDrugClassification)(this.drugClassificationRepository);
    }
}
exports.default = DrugClassificationServices;
