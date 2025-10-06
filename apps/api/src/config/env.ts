import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

export const env = EnvSchema.parse(process.env);

export type Env = typeof env;
