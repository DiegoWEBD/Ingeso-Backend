"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDrugRouter = void 0;
const express_1 = require("express");
const drug_request_handler_1 = require("./drug_request_handler");
const controller_1 = require("../http/controller");
const makeDrugRouter = (drugServices) => {
    const requestHandler = (0, drug_request_handler_1.makeDrugRequestHandler)(drugServices);
    const drugController = (0, controller_1.makeController)(requestHandler);
    const router = (0, express_1.Router)();
    router.all('/', drugController);
    router.all('/:name', drugController);
    return router;
};
exports.makeDrugRouter = makeDrugRouter;
