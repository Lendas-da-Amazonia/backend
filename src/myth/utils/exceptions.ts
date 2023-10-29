export class PermissionError extends Error {
  constructor() {
    super();
    this.message = 'Você não tem permissão para deletar esta lenda!';
  }
}

export class MythNotFound extends Error {
  constructor() {
    super();
    this.message = 'Essa lenda não foi encontrada';
  }
}
