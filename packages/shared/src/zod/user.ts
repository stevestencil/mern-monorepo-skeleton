import { z } from 'zod';
export const UserSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(1)
});
export type UserDTO = z.infer<typeof UserSchema>;