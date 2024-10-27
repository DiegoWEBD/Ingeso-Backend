"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationError extends Error {
    constructor(message = 'El recurso ya existe.') {
        super(message);
    }
}
exports.default = ApplicationError;
