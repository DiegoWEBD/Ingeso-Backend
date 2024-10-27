"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationErrorToHttpError = void 0;
const already_exists_1 = __importDefault(require("../../application/errors/already_exists"));
const not_found_1 = __importDefault(require("../../application/errors/not_found"));
const http_error_1 = __importDefault(require("../../presentation/http/http_error"));
const applicationErrorToHttpError = (applicationError) => {
    if (applicationError instanceof not_found_1.default)
        return new http_error_1.default(404, applicationError.message);
    if (applicationError instanceof already_exists_1.default)
        return new http_error_1.default(409, applicationError.message);
    return new http_error_1.default(500, applicationError.message);
};
exports.applicationErrorToHttpError = applicationErrorToHttpError;
