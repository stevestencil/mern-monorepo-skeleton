import { ZodError } from "zod";

import type { ErrorRequestHandler, Request, Response } from "express";

export interface ErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;
  constructor(
    status: number,
    code: string,
    message: string,
    details?: unknown,
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
  static badRequest(message: string, details?: unknown) {
    return new AppError(400, "BAD_REQUEST", message, details);
  }
  static notFound(message = "Not found") {
    return new AppError(404, "NOT_FOUND", message);
  }
  static internal(message = "Internal server error") {
    return new AppError(500, "INTERNAL", message);
  }
}

export function formatZod(err: ZodError): ErrorEnvelope {
  return {
    error: {
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      details: err.issues,
    },
  };
}

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
) => {
  if (err instanceof AppError) {
    const body: ErrorEnvelope = {
      error: { code: err.code, message: err.message, details: err.details },
    };
    return res.status(err.status).json(body);
  }
  if (err instanceof ZodError) {
    const body = formatZod(err);
    return res.status(400).json(body);
  }
  const body: ErrorEnvelope = {
    error: { code: "INTERNAL", message: "Internal server error" },
  };
  return res.status(500).json(body);
};
