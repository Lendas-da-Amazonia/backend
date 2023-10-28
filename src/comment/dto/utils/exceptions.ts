export class CommentNotFoundException extends Error {
  constructor(commentId: number) {
    super(`Comment with id ${commentId} not found`);
    this.name = 'CommentNotFoundException';
  }
}

export class MythNotExistsException extends Error {
  constructor() {
    super();
    this.name = 'Essa Lenda não existe';
  }
}

export class CommentNotExistsException extends Error {
  constructor() {
    super();
    this.name = 'Comentário não foi encontrado';
  }
}

export class PermissionError extends Error {
  constructor() {
    super();
    this.name = 'Você não tem permissão para editar esse comentário';
  }
}
