"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = exports.CommentNotExistsException = exports.MythNotExistsException = exports.CommentNotFoundException = void 0;
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
class CommentNotExistsException extends Error {
    constructor() {
        super();
        this.name = 'Comentário não foi encontrado';
    }
}
exports.CommentNotExistsException = CommentNotExistsException;
class PermissionError extends Error {
    constructor() {
        super();
        this.name = 'Você não tem permissão para editar esse comentário';
    }
}
exports.PermissionError = PermissionError;
//# sourceMappingURL=exceptions.js.map