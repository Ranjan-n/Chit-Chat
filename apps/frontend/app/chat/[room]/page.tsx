"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChatStore } from "../../../store/useChatStore";
import Image from "next/image";
import { useSocket } from "../../../hooks/useSocket";

export default function ChatPage() {
  const router = useRouter();
  const { room } = useParams();
  const messages = useChatStore((state) => state.messages);
  const roomId = useChatStore((state) => state.roomId) as string | undefined;
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { sendMessage, disconnect } = useSocket({ roomId });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) {
      return;
    }

    sendMessage(input);
    setInput("");
  };

  const handleLeaveChat = () => {
    disconnect();
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] flex flex-col">
      <nav className="bg-[#112240]/95 backdrop-blur-md shadow-lg sticky top-0 z-10 border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="relative group">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={44}
                    height={44}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent ml-3">
                  Chit-Chat
                </h1>
              </div>
              <div className="flex items-center space-x-2 px-5 py-2.5 bg-[#1e2d4d]/50 rounded-xl border border-blue-500/10 shadow-inner">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <span className="text-gray-400 font-medium">Room:</span>
                <span className="text-blue-400 font-semibold">{room}</span>
              </div>
            </div>
            <button
              onClick={handleLeaveChat}
              className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all duration-300 flex items-center space-x-2 border border-red-500/20 hover:border-red-500 shadow-lg shadow-red-500/5 hover:shadow-red-500/20 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="font-medium">Leave Room</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center p-4 md:p-6 relative">
        <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-3xl"></div>
        <div className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)] bg-[#112240]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/10 p-5 md:p-6 relative">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-blue-500/20 hover:scrollbar-thumb-blue-500/40 scrollbar-track-[#1e2d4d]/20 pr-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                    <svg
                      className="w-20 h-20 text-blue-500/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">
                      No Messages Yet
                    </h3>
                    <p className="text-gray-400">
                      Start the conversation by sending your first message!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={msg.id + "-" + idx}
                  className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`group px-5 py-3 rounded-2xl max-w-md break-words ${
                      msg.isSelf
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-8 shadow-lg shadow-blue-500/20"
                        : "bg-[#1e2d4d]/80 text-white mr-8 shadow-lg shadow-black/5 border border-blue-500/10"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#112240] to-transparent h-20 -top-20 pointer-events-none"></div>
            <form onSubmit={handleSend} className="flex gap-3 mt-auto relative">
              <input
                type="text"
                className="flex-1 px-5 py-4 rounded-xl bg-[#1e2d4d]/50 text-white border border-blue-500/10 focus:border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all duration-300 placeholder-gray-400 shadow-inner"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-medium transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600/90 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 border border-blue-500/20 cursor-pointer"
                disabled={!input.trim()}
              >
                <span>Send</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
