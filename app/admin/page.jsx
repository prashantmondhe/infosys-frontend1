'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');
    
    if (!role || role.toLowerCase() !== 'admin') {
      alert('Access Denied. Admins only.');
      router.push('/login');
    } else {
      setUserName(name || 'Admin');
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">🛡️ Enterprise Admin Console</h1>
          <p className="text-sm text-slate-500">Logged in as: <strong>{userName} (Admin)</strong></p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Vector Database</h3>
          <p className="text-2xl font-extrabold text-green-600 mt-2">ChromaDB Live</p>
          <p className="text-xs text-slate-400 mt-1">Local persistence layer active</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Indexed Documents</h3>
          <p className="text-2xl font-extrabold text-slate-800 mt-2">5 Manuals</p>
          <p className="text-xs text-slate-400 mt-1">Leave, microservices, guidelines</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Security Engine</h3>
          <p className="text-2xl font-extrabold text-blue-600 mt-2">RBAC Mode</p>
          <p className="text-xs text-slate-400 mt-1">Role-based vector filtering active</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Admin Quick Links</h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          Go to AI Assistant
        </button>
      </div>
    </div>
  );
}
