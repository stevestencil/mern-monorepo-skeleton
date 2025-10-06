const base = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000/api';
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${path}`, { headers: { 'Content-Type': 'application/json' }, ...init });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}