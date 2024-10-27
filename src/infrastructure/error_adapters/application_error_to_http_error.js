"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationErrorToHttpError = void 0;
var already_exists_1 = require("../../application/errors/already_exists");
var not_found_1 = require("../../application/errors/not_found");
var http_error_1 = require("../../presentation/http/http_error");
var applicationErrorToHttpError = function (applicationError) {
    if (applicationError instanceof not_found_1.default)
        return new http_error_1.default(404, applicationError.message);
    if (applicationError instanceof already_exists_1.default)
        return new http_error_1.default(409, applicationError.message);
    return new http_error_1.default(500, applicationError.message);
};
exports.applicationErrorToHttpError = applicationErrorToHttpError;
