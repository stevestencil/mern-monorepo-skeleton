import type { Request, Response } from 'express';
import { Router } from 'express';
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import swaggerUi from 'swagger-ui-express';
import { CreateUserSchema, UserSchema } from '@shared/core';
import users from './users';
const r = Router();
r.use('/users', users);
r.get('/healthz', (_req: Request, res: Response) => res.json({ status: 'ok' }));
r.get('/readyz', (_req: Request, res: Response) =>
  res.json({ status: 'ready' }),
);

// OpenAPI generation from Zod schemas
const registry = new OpenAPIRegistry();
registry.register('User', UserSchema);
registry.register('CreateUser', CreateUserSchema);

const generator = new OpenApiGeneratorV3(registry.definitions);
const openapi = generator.generateDocument({
  openapi: '3.0.0',
  info: { title: 'API', version: '0.0.0' },
  servers: [{ url: '/api' }],
});

r.get('/docs.json', (_req: Request, res: Response) => res.json(openapi));
r.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
export default r;
