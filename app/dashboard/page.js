'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');
    if (!role) {
      router.push('/login');
    } else {
      setUserName(name || 'Rohit');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white">
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-slate-900 text-white px-6 py-3 shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
          <span className="font-bold text-lg tracking-wide">Enterprise RAG Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">Logged in: <strong>{userName}</strong></span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Embedded Streamlit Enterprise GPT UI */}
      <div className="flex-1 w-full h-full bg-slate-50">
        <iframe
          src="http://localhost:8501/?embed=true"
          className="w-full h-full border-none"
          title="Enterprise GPT Dashboard"
        />
      </div>
    </div>
  );
}