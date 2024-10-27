"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHttpResponse = void 0;
const makeHttpResponse = (code, data = null) => Object.freeze({ code, data });
exports.makeHttpResponse = makeHttpResponse;
