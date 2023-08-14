import { AxiosError } from "axios";
import { Application, NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "~/type/httpStatusCode";
import { HTTP400Error } from "~/utils/errors";

interface ErrorResponse {
  name: string;
  httpCode: number;
  isOperational: boolean;
  message: string;
  stack: string | undefined;
}

const createErrorResponse = (error: Error, httpCode: number): ErrorResponse => {
  return {
    name: error.name,
    httpCode: httpCode,
    isOperational: error instanceof HTTP400Error,
    message: error.message,
    stack: error.stack,
  };
};

export const configureErrorHandler = (app: Application): void => {
  app.use(
    (error: Error, _: Request, res: Response, next: NextFunction): void => {
      if (res.headersSent) {
        return next(error);
      }

      if (error instanceof AxiosError) {
        const httpCode =
          error.response?.status || HttpStatusCode.INTERNAL_SERVER;
        const axiosError: ErrorResponse = {
          name: error.code || "AxiosError",
          httpCode: httpCode,
          isOperational: false,
          message:
            error.response?.data?.error?.message?.value ||
            "An error occurred while processing the request.",
          stack: error.stack,
        };
        res.status(httpCode).json(axiosError);
      } else if (error instanceof HTTP400Error) {
        const errorJson: ErrorResponse = createErrorResponse(
          error,
          error.httpCode
        );
        res.status(error.httpCode).json(errorJson);
      } else {
        const errorJson: ErrorResponse = createErrorResponse(
          error,
          HttpStatusCode.INTERNAL_SERVER
        );
        res.status(HttpStatusCode.INTERNAL_SERVER).json(errorJson);
      }
    }
  );
};
