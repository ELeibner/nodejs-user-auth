import * as dotenv from 'dotenv';
import db from './db';
import app from './server';

dotenv.config();

const port = process.env.PORT || 3000;

db()
    .then(() => console.log('DB online'))
    .catch((e) => console.log(e));

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
