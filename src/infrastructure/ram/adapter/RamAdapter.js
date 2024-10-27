"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RamAdapter = /** @class */ (function () {
    function RamAdapter() {
    }
    RamAdapter.ToJSON = function (ram) {
        return { reaction: ram.getReaction() };
    };
    return RamAdapter;
}());
exports.default = RamAdapter;
