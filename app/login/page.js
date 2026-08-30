'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'HR Operations Lead'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const displayName = isRegister ? formData.name : (formData.name || formData.email.split('@')[0]);
    localStorage.setItem('user_name', displayName || 'Employee');
    localStorage.setItem('user_email', formData.email);
    localStorage.setItem('user_role', formData.role);
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617', color: 'white', fontFamily: 'sans-serif', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#0f172a', padding: '2rem', borderRadius: '16px', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', backgroundColor: '#020617', padding: '4px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: !isRegister ? '#2563eb' : 'transparent', color: 'white', fontWeight: 'bold' }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: isRegister ? '#2563eb' : 'transparent', color: 'white', fontWeight: 'bold' }}
          >
            Register
          </button>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isRegister && (
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              onChange={handleChange}
              style={{ padding: '10px 14px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', color: 'white', outline: 'none' }}
            />
          )}
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            onChange={handleChange}
            style={{ padding: '10px 14px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', color: 'white', outline: 'none' }}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleChange}
            style={{ padding: '10px 14px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', color: 'white', outline: 'none' }}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ padding: '10px 14px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', color: 'white', outline: 'none' }}
          >
            <option value="HR Operations Lead">HR Operations Lead</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{ padding: '12px', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            {isRegister ? 'Register & Enter' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
