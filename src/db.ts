import mongoose from 'mongoose';

const connect = async () =>
    await mongoose.connect(process.env.DB_URL as string);

export default connect;
