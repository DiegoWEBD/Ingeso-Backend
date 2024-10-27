"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserAdapter = /** @class */ (function () {
    function UserAdapter() {
    }
    UserAdapter.ToJSON = function (user) {
        return {
            name: user.getName(),
            institutional_email: user.getInstitutionalEmail(),
        };
    };
    return UserAdapter;
}());
exports.default = UserAdapter;
