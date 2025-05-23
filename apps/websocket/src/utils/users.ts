import { WebSocket } from "ws";

interface User {
  userId: string;
  ws: WebSocket;
  rooms: Set<string>;
}

const users = new Map<WebSocket, User>();

export function addUser(ws: WebSocket, userId: string) {
  users.set(ws, { userId, ws, rooms: new Set() });
}

export function removeUser(ws: WebSocket) {
  users.delete(ws);
}

export function joinRoom(ws: WebSocket, roomId: string) {
  users.get(ws)?.rooms.add(roomId);
}

export function leaveRoom(ws: WebSocket, roomId: string) {
  users.get(ws)?.rooms.delete(roomId);
}

export function getUser(ws: WebSocket) {
  return users.get(ws);
}

export function getUsersInRoom(roomId: string): User[] {
  return Array.from(users.values()).filter((u) => u.rooms.has(roomId));
}
