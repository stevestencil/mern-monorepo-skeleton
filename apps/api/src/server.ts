import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';

import { errorHandler } from './lib/errors';
import routes from './routes';

import type { Express } from 'express';
import type { ErrorRequestHandler } from 'express';

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
