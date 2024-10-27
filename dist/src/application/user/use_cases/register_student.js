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
exports.makeRegisterStudent = void 0;
const Student_1 = require("../../../domain/student/Student");
const already_exists_1 = __importDefault(require("../../errors/already_exists"));
const makeRegisterStudent = (userRepository) => {
    return (institutionalEmail, name) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield userRepository.findByInstitutionalEmail(institutionalEmail);
        if (existingUser !== null) {
            throw new already_exists_1.default(`El correo '${institutionalEmail}' ya está registrado.`);
        }
        const newStudent = new Student_1.Student(name, institutionalEmail);
        yield userRepository.add(newStudent);
        return newStudent;
    });
};
exports.makeRegisterStudent = makeRegisterStudent;
