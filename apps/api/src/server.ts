import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import routes from './routes';

export const app = express();
const logger = pino();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use((err: any, _req: any, res: any, _next: any) => {
  logger.error(err);
  res.status(500).json({ message: 'Internal server error' });
});