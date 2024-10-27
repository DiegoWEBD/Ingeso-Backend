"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHttpResponse = void 0;
var makeHttpResponse = function (code, data) {
    if (data === void 0) { data = null; }
    return Object.freeze({ code: code, data: data });
};
exports.makeHttpResponse = makeHttpResponse;
