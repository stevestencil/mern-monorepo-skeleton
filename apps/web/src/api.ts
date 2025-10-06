const base =
  (import.meta as unknown as { env: Record<string, string | undefined> }).env[
    'VITE_API_BASE'
  ] ?? 'http://localhost:4000/api';

export class AppError extends Error {
  code: string;
  details?: unknown;
  constructor(code: string, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    let message = 'Request failed';
    let code = 'HTTP_' + res.status;
    let details: unknown;
    try {
      const body = (await res.json()) as {
        error?: { code: string; message: string; details?: unknown };
      };
      if (body?.error) {
        code = body.error.code;
        message = body.error.message;
        details = body.error.details;
      }
    } catch {
      message = await res.text();
    }
    throw new AppError(code, message, details);
  }
  return res.json() as Promise<T>;
}
