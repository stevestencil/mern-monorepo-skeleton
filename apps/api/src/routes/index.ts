import type { Request, Response } from 'express';
import { Router } from 'express';
const r = Router();
r.get('/healthz', (_req: Request, res: Response) => res.json({ status: 'ok' }));
r.get('/readyz', (_req: Request, res: Response) =>
  res.json({ status: 'ready' }),
);

export default r;
