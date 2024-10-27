"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var drug_router_1 = require("./drug/drug_router");
var authentication_router_1 = require("./auth/authentication_router");
var Api = /** @class */ (function () {
    function Api(applicationServices) {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.applicationServices = applicationServices;
    }
    Api.prototype.run = function (port) {
        this.app.get('/', function (_, res) {
            res.json({
                message: 'Api OK!',
            });
        });
        this.app.use('/auth', (0, authentication_router_1.makeAuthenticationRouter)(this.applicationServices.getUserServices()));
        this.app.use('/drugs', (0, drug_router_1.makeDrugRouter)(this.applicationServices.getDrugServices()));
        this.app.listen(port, function () {
            console.log("Server running at http://localhost:".concat(port));
        });
    };
    return Api;
}());
exports.default = Api;
