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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterDrug = void 0;
var AdministrationProcedure_1 = require("../../../domain/administration_procedure/AdministrationProcedure");
var Drug_1 = require("../../../domain/drug/Drug");
var Ram_1 = require("../../../domain/ram/Ram");
var already_exists_1 = require("../../errors/already_exists");
var not_found_1 = require("../../errors/not_found");
var makeRegisterDrug = function (drugRepository, drugClassificationRepository) {
    return function (name, presentation, description, classifications, reactions, administrationMethodsWithProcedure) { return __awaiter(void 0, void 0, void 0, function () {
        var existingDrug, drugClassifications, _i, classifications_1, classification, drugClassification, administrationProcedures, _a, administrationMethodsWithProcedure_1, methodProcedure, method, procedure, administrationProcedure, rams, _b, reactions_1, reaction, newDrug;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, drugRepository.findByName(name)];
                case 1:
                    existingDrug = _c.sent();
                    if (existingDrug !== undefined) {
                        throw new already_exists_1.default("El f\u00E1rmaco '".concat(name, "' ya est\u00E1 registrado."));
                    }
                    drugClassifications = [];
                    _i = 0, classifications_1 = classifications;
                    _c.label = 2;
                case 2:
                    if (!(_i < classifications_1.length)) return [3 /*break*/, 5];
                    classification = classifications_1[_i];
                    return [4 /*yield*/, drugClassificationRepository.findByClassification(classification)];
                case 3:
                    drugClassification = _c.sent();
                    if (drugClassification === null) {
                        throw new not_found_1.default("La clasificaci\u00F3n '".concat(classification, "' no est\u00E1 registrada."));
                    }
                    drugClassifications.push(drugClassification);
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    administrationProcedures = [];
                    for (_a = 0, administrationMethodsWithProcedure_1 = administrationMethodsWithProcedure; _a < administrationMethodsWithProcedure_1.length; _a++) {
                        methodProcedure = administrationMethodsWithProcedure_1[_a];
                        method = methodProcedure[0];
                        procedure = methodProcedure[1];
                        administrationProcedure = new AdministrationProcedure_1.default(method, procedure);
                        administrationProcedures.push(administrationProcedure);
                    }
                    rams = [];
                    for (_b = 0, reactions_1 = reactions; _b < reactions_1.length; _b++) {
                        reaction = reactions_1[_b];
                        rams.push(new Ram_1.default(reaction));
                    }
                    newDrug = new Drug_1.default(name, presentation, description, drugClassifications, rams, administrationProcedures);
                    return [4 /*yield*/, drugRepository.add(newDrug)];
                case 6:
                    _c.sent();
                    return [2 /*return*/, newDrug];
            }
        });
    }); };
};
exports.makeRegisterDrug = makeRegisterDrug;
