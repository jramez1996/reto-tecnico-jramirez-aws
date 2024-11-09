// src/shared/errors/errorHandler.js
class errorHandler extends Error {
    constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = errorHandler;
  