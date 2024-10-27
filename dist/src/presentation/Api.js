"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const drug_router_1 = require("./drug/drug_router");
const authentication_router_1 = require("./auth/authentication_router");
class Api {
    constructor(applicationServices) {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.applicationServices = applicationServices;
    }
    run(port) {
        this.app.get('/', (_, res) => {
            res.json({
                message: 'Api OK!',
            });
        });
        this.app.use('/auth', (0, authentication_router_1.makeAuthenticationRouter)(this.applicationServices.getUserServices()));
        this.app.use('/drugs', (0, drug_router_1.makeDrugRouter)(this.applicationServices.getDrugServices()));
        this.app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
}
exports.default = Api;
