import { HttpStatusCode } from "~/type/httpStatusCode";

class BaseError extends Error {
  httpCode: number;
  isOperational: boolean;

  constructor(
    httpCode: number,
    name: string,
    message: string,
    isOperational: boolean,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

class HTTP400Error extends BaseError {
  constructor(message = "Bad request") {
    super(HttpStatusCode.BAD_REQUEST, "BAD REQUEST", message, true);
  }
}

class HTTP500Error extends BaseError {
  constructor(
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    name: string,
    message = "Internal server error",
    isOperational = true,
  ) {
    super(httpCode, name, message, isOperational);
  }
}

export { HTTP400Error, HTTP500Error };
