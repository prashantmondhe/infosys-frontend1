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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // १. Forgot Password: थेट मेसेज दाखवणे
    if (view === "forgot") {
      setTimeout(() => {
        setLoading(false);
        setMessage({
          type: "success",
          text: `Password reset link has been sent to ${email} successfully!`,
        });
      }, 500);
      return;
    }

    // २. Register: यशस्वी मेसेज देऊन लॉगिन टॅबवर आणणे
    if (view === "register") {
      setTimeout(() => {
        setLoading(false);
        setMessage({
          type: "success",
          text: "Registration successful! Please Sign In.",
        });
        setView("login");
      }, 600);
      return;
    }

    // ३. Login: डेटा localStorage मध्ये सेव्ह करून थेट डॅशबोर्डवर जाणे
    setTimeout(() => {
      try {
        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", email);
        if (name) localStorage.setItem("userName", name);
        router.push("/dashboard");
      } catch (err) {
        console.error("Local storage error:", err);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#070b19",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#0d1527",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}>
        
        {/* Toggle Bar */}
        <div style={{
          display: "flex",
          backgroundColor: "#070b19",
          padding: "4px",
          borderRadius: "12px",
          marginBottom: "24px",
          border: "1px solid #1e293b"
        }}>
          <button
            type="button"
            onClick={() => { setView("login"); setMessage({ type: "", text: "" }); }}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: view === "login" ? "#2563eb" : "transparent",
              color: view === "login" ? "#ffffff" : "#94a3b8"
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setView("register"); setMessage({ type: "", text: "" }); }}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: view === "register" ? "#2563eb" : "transparent",
              color: view === "register" ? "#ffffff" : "#94a3b8"
            }}
          >
            Register
          </button>
        </div>

        {/* Header */}
        <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#ffffff", margin: "0 0 8px 0" }}>
          {view === "login" && "Welcome Back"}
          {view === "register" && "Create Account"}
          {view === "forgot" && "Reset Password"}
        </h2>
        
        <p style={{ fontSize: "14px", textAlign: "center", color: "#94a3b8", margin: "0 0 24px 0" }}>
          {view === "login" && "Sign in to access your dashboard"}
          {view === "register" && "Register to get started"}
          {view === "forgot" && "Enter your email to receive a reset link"}
        </p>

        {/* Message Alert */}
        {message.text && (
          <div style={{
            marginBottom: "16px",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: message.type === "success" ? "#064e3b" : "#7f1d1d",
            color: message.type === "success" ? "#6ee7b7" : "#fca5a5",
            border: `1px solid ${message.type === "success" ? "#059669" : "#dc2626"}`
          }}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {view === "register" && (
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "#070b19",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none"
              }}
            />
          )}

          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#070b19",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "14px",
              boxSizing: "border-box",
              outline: "none"
            }}
          />

          {view !== "forgot" && (
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "#070b19",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none"
              }}
            />
          )}

          {/* Role Dropdown: Only Admin & Employee */}
          {view !== "forgot" && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "#070b19",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="Employee" style={{ backgroundColor: "#0d1527", color: "#ffffff" }}>Employee</option>
              <option value="Admin" style={{ backgroundColor: "#0d1527", color: "#ffffff" }}>Admin</option>
            </select>
          )}

          {/* Forgot Password Link */}
          {view === "login" && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => { setView("forgot"); setMessage({ type: "", text: "" }); }}
                style={{ background: "none", border: "none", color: "#60a5fa", fontSize: "12px", cursor: "pointer", padding: 0 }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Back to Sign In Link */}
          {view === "forgot" && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => { setView("login"); setMessage({ type: "", text: "" }); }}
                style={{ background: "none", border: "none", color: "#60a5fa", fontSize: "12px", cursor: "pointer", padding: 0 }}
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              marginTop: "8px"
            }}
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