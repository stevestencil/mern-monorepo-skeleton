import { z } from 'zod';

// Response DTO
export const UserSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
});
export type UserDTO = z.infer<typeof UserSchema>;

// Request DTOs
export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
});
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
