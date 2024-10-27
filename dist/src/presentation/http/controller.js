"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeController = void 0;
const application_error_to_http_error_1 = require("../../infrastructure/error_adapters/application_error_to_http_error");
const http_error_1 = __importDefault(require("./http_error"));
const makeController = (requestHandler) => {
    return (req, res) => {
        requestHandler(req)
            .then((httpResponse) => {
            res.status(httpResponse.code).json(httpResponse.data);
        })
            .catch((error) => {
            let httpError = error instanceof http_error_1.default
                ? error
                : (0, application_error_to_http_error_1.applicationErrorToHttpError)(error);
            res.status(httpError.code).json({
                message: error.message,
            });
        });
    };
};
exports.makeController = makeController;
