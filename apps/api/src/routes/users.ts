import { CreateUserSchema } from '@shared/core';
import { ZodError } from 'zod';
import { Router } from 'express';
import { formatZod } from '../lib/errors';
import { User } from '../models/User';

const r = Router();

r.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

r.post('/', async (req, res, next) => {
  try {
    const input = CreateUserSchema.parse(req.body);
    const created = await User.create(input);
    res.status(201).json(created);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json(formatZod(err));
      return;
    }
    next(err);
  }
});

export default r;
