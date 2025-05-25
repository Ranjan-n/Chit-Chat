"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useChatStore } from "../../store/useChatStore";

export default function Home() {
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const setRoomId = useChatStore((state) => state.setRoomId);
  const setMessages = useChatStore((state) => state.setMessages);
  const router = useRouter();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}/create-room`,
        { name: createRoomName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.roomId) {
        setRoomId(response.data.roomId);
        router.push(`/chat/${createRoomName}`);
      }
    } catch (err) {
      console.error("Failed to create room:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/chats/${joinRoomCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.roomId) {
        setRoomId(response.data.roomId);
        if (response.data.chats) {
          const userId = localStorage.getItem("userId");
          const chats = response.data.chats.map((chat: any) => ({
            id: chat.id,
            message: chat.message,
            userId: chat.userId,
            roomId: chat.roomId,
            isSelf: chat.userId === userId,
          }));
          setMessages(chats);
        }
        router.push(`/chat/${joinRoomCode}`);
      }
    } catch (err) {
      console.error("Failed to join room:", err);
    } finally {
      setIsJoining(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0a192f]">
      <nav className="bg-[#112240] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <h1 className="text-2xl font-bold text-blue-500 ml-2">
                Chit-Chat
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out font-medium flex items-center gap-2 cursor-pointer"
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
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 pt-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-[#112240]/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 md:p-10 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="mb-8">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
                  Start Chatting
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Create your own private chat room and invite friends to join.
                  Start meaningful conversations in a secure space.
                </p>
              </div>
              <form onSubmit={handleCreateRoom} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="roomName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Room Name
                  </label>
                  <div className="relative">
                    <input
                      id="roomName"
                      type="text"
                      className="w-full px-5 py-4 rounded-xl bg-[#1e2d4d] text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors pl-12"
                      placeholder="Enter a unique room name"
                      value={createRoomName}
                      onChange={(e) => setCreateRoomName(e.target.value)}
                      required
                      disabled={isCreating}
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
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
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isCreating}
                  className={`w-full py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/20 ${
                    isCreating ? "opacity-50 cursor-not-allowed" : ""
                  } cursor-pointer`}
                >
                  {isCreating ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Room
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-[#112240]/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 md:p-10 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="mb-8">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
                  Join Friends
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Got an invite? Enter the room code to instantly join your
                  friends and be part of the conversation.
                </p>
              </div>
              <form onSubmit={handleJoinRoom} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="roomCode"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Room Name
                  </label>
                  <div className="relative">
                    <input
                      id="roomCode"
                      type="text"
                      className="w-full px-5 py-4 rounded-xl bg-[#1e2d4d] text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors pl-12"
                      placeholder="Enter room name"
                      value={joinRoomCode}
                      onChange={(e) => setJoinRoomCode(e.target.value)}
                      required
                      disabled={isJoining}
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isJoining}
                  className={`w-full py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/20 ${
                    isJoining ? "opacity-50 cursor-not-allowed" : ""
                  } cursor-pointer`}
                >
                  {isJoining ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Room
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
