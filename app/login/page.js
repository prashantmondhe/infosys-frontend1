'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Welcome, ${data.name || 'User'}! Logged in as ${data.role}.`);
        localStorage.setItem('user_name', data.name || '');
        localStorage.setItem('user_email', data.email || email);
        localStorage.setItem('user_role', data.role || role);

        if ((data.role || role).toLowerCase() === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        alert(data.detail || data.message || 'Login failed. Please verify credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Cannot connect to FastAPI backend (Port 8000). Please make sure backend is running.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center">Welcome Back!</h2>
        <p className="mt-1 text-sm text-slate-500 text-center">Login to your account to continue</p>

        <form onSubmit={handleLogin} autoComplete="off" className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-200 py-3 px-4 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-11 text-sm focus:border-blue-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-xs text-slate-400 hover:text-slate-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Login As
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm focus:border-blue-600 focus:outline-none text-slate-800"
            >
              <option value="Admin">Login as Admin</option>
              <option value="Employee">Login as Employee</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <p className="mt-4 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link href="/" className="font-semibold text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}