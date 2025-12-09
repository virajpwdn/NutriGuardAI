interface Config {
  MONGODB_URL: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXP_TIME: string;
}

const mongodbUrl = process.env.MONGODB_URL;
if (!mongodbUrl) {
  throw new Error("MONGODB_URL environment variable is required");
}

const port = parseInt(process.env.PORT || "3000", 10);
if (isNaN(port)) {
  throw new Error("PORT must be a valid number");
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("Configure the jwt secret");
}

const jwtExpTime = process.env.JWT_EXP_TIME;
if (!jwtExpTime) {
  throw new Error("JWT exp time missing");
}

const _config = {
  MONGODB_URL: mongodbUrl!,
  PORT: port,
  JWT_SECRET: jwtSecret as string,
  JWT_EXP_TIME: jwtExpTime as string,
};

const config: Config = Object.freeze(_config);
export default config;
