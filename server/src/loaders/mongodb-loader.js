import mongoose from "mongoose";
import logger from "../utils/logger.js";

export default async function connectDB() {
    const url =
        process.env.NODE_ENV === "production"
            ? process.env.MONGODB_URI_PRODUCTION
            : process.env.MONGODB_URI_DEVELOPMENT;

    try {
        await mongoose.connect(url);
        logger.info(`Connected to MongoDB at '${url}'`);
    } catch (err) {
        logger.error(`Error connecting to MongoDB at '${url}' \n${err}`);
    }
}
