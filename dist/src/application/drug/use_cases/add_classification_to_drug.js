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
exports.makeAddClassificationToDrug = void 0;
const already_exists_1 = __importDefault(require("../../errors/already_exists"));
const not_found_1 = __importDefault(require("../../errors/not_found"));
const makeAddClassificationToDrug = (drugRepository, drugClassificationRepository) => {
    return (drugName, classification) => __awaiter(void 0, void 0, void 0, function* () {
        const drugClassification = yield drugClassificationRepository.findByClassification(classification);
        if (drugClassification === null) {
            throw new not_found_1.default(`La clasificación de fármaco '${classification}' no está registrada.`);
        }
        const drug = yield drugRepository.findByName(drugName);
        if (drug === null) {
            throw new not_found_1.default(`El fármaco '${drugName}' no está registrado.`);
        }
        const drugClassifications = drug.getDrugClassifications();
        for (let drugClassification of drugClassifications) {
            if (drugClassification.getClassification() === classification) {
                throw new already_exists_1.default(`La relación entre el fármaco '${drugName}' y la clasificación '${classification}' ya está registrada.`);
            }
        }
        drug.getDrugClassifications().push(drugClassification);
        yield drugRepository.update(drugName, drug);
        return drug;
    });
};
exports.makeAddClassificationToDrug = makeAddClassificationToDrug;
