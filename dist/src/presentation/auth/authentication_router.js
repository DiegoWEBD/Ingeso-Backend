"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticationRouter = void 0;
const express_1 = require("express");
const authentication_request_handler_1 = require("./authentication_request_handler");
const controller_1 = require("../http/controller");
const makeAuthenticationRouter = (userServices) => {
    const requestHandler = (0, authentication_request_handler_1.makeAuthenticationRequestHandler)(userServices);
    const authenticationController = (0, controller_1.makeController)(requestHandler);
    const router = (0, express_1.Router)();
    router.all('/', authenticationController);
    return router;
};
exports.makeAuthenticationRouter = makeAuthenticationRouter;
