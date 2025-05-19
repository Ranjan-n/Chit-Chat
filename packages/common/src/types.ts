import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3).max(20),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createRoomSchema = z.object({
  name: z.string().min(1),
});
