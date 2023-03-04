import { ErrorRequestHandler } from 'express';

const handler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500);
};

export default handler;
