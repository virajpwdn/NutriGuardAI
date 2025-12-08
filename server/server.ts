import { config } from "dotenv";
config();
import app from "./src/app";
import configuration from "./src/config/config";
import connectDB from "./src/db/database";
import logger from "./src/utils/logger";

connectDB()
  .then(() => {
    app.listen(configuration.PORT, () => {
      logger.info("Server Is Running On Port " + configuration.PORT);
    });
  })
  .catch((error) => {
    logger.error("Failed to start server", { error });
    process.exit(1);
  });
