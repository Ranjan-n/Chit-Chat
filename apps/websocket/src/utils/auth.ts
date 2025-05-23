import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";

export const findUserId = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded !== "object" || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
