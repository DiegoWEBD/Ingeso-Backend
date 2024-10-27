"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserAdapter {
    constructor() { }
    static ToJSON(user) {
        return {
            name: user.getName(),
            institutional_email: user.getInstitutionalEmail(),
        };
    }
}
exports.default = UserAdapter;
