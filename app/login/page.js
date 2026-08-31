"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Employee" | "Admin">("Employee");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // लोकल स्टोरेजमध्ये युझर डेटा व रोल सेव्ह करणे
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      
      // डॅशबोर्डवर रिडायरेक्ट करणे
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d1527] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        
        {/* Toggle Buttons: Sign In / Register */}
        <div className="flex bg-[#070b19] p-1 rounded-xl mb-8 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === "login"
                ? "bg-[#2563eb] text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === "register"
                ? "bg-[#2563eb] text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {activeTab === "login" ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#070b19] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#070b19] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Role Selection Dropdown (Only Employee and Admin) */}
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "Employee" | "Admin")}
              className="w-full px-4 py-3 bg-[#070b19] border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#2563eb] hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-colors duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : activeTab === "login" ? "Sign In" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}