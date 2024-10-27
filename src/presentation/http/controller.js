"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeController = void 0;
var application_error_to_http_error_1 = require("../../infrastructure/error_adapters/application_error_to_http_error");
var http_error_1 = require("./http_error");
var makeController = function (requestHandler) {
    return function (req, res) {
        requestHandler(req)
            .then(function (httpResponse) {
            res.status(httpResponse.code).json(httpResponse.data);
        })
            .catch(function (error) {
            var httpError = error instanceof http_error_1.default
                ? error
                : (0, application_error_to_http_error_1.applicationErrorToHttpError)(error);
            res.status(httpError.code).json({
                message: error.message,
            });
        });
    };
};
exports.makeController = makeController;
