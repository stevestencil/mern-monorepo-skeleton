import { createServer as createHttpServer } from 'http';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';

import { connectDB } from './lib/db';
import { errorHandler } from './lib/errors';
import routes from './routes';

import type { Express } from 'express';
import type { ErrorRequestHandler } from 'express';
import type { Server } from 'http';

export const app: Express = express();
const logger = pino({
  level: process.env['NODE_ENV'] === 'production' ? 'info' : 'debug',
  redact: {
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'res.headers.set-cookie',
    ],
    remove: true,
  },
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  pinoHttp({
    logger,
    genReqId: (req, _res) =>
      req.headers['x-request-id']?.toString() ??
      `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    autoLogging: true,
  }),
);
app.use('/api', routes);

// Error handler (typed)
app.use(((err, req, res, _next) => {
  // log once here; avoid leaking details in response
  logger.error({ err }, 'Unhandled error');
  errorHandler(err, req, res, () => {});
}) as ErrorRequestHandler);

export async function createServer(): Promise<Server> {
  // Connect to database
  await connectDB();

  // Create HTTP server
  const server = createHttpServer(app);

  // Start server
  const port = process.env['PORT'] ?? 4000;
  await new Promise<void>((resolve, reject) => {
    server.listen(port, (err?: Error) => {
      if (err) reject(err);
      else resolve();
    });
  });

  return server;
}
