"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DrugServices_1 = __importDefault(require("./drug/DrugServices"));
const DrugClassificationServices_1 = __importDefault(require("./drug_classification/DrugClassificationServices"));
const UserServices_1 = __importDefault(require("./user/UserServices"));
class ApplicationServices {
    constructor(userRepository, drugClassificationRepository, drugRepository) {
        this.userServices = new UserServices_1.default(userRepository);
        this.drugClassificationServices = new DrugClassificationServices_1.default(drugClassificationRepository);
        this.drugServices = new DrugServices_1.default(drugRepository, drugClassificationRepository);
    }
    getUserServices() {
        return this.userServices;
    }
    getDrugClassificationServices() {
        return this.drugClassificationServices;
    }
    getDrugServices() {
        return this.drugServices;
    }
}
exports.default = ApplicationServices;
