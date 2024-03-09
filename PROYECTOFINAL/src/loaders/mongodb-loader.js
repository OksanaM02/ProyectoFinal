import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export default async function(config) {
    const uri = `mongodb+srv://${config.user}:${config.password}@${config.host}/${config.dbname}`;
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info(`Connected to MongoDB Atlas at ${uri}`);
    } catch (err) {
        logger.error(`Error connecting to MongoDB Atlas at ${uri}\n${err}`);
    }
}
