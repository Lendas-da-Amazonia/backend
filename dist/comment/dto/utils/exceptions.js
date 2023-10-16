"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MythNotExistsException = exports.CommentNotFoundException = void 0;
class CommentNotFoundException extends Error {
    constructor(commentId) {
        super(`Comment with id ${commentId} not found`);
        this.name = 'CommentNotFoundException';
    }
}
exports.CommentNotFoundException = CommentNotFoundException;
class MythNotExistsException extends Error {
    constructor() {
        super();
        this.name = 'Essa Lenda não existe';
    }
}
exports.MythNotExistsException = MythNotExistsException;
//# sourceMappingURL=exceptions.js.map