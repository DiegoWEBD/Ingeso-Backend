"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_by_name_1 = require("./find_by_name");
const get_all_names_1 = require("./get_all_names");
class PostgresDrugRepository {
    constructor(database) {
        this.database = database;
        this.add = () => __awaiter(this, void 0, void 0, function* () { });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            throw new Error('To do.');
        });
        this.getAllNames = (0, get_all_names_1.makeGetAllNames)(this.database);
        this.findByName = (0, find_by_name_1.makeFindByName)(this.database);
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            throw new Error('To do.');
        });
        this.delete = () => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = PostgresDrugRepository;
