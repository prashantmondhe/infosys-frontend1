'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('Employee');
  const [userRole, setUserRole] = useState('HR Operations Lead');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! How can I assist you with enterprise policies or workflows today?'
    }
  ]);

  const messagesEndRef = useRef(null);

  // तुमची अचूक Railway URL (शेवटी स्लॅश नको)
  const BACKEND_URL = 'https://infosys-backend-production.up.railway.app';

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');

    if (name) setUserName(name);
    if (role) setUserRole(role);
    setLoading(false);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!query.trim() || isSending) return;

    const userPrompt = query.trim();
    const currentRole = userRole || 'HR Operations Lead';

    setQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: userPrompt }]);
    setIsSending(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query: userPrompt,
          designation: currentRole
        })
      });

      const responseText = await response.text();
      let data = {};

      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(responseText || `HTTP error ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.detail || `Server returned status ${response.status}`);
      }

      const botReply =
        data.answer ||
        data.response ||
        data.result ||
        'Received response, but no direct answer field was provided.';

      setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
    } catch (err) {
      console.error('API Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Connection Error: ${err.message || 'Unable to communicate with the backend.'}`
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white font-semibold">
        Loading Enterprise Portal...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <header className="flex justify-between items-center bg-slate-900 px-6 py-3 shadow-md border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-bold text-lg text-white">Enterprise GPT Portal</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Designation</p>
            <p className="text-sm font-medium text-slate-200">
              {userName} <span className="text-xs text-blue-400">({userRole})</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-w-4xl w-full mx-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-bl-none whitespace-pre-wrap'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 text-slate-400 text-sm px-5 py-3 rounded-2xl rounded-bl-none animate-pulse">
              Processing request...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask a question as ${userRole}...`}
            className="flex-1 bg-slate-950 border border-slate-700 text-slate-100 px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={isSending || !query.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}