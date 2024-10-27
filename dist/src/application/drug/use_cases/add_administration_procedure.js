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
exports.makeAddAdministrationProcedure = void 0;
const AdministrationProcedure_1 = __importDefault(require("../../../domain/administration_procedure/AdministrationProcedure"));
const already_exists_1 = __importDefault(require("../../errors/already_exists"));
const invalid_input_1 = __importDefault(require("../../errors/invalid_input"));
const not_found_1 = __importDefault(require("../../errors/not_found"));
const makeAddAdministrationProcedure = (drugRepository) => {
    return (drugName, method, procedure) => __awaiter(void 0, void 0, void 0, function* () {
        const validMethods = new Set([
            'bolo directo',
            'bolo intermitente',
            'infusión continua',
        ]);
        if (!validMethods.has(method)) {
            throw new invalid_input_1.default(`Método '${method}' inválido.`);
        }
        const drug = yield drugRepository.findByName(drugName);
        if (drug === null) {
            throw new not_found_1.default(`El fármaco '${drugName}' no está registrado.`);
        }
        for (let administrationProcedure of drug.getAdministrationProcedures()) {
            if (administrationProcedure.getMethod() === method) {
                throw new already_exists_1.default(`Ya hay un procedimiento registrado para el fármaco '${drugName}' mediante el método '${method}'.`);
            }
        }
        const administrationProcedure = new AdministrationProcedure_1.default(method, procedure);
        drug.getAdministrationProcedures().push(administrationProcedure);
        yield drugRepository.update(drugName, drug);
        return drug;
    });
};
exports.makeAddAdministrationProcedure = makeAddAdministrationProcedure;
