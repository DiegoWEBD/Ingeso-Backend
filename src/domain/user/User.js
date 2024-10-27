"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(name, institutionalEmail) {
        this.name = name;
        this.institutionalEmail = institutionalEmail;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getInstitutionalEmail = function () {
        return this.institutionalEmail;
    };
    return User;
}());
exports.default = User;
