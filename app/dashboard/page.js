'use client';

import { useEffect, useState, useRef } from 'react';

export default function DashboardPage() {
  const [userName, setUserName] = useState('Employee');
  const [userRole, setUserRole] = useState('HR Operations Lead');
  const [query, setQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your Enterprise Policy Assistant. How can I assist you today?'
    }
  ]);

  const messagesEndRef = useRef(null);
  const BACKEND_URL = 'https://infosys-backend-production.up.railway.app';

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');
    if (name) setUserName(name);
    if (role) setUserRole(role);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!query.trim() || isSending) return;

    const userPrompt = query.trim();
    setQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: userPrompt }]);
    setIsSending(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt, designation: userRole })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Failed to fetch answer');

      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer || 'No answer returned.' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `⚠️ Error: ${err.message}` }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#020617', color: '#f8fafc' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b' }}>
        <strong>Enterprise GPT Portal</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{userName} ({userRole})</span>
          <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} style={{ padding: '6px 12px', backgroundColor: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', boxSizing: 'border-box' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '12px 16px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? '#2563eb' : '#1e293b', border: msg.role === 'user' ? 'none' : '1px solid #334155', whiteSpace: 'pre-wrap' }}>
            {msg.content}
          </div>
        ))}
        {isSending && <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>Analyzing enterprise documents...</div>}
        <div ref={messagesEndRef} />
      </main>

      <footer style={{ padding: '1rem', backgroundColor: '#0f172a', borderTop: '1px solid #1e293b' }}>
        <form onSubmit={handleSendMessage} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about policies, leave rules..."
            style={{ flex: 1, padding: '12px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', color: 'white', outline: 'none' }}
          />
          <button type="submit" disabled={isSending || !query.trim()} style={{ padding: '12px 20px', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
