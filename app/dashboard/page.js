'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');

    if (!role) {
      router.push('/login');
    } else {
      setUserName(name || 'Employee');
      setUserRole(role || 'HR Operations Lead');
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white font-semibold">
        Loading Enterprise Portal...
      </div>
    );
  }

  // Streamlit पब्लिक URL (किंवा लोकल टेस्टिंगसाठी fallback)
  const STREAMLIT_URL = process.env.NEXT_PUBLIC_STREAMLIT_URL || "https://infosys-backend-production.up.railway.app";

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100">
      {/* Top Navbar */}
      <header className="flex justify-between items-center bg-slate-900 text-white px-6 py-3 shadow-lg z-20 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Enterprise GPT Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Authenticated User</p>
            <p className="text-sm font-medium text-slate-200">
              {userName} <span className="text-xs text-blue-400">({userRole})</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-xl font-semibold shadow-sm transition-all duration-150"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full h-[calc(100vh-60px)] bg-slate-50 relative">
        <iframe
          src={`${STREAMLIT_URL}/?embed=true&embed_options=disable_scrolling`}
          className="w-full h-full border-0"
          title="Enterprise GPT Dashboard"
          allow="clipboard-write; clipboard-read"
        />
      </main>
    </div>
  );
}