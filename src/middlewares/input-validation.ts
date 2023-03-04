import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const validation: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
        ? res.status(400).json({ errors: errors.array() })
        : next();
};

export default validation;
