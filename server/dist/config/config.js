"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbUrl = process.env.MONGODB_URL;
if (!mongodbUrl) {
    throw new Error("MONGODB_URL environment variable is required");
}
const port = parseInt(process.env.PORT || "3000", 10);
if (isNaN(port)) {
    throw new Error("PORT must be a valid number");
}
const jwtSecret = process.env.JWTSECRET;
if (!jwtSecret) {
    throw new Error("Configure the jwt secret");
}
const jwtExpTime = process.env.JWTEXPTIME;
if (!jwtExpTime) {
    throw new Error("JWT exp time missing");
}
const _config = {
    MONGODB_URL: mongodbUrl,
    PORT: port,
    JWT_SECRET: jwtSecret,
    JWT_EXP_TIME: jwtExpTime,
};
const config = Object.freeze(_config);
exports.default = config;
