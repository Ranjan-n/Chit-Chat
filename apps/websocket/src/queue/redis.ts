import { redisconnection } from "@repo/common-backend/config";
import { Queue } from "bullmq";

export const chatQueue = new Queue("chat", {
  connection: redisconnection,
});

export const addChatJob = async (data: {
  roomId: string;
  userId: string;
  message: string;
}) => {
  return chatQueue.add("chat", data);
};
