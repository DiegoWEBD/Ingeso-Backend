"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const User_1 = __importDefault(require("../user/User"));
class Student extends User_1.default {
    constructor(name, institutionalEmail) {
        super(name, institutionalEmail);
        this.name = name;
        this.institutionalEmail = institutionalEmail;
    }
}
exports.Student = Student;
