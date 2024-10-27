"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticationRouter = void 0;
var express_1 = require("express");
var authentication_request_handler_1 = require("./authentication_request_handler");
var controller_1 = require("../http/controller");
var makeAuthenticationRouter = function (userServices) {
    var requestHandler = (0, authentication_request_handler_1.makeAuthenticationRequestHandler)(userServices);
    var authenticationController = (0, controller_1.makeController)(requestHandler);
    var router = (0, express_1.Router)();
    router.all('/', authenticationController);
    return router;
};
exports.makeAuthenticationRouter = makeAuthenticationRouter;
