class AppError extends Error {
  constructor(message, status) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = status || 500;
  }
}

module.exports = { AppError };
