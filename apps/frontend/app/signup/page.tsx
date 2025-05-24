"use client";

import { SignUpInput } from "@repo/common/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BACKEND_URL } from "../config";

export default function SignUp() {
  const router = useRouter();

  if (localStorage.getItem("token")) {
    router.push("/home");
    return null;
  }

  const [error, setError] = useState<string | null>(null);
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { name, email, password } = formData;

    if (password.length < 6) {
      setLoading(false);
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/signup`, {
        name,
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setLoading(false);
      router.push("/home");
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Failed to create account");
      } else {
        setError("Failed to create account");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a192f]">
      <div className="bg-[#112240] p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg bg-[#1e2d4d] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-[#1e2d4d] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-[#1e2d4d] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Create a password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className={`w-full transition duration-200 mt-6 py-2 rounded-lg ${Loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"}`}
            disabled={Loading}
          >
            Sign Up
          </button>
          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="text-blue-500 hover:text-blue-400 cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
