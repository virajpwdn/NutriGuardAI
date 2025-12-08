import mongoose from "mongoose";
import config from "../config/config";
import logger from '../utils/logger';

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    logger.info("Database is connected");
  } catch (error) {
    logger.error("Error connecting to database");
    process.exit(1);
  }
};

export default connectDB