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
exports.makeRegisterTeacher = void 0;
const Teacher_1 = __importDefault(require("../../../domain/teacher/Teacher"));
const already_exists_1 = __importDefault(require("../../errors/already_exists"));
const makeRegisterTeacher = (userRepository) => {
    return (institutionalEmail, name) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield userRepository.findByInstitutionalEmail(institutionalEmail);
        if (existingUser !== null) {
            throw new already_exists_1.default(`El correo '${institutionalEmail}' ya está registrado.`);
        }
        const newTeacher = new Teacher_1.default(name, institutionalEmail);
        yield userRepository.add(newTeacher);
        return newTeacher;
    });
};
exports.makeRegisterTeacher = makeRegisterTeacher;
