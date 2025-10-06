import { Router } from 'express';
import users from './users';
const r = Router();
r.use('/users', users);
export default r;