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
const Student_1 = require("../../domain/student/Student");
const Teacher_1 = __importDefault(require("../../domain/teacher/Teacher"));
class PostgresUserRepository {
    constructor(database) {
        this.database = database;
    }
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.execute('insert into app_user (institutional_email, name) values ($1, $2)', [user.getInstitutionalEmail(), user.getName()]);
            if (user instanceof Teacher_1.default) {
                yield this.database.execute('insert into teacher (institutional_email) values ($1)', [user.getInstitutionalEmail()]);
            }
            else if (user instanceof Student_1.Student) {
                yield this.database.execute('insert into student (institutional_email) values ($1)', [user.getInstitutionalEmail()]);
            }
        });
    }
    findByInstitutionalEmail(institutionalEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = yield this.database.queryOne('select t.institutional_email, au.name from teacher t inner join app_user au on t.institutional_email = au.institutional_email where t.institutional_email = $1', [institutionalEmail]);
            if (userData !== null) {
                return new Teacher_1.default(userData.name, institutionalEmail);
            }
            userData = yield this.database.queryOne('select s.institutional_email, au.name from student s inner join app_user au on s.institutional_email = au.institutional_email where s.institutional_email = $1', [institutionalEmail]);
            return userData !== null
                ? new Student_1.Student(userData.name, institutionalEmail)
                : null;
        });
    }
}
exports.default = PostgresUserRepository;
