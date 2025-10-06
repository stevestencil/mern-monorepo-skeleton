import 'dotenv/config';
export const env = {
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/mern',
  PORT: Number(process.env.PORT ?? 4000)
};