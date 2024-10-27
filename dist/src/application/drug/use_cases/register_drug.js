"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterDrug = void 0;
const AdministrationProcedure_1 = __importDefault(require("../../../domain/administration_procedure/AdministrationProcedure"));
const Drug_1 = __importDefault(require("../../../domain/drug/Drug"));
const Ram_1 = __importDefault(require("../../../domain/ram/Ram"));
const already_exists_1 = __importDefault(require("../../errors/already_exists"));
const not_found_1 = __importDefault(require("../../errors/not_found"));
const makeRegisterDrug = (drugRepository, drugClassificationRepository) => {
    return (name, presentation, description, classifications, reactions, administrationMethodsWithProcedure) => __awaiter(void 0, void 0, void 0, function* () {
        const existingDrug = yield drugRepository.findByName(name);
        if (existingDrug !== undefined) {
            throw new already_exists_1.default(`El fármaco '${name}' ya está registrado.`);
        }
        const drugClassifications = [];
        for (let classification of classifications) {
            const drugClassification = yield drugClassificationRepository.findByClassification(classification);
            if (drugClassification === null) {
                throw new not_found_1.default(`La clasificación '${classification}' no está registrada.`);
            }
            drugClassifications.push(drugClassification);
        }
        const administrationProcedures = [];
        for (let methodProcedure of administrationMethodsWithProcedure) {
            const method = methodProcedure[0];
            const procedure = methodProcedure[1];
            const administrationProcedure = new AdministrationProcedure_1.default(method, procedure);
            administrationProcedures.push(administrationProcedure);
        }
        const rams = [];
        for (let reaction of reactions) {
            rams.push(new Ram_1.default(reaction));
        }
        const newDrug = new Drug_1.default(name, presentation, description, drugClassifications, rams, administrationProcedures);
        yield drugRepository.add(newDrug);
        return newDrug;
    });
};
exports.makeRegisterDrug = makeRegisterDrug;
