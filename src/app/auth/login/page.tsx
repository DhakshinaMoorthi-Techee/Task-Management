"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Snackbar from "@/components/snackbar";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState("");

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      setSnackBarMessage("Logged in successfully");
      setSnackbarOpen(true);
      router.push("/dashboard");
    }else {
      setSnackBarMessage("Please create an account");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="mb-4 w-full py-2 bg-[#941B0F] text-white rounded-md cursor-pointer"
          >
            Login
          </button>
          <div className="flex justify-center">
            <p className="pr-1 text-gray-500">
              {`Don't have an account?` + "  "}{" "}
            </p>
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push("/auth/register")}
            >
              Sign up
            </p>
          </div>
        </form>
        <Snackbar
          message={snackbarMessage}
          isOpen={isSnackbarOpen}
          onClose={closeSnackbar}
        />
      </div>
    </div>
  );
}
