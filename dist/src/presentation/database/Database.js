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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
class Database {
    constructor() {
        /*this.connectionData = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        }*/
        const connectionUrl = process.env.POSTGRES_URL;
        this.pgp = (0, pg_promise_1.default)();
        try {
            this.db = this.pgp(connectionUrl);
        }
        catch (error) {
            console.log('Database connection refused.');
            throw new Error('Database could not connect.');
        }
    }
    execute(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.none(query, params);
        });
    }
    queryOne(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.oneOrNone(query, params);
            return data ? data : null;
        });
    }
    queryMany(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.manyOrNone(query, params);
            return data ? data : [];
        });
    }
    close() {
        this.pgp.end();
    }
}
exports.default = Database;
