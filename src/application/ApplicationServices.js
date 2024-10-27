"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DrugServices_1 = require("./drug/DrugServices");
var DrugClassificationServices_1 = require("./drug_classification/DrugClassificationServices");
var UserServices_1 = require("./user/UserServices");
var ApplicationServices = /** @class */ (function () {
    function ApplicationServices(userRepository, drugClassificationRepository, drugRepository) {
        this.userServices = new UserServices_1.default(userRepository);
        this.drugClassificationServices = new DrugClassificationServices_1.default(drugClassificationRepository);
        this.drugServices = new DrugServices_1.default(drugRepository, drugClassificationRepository);
    }
    ApplicationServices.prototype.getUserServices = function () {
        return this.userServices;
    };
    ApplicationServices.prototype.getDrugClassificationServices = function () {
        return this.drugClassificationServices;
    };
    ApplicationServices.prototype.getDrugServices = function () {
        return this.drugServices;
    };
    return ApplicationServices;
}());
exports.default = ApplicationServices;
