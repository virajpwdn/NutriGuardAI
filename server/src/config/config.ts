import logger from "../utils/logger";
interface Config {
  MONGODB_URL: string;
  PORT: number;
}

const _config = {
  MONGODB_URL: process.env.MONGODB_URL!,
  PORT: parseInt(process.env.PORT || "3000", 10),
};

if (!_config.MONGODB_URL) {
  logger.error("MONGODB_URL environment variable is required");
}

if (isNaN(_config.PORT)) {
  logger.error("PORT must be a valid number");
}

const config: Config = Object.freeze(_config);
export default config;
