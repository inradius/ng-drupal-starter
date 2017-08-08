export class Error {
  code: string;
  message: string;
  constructor(options: {
      code?: string,
      message?: string
    } = {}) {
    this.code = options.code || null;
    this.message = options.message || null;
  }
  public toString(): string {
    return this.message;
  }
}
