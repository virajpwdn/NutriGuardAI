const _config = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
};

const config = Object.freeze(_config);
export default config;
