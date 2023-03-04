import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../database/user';

export const hash = (password: string) => bcrypt.hash(password, 6);
export const compare = (password: string, hash: string) =>
    bcrypt.compare(password, hash);

export const createToken = (user: IUser) =>
    jwt.sign(
        {
            id: user.id,
            name: user.name
        },
        process.env.TOKEN_SECRET as string
    );

export const register: RequestHandler = async (req, res) => {
    const exists = await User.find({
        name: req.body.name
    });

    if (exists.length > 0) {
        res.status(400).json({ error: 'username exists' });
        return;
    }

    const user = await User.create({
        name: req.body.name,
        password: await hash(req.body.password)
    });

    res.json({ token: createToken(user) });
};

export const signin: RequestHandler = async (req, res) => {
    const user = await User.findOne({
        name: req.body.name
    });

    if (!user) {
        res.status(400).json({ error: 'Invalid username' });
        return;
    }

    const isValid = await compare(req.body.password, user.password);

    if (!isValid) {
        res.status(400).json({ error: 'Invalid password' });
        return;
    }

    res.json({ token: createToken(user) });
};
