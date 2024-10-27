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
exports.makeFindByName = void 0;
const DrugAdapter_1 = __importDefault(require("../adapter/DrugAdapter"));
const makeFindByName = (database) => {
    return (name) => __awaiter(void 0, void 0, void 0, function* () {
        const drugData = yield database.queryMany('select d.name, d.presentation, d.description, ap.method, ap.procedure, r.reaction, dca.classification ' +
            'from drug d left join administration_procedure ap on d.name = ap.drug_name ' +
            'left join ram r on d.name = r.drug_name ' +
            'left join drug_classification_association dca ' +
            'on d.name = dca.drug_name ' +
            'where d.name = $1', [name]);
        return drugData.length > 0 ? DrugAdapter_1.default.FromDB(drugData) : null;
    });
};
exports.makeFindByName = makeFindByName;
