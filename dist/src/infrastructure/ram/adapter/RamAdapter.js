"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RamAdapter {
    constructor() { }
    static ToJSON(ram) {
        return { reaction: ram.getReaction() };
    }
}
exports.default = RamAdapter;
