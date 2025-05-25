import { create } from "zustand";

export interface Message {
  id: number;
  message: string;
  userId: string;
  roomId: string;
  isSelf?: boolean;
}

interface ChatState {
  roomId: string | null;
  messages: Message[];
  setRoomId: (roomId: string) => void;
  setMessages: (messages: Message[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  roomId: null,
  messages: [],
  setRoomId: (roomId: string) => set({ roomId }),
  setMessages: (messages: Message[]) => set({ messages }),
}));
