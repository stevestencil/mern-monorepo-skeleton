// Enhanced API client with comprehensive error handling
import {
  getErrorMessage,
  isRetryableError,
  ErrorCode,
} from '@shared/types/errors';

import type { ApiError } from '@shared/types/errors';

const API_BASE =
  import.meta.env['VITE_API_BASE'] ?? 'http://localhost:4000/api';

export class ApiClientError extends Error {
  constructor(
    public readonly apiError: ApiError,
    public readonly status: number,
    public readonly response?: Response,
  ) {
    super(getErrorMessage(apiError));
    this.name = 'ApiClientError';
  }
}

export class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (
          errorData &&
          typeof errorData === 'object' &&
          'error' in errorData
        ) {
          const errorResponse = errorData as { error: ApiError };
          throw new ApiClientError(
            errorResponse.error,
            response.status,
            response,
          );
        }

        // Fallback for non-JSON error responses
        throw new ApiClientError(
          {
            code: ErrorCode.INTERNAL_ERROR,
            message: `HTTP ${response.status}: ${response.statusText}`,
            timestamp: new Date().toISOString(),
            path: endpoint,
          },
          response.status,
          response,
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      // Network or other errors
      throw new ApiClientError(
        {
          code: ErrorCode.CONNECTION_ERROR,
          message: 'Network error. Please check your internet connection.',
          timestamp: new Date().toISOString(),
          path: endpoint,
        },
        0,
      );
    }
  }

  // Generic CRUD operations
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Health check endpoints
  async healthCheck(): Promise<{ status: string }> {
    return this.get<{ status: string }>('/healthz');
  }

  async readinessCheck(): Promise<{ status: string }> {
    return this.get<{ status: string }>('/readyz');
  }
}

// Helper function to handle API errors in React components
export function handleApiError(error: unknown): string {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

// Helper function to check if an error is retryable
export function isRetryableApiError(error: unknown): boolean {
  if (error instanceof ApiClientError) {
    return isRetryableError(error.apiError);
  }

  return false;
}

// Retry mechanism for retryable errors
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isRetryableApiError(error) || attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}

export const apiClient = new ApiClient();
