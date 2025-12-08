import { config } from "dotenv";
config();
import app from "./src/app";
import configuration from "./src/config/config";
import connectDB from "./src/db/database";
import logger from './src/utils/logger'

connectDB().then(() => {
  app.listen(configuration.PORT, async () => {
    logger.info("Server Is Running On Port " + process.env.PORT);
  });
});
