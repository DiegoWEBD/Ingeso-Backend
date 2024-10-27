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
exports.makeDrugRequestHandler = void 0;
const http_error_1 = __importDefault(require("../http/http_error"));
const http_response_1 = require("../http/http_response");
const DrugAdapter_1 = __importDefault(require("../../infrastructure/drug/adapter/DrugAdapter"));
const makeDrugRequestHandler = (drugServices) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        switch (request.method) {
            case 'GET': {
                if (request.params.name) {
                    const drug = yield drugServices.getDrugInformation(request.params.name);
                    return (0, http_response_1.makeHttpResponse)(200, DrugAdapter_1.default.ToJSON(drug));
                }
                const drugsNames = yield drugServices.getDrugsNames();
                return (0, http_response_1.makeHttpResponse)(200, drugsNames);
            }
            default: {
                throw new http_error_1.default(405, `Método ${request.method} no permitido.`);
            }
        }
    });
};
exports.makeDrugRequestHandler = makeDrugRequestHandler;
