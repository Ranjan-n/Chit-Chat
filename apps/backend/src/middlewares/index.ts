import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { prismaClient } from "@repo/db/client";

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || typeof decoded === "string") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = decoded.userId;

    const user = prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // @ts-ignore
    req.userId = userId;
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
}
