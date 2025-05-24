import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a192f]">
      <nav className="bg-[#112240] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src={"/logo.png"}
                alt={"logo"}
                width={50}
                height={50}
              ></Image>
              <h1 className="text-2xl font-bold text-blue-500">Chit-Chat</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="px-4 py-2 text-gray-300 hover:text-white font-medium transition duration-150 ease-in-out"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center h-screen">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-500">Chit-Chat</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect instantly with friends and colleagues. Create chat rooms and
            start conversations in real-time.
          </p>
          <div className="mt-10">
            <Link
              href="/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-[#112240] rounded-xl shadow-lg border border-gray-700">
            <div className="w-full flex justify-center items-center">
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-500"
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
            <h3 className="text-lg font-semibold text-white">
              Create Chat Rooms
            </h3>
            <p className="mt-2 text-gray-300">
              Create private or public chat rooms and invite your friends to
              join the conversation.
            </p>
          </div>

          <div className="p-6 bg-[#112240] rounded-xl shadow-lg border border-gray-700">
            <div className="w-full flex justify-center items-center">
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white">Real-time Chat</h3>
            <p className="mt-2 text-gray-300">
              Experience seamless real-time messaging with instant message
              delivery and typing indicators.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
