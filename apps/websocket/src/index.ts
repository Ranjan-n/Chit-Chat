import { WebSocketServer } from "ws";
import { findUserId } from "./utils/auth";
import { addChatJob } from "./queue/redis";
import {
  addUser,
  getUser,
  getUsersInRoom,
  joinRoom,
  leaveRoom,
  removeUser,
} from "./utils/users";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  try {
    const url = req.url;

    if (!url) return ws.close();

    const params = new URLSearchParams(url.split("?")[1]);
    const token = params.get("token");
    if (!token) {
      return ws.close();
    }

    const userId = findUserId(token);

    if (!userId) {
      return ws.close();
    }

    addUser(ws, userId);

    ws.on("message", async (data) => {
      try {
        const msg = JSON.parse(data.toString());

        if (msg.type === "SUBSCRIBE") {
          joinRoom(ws, msg.roomId);
        } else if (msg.type === "UNSUBSCRIBE") {
          leaveRoom(ws, msg.roomId);
        } else if (msg.type === "MESSAGE") {
          const user = getUser(ws);
          if (!user || !user.rooms.has(msg.roomId)) {
            ws.send(
              JSON.stringify({ error: "You are not subscribed to this room." })
            );
            return;
          }

          await addChatJob({
            roomId: msg.roomId,
            userId: user.userId,
            message: msg.message,
          });

          const members = getUsersInRoom(msg.roomId);
          for (const u of members) {
            u.ws.send(
              JSON.stringify({
                type: "MESSAGE",
                roomId: msg.roomId,
                message: msg.message,
              })
            );
          }
        }
      } catch (err) {
        console.error("Error handling message:", err);
        ws.send(
          JSON.stringify({ error: "Invalid message format or internal error." })
        );
      }
    });

    ws.on("close", () => {
      try {
        removeUser(ws);
      } catch (err) {
        console.error("Error removing user:", err);
      }
    });
  } catch (err) {
    console.error("Connection error:", err);
    ws.close();
  }
});

console.log("WebSocket server is running on ws://localhost:8080");
