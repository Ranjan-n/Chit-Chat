export const JWT_SECRET = process.env.JWT_SECRET || "SECRET123";
export const SALT_ROUNDS = process.env.SALT_ROUNDS || "10";

export const redisconnection = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
};
