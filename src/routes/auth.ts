import { Router } from 'express';
import { body } from 'express-validator';
import { register, signin } from '../handlers/user';
import validation from '../middlewares/input-validation';

const router = Router();

router.post(
    '/register',
    body('name').isString(),
    body('password').isString(),
    validation,
    register
);

router.post(
    '/signin',
    body('name').isString(),
    body('password').isString(),
    validation,
    signin
);

export default router;
