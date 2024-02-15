import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: string[] = [],
    public stack: string = ""
  ) {
    super(message);
    this.name = "ErrorResponse";
    this.status = status;
    (this.message = message), (this.errors = errors);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const sendErrorResponse = (res: Response, error: ApiError): void => {
  res.status(error.status || 500).json({
    error: {
      message: error.message || "Internal Server Error",
    },
  });
};
