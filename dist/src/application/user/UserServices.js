"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_user_1 = require("./use_cases/find_user");
const get_user_1 = require("./use_cases/get_user");
const register_student_1 = require("./use_cases/register_student");
const register_teacher_1 = require("./use_cases/register_teacher");
class UserServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.registerStudent = (0, register_student_1.makeRegisterStudent)(this.userRepository);
        this.registerTeacher = (0, register_teacher_1.makeRegisterTeacher)(this.userRepository);
        this.getUser = (0, get_user_1.makeGetUser)(this.userRepository);
        this.findUser = (0, find_user_1.makeFindUser)(this.userRepository);
    }
}
exports.default = UserServices;
