"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyFavoriteException = exports.MythNotExistsException = void 0;
class MythNotExistsException extends Error {
    constructor() {
        super();
        this.message = 'Essa Lenda não existe';
    }
}
exports.MythNotExistsException = MythNotExistsException;
class AlreadyFavoriteException extends Error {
    constructor() {
        super();
        this.name = 'Lenda já favoritada';
    }
}
exports.AlreadyFavoriteException = AlreadyFavoriteException;
//# sourceMappingURL=exception.js.map