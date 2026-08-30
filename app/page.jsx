'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const userRole = localStorage.getItem('user_role');
    if (userRole) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-slate-400 text-sm">Redirecting to Enterprise Portal...</p>
      </div>
    </div>
  );
}
