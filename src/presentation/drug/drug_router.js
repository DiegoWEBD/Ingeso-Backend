"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDrugRouter = void 0;
var express_1 = require("express");
var drug_request_handler_1 = require("./drug_request_handler");
var controller_1 = require("../http/controller");
var makeDrugRouter = function (drugServices) {
    var requestHandler = (0, drug_request_handler_1.makeDrugRequestHandler)(drugServices);
    var drugController = (0, controller_1.makeController)(requestHandler);
    var router = (0, express_1.Router)();
    router.all('/', drugController);
    router.all('/:name', drugController);
    return router;
};
exports.makeDrugRouter = makeDrugRouter;
