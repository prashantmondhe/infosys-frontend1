'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'HR Operations Lead'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const displayName = isRegister ? formData.name : (formData.name || formData.email.split('@')[0]);
      
      // Save directly to localStorage
      localStorage.setItem('user_name', displayName || 'Employee');
      localStorage.setItem('user_email', formData.email);
      localStorage.setItem('user_role', formData.role);

      // Force instant browser redirect
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Failed to save session. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white font-sans">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
        
        <div className="flex justify-center border-b border-slate-800 pb-4">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                !isRegister ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                isRegister ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold tracking-tight text-white">
          {isRegister ? 'Create an Account' : 'Welcome to Enterprise GPT'}
        </h2>

        {error && (
          <div className="rounded-lg p-3 text-sm bg-red-500/10 border border-red-500 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-blue-500"
                placeholder="Prashant"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-blue-500"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Designation / Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm text-white border border-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="HR Operations Lead">HR Operations Lead</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Opening Dashboard...' : (isRegister ? 'Register & Enter' : 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  );
}
