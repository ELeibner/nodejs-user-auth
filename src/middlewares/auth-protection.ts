import { Request, RequestHandler } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

interface IRequest extends Request {
    user?: string | JwtPayload;
}

const validation: RequestHandler = (req: IRequest, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).json({ error: 'Not authorized' });
        return;
    }

    const [, token] = auth.split(' ');
    if (!token) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }

    try {
        const user = verify(token, process.env.TOKEN_SECRET as string);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
};

export default validation;
