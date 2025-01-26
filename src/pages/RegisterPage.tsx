import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../lib/api.ts";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (password !== comfirmPassword) {
      setError("Password and confirm password do not match.");
      return false;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!password.match(passwordRegex)) {
      toast.error(
        "Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers."
      );

      return false;
    }
    return true;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !comfirmPassword) {
      setError("Email, password and confirm password are required.");
      return;
    }

    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await register(email, password, "employee");
      setEmail("");
      setPassword("");
      setComfirmPassword("");
      toast.success("Registration successful");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                autoComplete="on"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                autoComplete="on"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password:
              </label>
              <input
                id="confirm-password"
                type="password"
                value={comfirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                autoComplete="off"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-600" aria-live="polite">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <div className="text-sm text-center mt-2">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
