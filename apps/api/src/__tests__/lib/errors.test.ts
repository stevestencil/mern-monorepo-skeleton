import { describe, it, expect, beforeEach } from "vitest";
import { ZodError, z } from "zod";

import { AppError, errorHandler, formatZod } from "../../lib/errors";

import type { Request, Response, NextFunction } from "express";

describe("AppError", () => {
  it("should create an AppError with correct properties", () => {
    const error = new AppError(400, "BAD_REQUEST", "Invalid input", {
      field: "email",
    });

    expect(error.status).toBe(400);
    expect(error.code).toBe("BAD_REQUEST");
    expect(error.message).toBe("Invalid input");
    expect(error.details).toEqual({ field: "email" });
    expect(error).toBeInstanceOf(Error);
  });

  it("should create badRequest error", () => {
    const error = AppError.badRequest("Email is required");

    expect(error.status).toBe(400);
    expect(error.code).toBe("BAD_REQUEST");
    expect(error.message).toBe("Email is required");
  });

  it("should create notFound error with default message", () => {
    const error = AppError.notFound();

    expect(error.status).toBe(404);
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("Not found");
  });

  it("should create notFound error with custom message", () => {
    const error = AppError.notFound("User not found");

    expect(error.status).toBe(404);
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("User not found");
  });

  it("should create internal error with default message", () => {
    const error = AppError.internal();

    expect(error.status).toBe(500);
    expect(error.code).toBe("INTERNAL");
    expect(error.message).toBe("Internal server error");
  });

  it("should create internal error with custom message", () => {
    const error = AppError.internal("Database connection failed");

    expect(error.status).toBe(500);
    expect(error.code).toBe("INTERNAL");
    expect(error.message).toBe("Database connection failed");
  });
});

describe("formatZod", () => {
  it("should format ZodError correctly", () => {
    const schema = z.object({
      email: z.string().email(),
      age: z.number().min(18),
    });

    try {
      schema.parse({ email: "invalid-email", age: 16 });
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted = formatZod(error);

        expect(formatted).toEqual({
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            details: error.issues,
          },
        });
      }
    }
  });
});

describe("errorHandler", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn() as NextFunction;
  });

  it("should handle AppError correctly", () => {
    const appError = AppError.badRequest("Invalid input", { field: "email" });

    errorHandler(appError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        code: "BAD_REQUEST",
        message: "Invalid input",
        details: { field: "email" },
      },
    });
  });

  it("should handle ZodError correctly", () => {
    const schema = z.string().email();
    let zodError: ZodError;

    try {
      schema.parse("invalid-email");
    } catch (error) {
      if (error instanceof ZodError) {
        zodError = error;
      }
    }

    errorHandler(zodError!, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: zodError!.issues,
      },
    });
  });

  it("should handle unknown errors with 500 status", () => {
    const unknownError = new Error("Unknown error");

    errorHandler(
      unknownError,
      mockReq as Request,
      mockRes as Response,
      mockNext,
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        code: "INTERNAL",
        message: "Internal server error",
      },
    });
  });
});
