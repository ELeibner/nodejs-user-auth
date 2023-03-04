import { randomUUID } from 'crypto';
import { model, Schema } from 'mongoose';

export interface IUser {
    id: string;
    createdAt: Date;
    name: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    id: { type: String, default: randomUUID() },
    createdAt: { type: Date, default: Date.now() },
    name: String,
    password: String
});

export const User = model<IUser>('User', userSchema);
