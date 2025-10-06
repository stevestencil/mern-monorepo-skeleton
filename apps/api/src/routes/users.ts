import { Router } from 'express';
import { User } from '../models/User';
import { UserSchema } from '@shared/core';

const r = Router();

r.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

r.post('/', async (req, res) => {
  const parsed = UserSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const created = await User.create(parsed.data);
  res.status(201).json(created);
});

export default r;