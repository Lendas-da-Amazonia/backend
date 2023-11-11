export class MythNotExistsException extends Error {
  constructor() {
    super();
    this.message = 'Essa Lenda não existe';
  }
}

export class AlreadyFavoriteException extends Error {
  constructor() {
    super();
    this.name = 'Lenda já favoritada';
  }
}
