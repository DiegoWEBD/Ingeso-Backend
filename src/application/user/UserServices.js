"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_user_1 = require("./use_cases/find_user");
var get_user_1 = require("./use_cases/get_user");
var register_student_1 = require("./use_cases/register_student");
var register_teacher_1 = require("./use_cases/register_teacher");
var UserServices = /** @class */ (function () {
    function UserServices(userRepository) {
        this.userRepository = userRepository;
        this.registerStudent = (0, register_student_1.makeRegisterStudent)(this.userRepository);
        this.registerTeacher = (0, register_teacher_1.makeRegisterTeacher)(this.userRepository);
        this.getUser = (0, get_user_1.makeGetUser)(this.userRepository);
        this.findUser = (0, find_user_1.makeFindUser)(this.userRepository);
    }
    return UserServices;
}());
exports.default = UserServices;
