import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../../.env") });

export const JWT_SECRET = process.env.JWT_SECRET || "SECRET123";
export const SALT_ROUNDS = process.env.SALT_ROUNDS || "10";

export const redisconnection = {
  url: process.env.REDIS_URL || "redis://localhost:6379"
};
