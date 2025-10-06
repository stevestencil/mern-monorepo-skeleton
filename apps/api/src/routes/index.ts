import { Router } from "express";

import type { Request, Response, Router as ExpressRouter } from "express";
const r: ExpressRouter = Router();
r.get("/healthz", (_req: Request, res: Response) => res.json({ status: "ok" }));
r.get("/readyz", (_req: Request, res: Response) =>
  res.json({ status: "ready" }),
);

export default r;
