import { useEffect, useRef } from "react";
import { Message, useChatStore } from "../store/useChatStore";
import { WEBSOCKET_URL } from "../app/config";

interface UseSocketProps {
  roomId: string | undefined;
}

export const useSocket = ({ roomId }: UseSocketProps) => {
  const ws = useRef<WebSocket | null>(null);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!roomId || !token) {
      return;
    }

    ws.current = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: "SUBSCRIBE", roomId }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "MESSAGE" && data.roomId === roomId) {
        const userId = localStorage.getItem("userId");
        const newMessage: Message = {
          id: Date.now(),
          message: data.message,
          userId: data.userId || userId || "",
          roomId: data.roomId,
          isSelf: userId === data.userId,
        };
        setMessages([...messages, newMessage]);
      }
    };

    return () => {
      if (ws.current && ws.current.readyState === 1) {
        ws.current.send(JSON.stringify({ type: "UNSUBSCRIBE", roomId }));
      }
      ws.current?.close();
    };
  }, [roomId, setMessages, messages]);

  const sendMessage = (message: string) => {
    if (!ws.current || ws.current.readyState !== 1) return;

    const userId = localStorage.getItem("userId");

    ws.current.send(
      JSON.stringify({
        type: "MESSAGE",
        roomId,
        message: message,
        userId,
      })
    );
  };

  const disconnect = () => {
    if (ws.current && ws.current.readyState === 1) {
      ws.current.send(JSON.stringify({ type: "UNSUBSCRIBE", roomId }));
      ws.current.close();
    }
  };

  return {
    sendMessage,
    disconnect,
    ws: ws.current,
  };
};
