import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import errorHandler from './handlers/errors';
import auth from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200);
});

app.use(auth);

app.use(errorHandler);

export default app;
