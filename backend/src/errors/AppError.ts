export class AppError extends Error {

  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.statusCode = statusCode;

    // 🔥 Corrige prototype (importante no TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
