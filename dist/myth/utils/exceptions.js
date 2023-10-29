"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MythNotFound = exports.PermissionError = void 0;
class PermissionError extends Error {
    constructor() {
        super();
        this.message = 'Você não tem permissão para deletar esta lenda!';
    }
}
exports.PermissionError = PermissionError;
class MythNotFound extends Error {
    constructor() {
        super();
        this.message = 'Essa lenda não foi encontrada';
    }
}
exports.MythNotFound = MythNotFound;
//# sourceMappingURL=exceptions.js.map