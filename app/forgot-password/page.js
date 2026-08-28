'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Forgot Password</h2>
        
        {submitted ? (
          <p className="text-center text-green-600 font-medium">
            Password reset link has been sent to your email. Please check your inbox.
          </p>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <p className="text-sm text-gray-600 text-center mb-4">
              Enter your registered email address and we will send you a password reset link.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 p-2 text-white font-semibold hover:bg-blue-700 transition duration-200"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Remembered your password?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}