import type { Request, Response } from 'express';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
const r = Router();
r.get('/healthz', (_req: Request, res: Response) => res.json({ status: 'ok' }));
r.get('/readyz', (_req: Request, res: Response) =>
  res.json({ status: 'ready' }),
);

// Minimal static OpenAPI spec for health and readiness endpoints
const openapi = {
  openapi: '3.0.0',
  info: { title: 'API', version: '0.0.0' },
  servers: [{ url: '/api' }],
  paths: {
    '/healthz': {
      get: {
        summary: 'Liveness probe',
        responses: {
          '200': {
            description: 'Service is alive',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', example: 'ok' } },
                },
              },
            },
          },
        },
      },
    },
    '/readyz': {
      get: {
        summary: 'Readiness probe',
        responses: {
          '200': {
            description: 'Service is ready',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', example: 'ready' } },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

r.get('/docs.json', (_req: Request, res: Response) => res.json(openapi));
r.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

export default r;
