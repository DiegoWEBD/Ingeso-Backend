"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_administration_procedure_1 = require("./use_cases/add_administration_procedure");
var add_classification_to_drug_1 = require("./use_cases/add_classification_to_drug");
var add_ram_to_drug_1 = require("./use_cases/add_ram_to_drug");
var get_drug_information_1 = require("./use_cases/get_drug_information");
var get_drugs_names_1 = require("./use_cases/get_drugs_names");
var register_drug_1 = require("./use_cases/register_drug");
var DrugServices = /** @class */ (function () {
    function DrugServices(drugRepository, drugClassificationRepository) {
        this.drugRepository = drugRepository;
        this.drugClassificationRepository = drugClassificationRepository;
        this.getDrugInformation = (0, get_drug_information_1.makeGetDrugInformation)(this.drugRepository);
        this.getDrugsNames = (0, get_drugs_names_1.makeGetDrugsNames)(this.drugRepository);
        this.registerDrug = (0, register_drug_1.makeRegisterDrug)(this.drugRepository, this.drugClassificationRepository);
        this.addClassificationToDrug = (0, add_classification_to_drug_1.makeAddClassificationToDrug)(this.drugRepository, this.drugClassificationRepository);
        this.addRamToDrug = (0, add_ram_to_drug_1.makeAddRamToDrug)(this.drugRepository);
        this.addAdministrationProcedure = (0, add_administration_procedure_1.makeAddAdministrationProcedure)(this.drugRepository);
    }
    return DrugServices;
}());
exports.default = DrugServices;
