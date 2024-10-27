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
exports.makeRegisterDrugClassification = void 0;
const DrugClassification_1 = __importDefault(require("../../../domain/drug_classification/DrugClassification"));
const already_exists_1 = __importDefault(require("../../errors/already_exists"));
const makeRegisterDrugClassification = (drugClassificationRepository) => {
    return (classification, description) => __awaiter(void 0, void 0, void 0, function* () {
        const drugType = yield drugClassificationRepository.findByClassification(classification);
        if (drugType !== null) {
            throw new already_exists_1.default(`La clasificación de fármaco '${classification}' ya está registrada.`);
        }
        const newDrugType = new DrugClassification_1.default(classification, description);
        yield drugClassificationRepository.add(newDrugType);
        return newDrugType;
    });
};
exports.makeRegisterDrugClassification = makeRegisterDrugClassification;
