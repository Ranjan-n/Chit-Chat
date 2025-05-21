import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middlewares";
import {
  createRoomSchema,
  signinSchema,
  signupSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { JWT_SECRET, SALT_ROUNDS } from "@repo/common-backend/config";
import bcrypt from "bcryptjs";

const app = express();

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        error: result.error.format(),
      });
      return;
    }

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(result.data.password, salt);

    const user = await prismaClient.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        name: result.data.name,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: result.error.format(),
      });
      return;
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// @ts-ignore
app.post(
  "/create-room",
  userMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = createRoomSchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({
          error: result.error.format(),
        });
        return;
      }

      // @ts-ignore
      const userId = req.userId;

      const room = await prismaClient.room.create({
        data: {
          name: result.data.name,
          adminId: userId,
        },
      });

      res.status(200).json({
        roomId: room.id,
      });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
