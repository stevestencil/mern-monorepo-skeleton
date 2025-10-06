import { model, Schema } from 'mongoose';
const UserSchema = new Schema(
  { email: { type: String, unique: true, required: true }, name: { type: String, required: true } },
  { timestamps: true }
);
export const User = model('User', UserSchema);