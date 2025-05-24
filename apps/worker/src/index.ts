import express from "express";
import { Worker } from "bullmq";
import { prismaClient } from "@repo/db/client";
import { redisconnection } from "@repo/common-backend/config";

const app = express();

const worker = new Worker(
  "chat",
  async (job) => {
    console.log(`Processing job ${job.id}...`);
    await prismaClient.chat.create({
      data: {
        roomId: job.data.roomId,
        userId: job.data.userId,
        message: job.data.message,
      },
    });
  },
  { connection: redisconnection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Worker is running" });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
