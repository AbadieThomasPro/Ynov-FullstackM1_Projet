import bcrypt from 'bcrypt';
import { createUser as createUserModel } from '../models/user.js';

export const createUser = async (email: string, password: string) => {
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = await createUserModel(email, hashedPassword);
   return user;
};