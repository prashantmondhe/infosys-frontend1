"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [view, setView] = useState("login"); // "login" | "register" | "forgot"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (view === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", email);
        router.push("/dashboard");
      } else if (view === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        setMessage({ type: "success", text: "Registration successful! Please Sign In." });
        setView("login");
      } else if (view === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Reset request failed");

        setMessage({ type: "success", text: "Password reset instructions sent to your email." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d1527] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        
        {/* Toggle Bar */}
        <div className="flex bg-[#070b19] p-1 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => { setView("login"); setMessage({ type: "", text: "" }); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              view === "login" ? "bg-[#2563eb] text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setView("register"); setMessage({ type: "", text: "" }); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              view === "register" ? "bg-[#2563eb] text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* Header Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {view === "login" && "Welcome Back"}
          {view === "register" && "Create Account"}
          {view === "forgot" && "Reset Password"}
        </h2>
        
        <p className="text-sm text-center text-slate-400 mb-6">
          {view === "login" && "Sign in to access your dashboard"}
          {view === "register" && "Register to get started"}
          {view === "forgot" && "Enter your email to receive a reset link"}
        </p>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-xl text-sm ${
              message.type === "success"
                ? "bg-green-950/50 border border-green-700 text-green-300"
                : "bg-red-950/50 border border-red-700 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {view === "register" && (
            <div>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#070b19] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#070b19] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {view !== "forgot" && (
            <div>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#070b19] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Role Selection Dropdown (Only Employee & Admin) */}
          {view !== "forgot" && (
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-[#070b19] border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}

          {/* Forgot Password Link */}
          {view === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => { setView("forgot"); setMessage({ type: "", text: "" }); }}
                className="text-xs text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Back to Login Link */}
          {view === "forgot" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => { setView("login"); setMessage({ type: "", text: "" }); }}
                className="text-xs text-blue-400 hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2563eb] hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : view === "login"
              ? "Sign In"
              : view === "register"
              ? "Create Account"
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}