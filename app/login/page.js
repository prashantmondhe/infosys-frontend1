"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = activeTab === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload = activeTab === "login" 
      ? { email, password, role } 
      : { name, email, password, role };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d1527] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        
       
        <div className="flex bg-[#070b19] p-1 rounded-xl mb-8 border border-slate-800">
          <button
            type="button"
            onClick={() => { setActiveTab("login"); setError(""); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === "login"
                ? "bg-[#2563eb] text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}To restrict a dropdown menu so that it only shows **Admin** and **Employee**, limit the `<option>` elements or data array to just those two values.

**Plain HTML Example**

```html
<select name="role" id="role-select">
  <option value="admin">Admin</option>
  <option value="employee">Employee</option>
</select>