// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [userName, setUserName] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const role = localStorage.getItem('user_role');
//     const name = localStorage.getItem('user_name');

//     if (!role) {
//       router.push('/login');
//     } else {
//       setUserName(name || 'Employee');
//       setUserRole(role || 'HR Operations Lead');
//       setLoading(false);
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push('/login');
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white font-semibold">
//         Loading Enterprise Portal...
//       </div>
//     );
//   }

//   // Streamlit पब्लिक URL (किंवा लोकल टेस्टिंगसाठी fallback)
//   const STREAMLIT_URL = process.env.NEXT_PUBLIC_STREAMLIT_URL || "https://infosys-backend-production.up.railway.app";

//   return (
//     <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100">
//       {/* Top Navbar */}
//       <header className="flex justify-between items-center bg-slate-900 text-white px-6 py-3 shadow-lg z-20 border-b border-slate-800">
//         <div className="flex items-center gap-3">
//           <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>
//           <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
//             Enterprise GPT Portal
//           </span>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="text-right hidden sm:block">
//             <p className="text-xs text-slate-400">Authenticated User</p>
//             <p className="text-sm font-medium text-slate-200">
//               {userName} <span className="text-xs text-blue-400">({userRole})</span>
//             </p>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-xl font-semibold shadow-sm transition-all duration-150"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <main className="flex-1 w-full h-[calc(100vh-60px)] bg-slate-50 relative">
//         <iframe
//           src={`${STREAMLIT_URL}/?embed=true&embed_options=disable_scrolling`}
//           className="w-full h-full border-0"
//           title="Enterprise GPT Dashboard"
//           allow="clipboard-write; clipboard-read"
//         />
//       </main>
//     </div>
//   );
// }



'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  
  // चॅट स्टेट्स
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your Enterprise GPT Assistant. Ask me anything about Infosys policies or documents.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || sending) return;

    const userQuery = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', text: userQuery }]);
    setSending(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://infosys-backend-production.up.railway.app';
      
      const res = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuery, role: userRole }),
      });

      const data = await res.json();
      const botReply = data.answer || data.response || data.message || 'No response from server.';
      
      setMessages((prev) => [...prev, { role: 'assistant', text: botReply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error connecting to backend server.' }]);
    } finally {
      setSending(false);
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

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-200">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 rounded-2xl px-4 py-2 text-sm italic border border-slate-200">
                Enterprise GPT is thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Question Input Box */}
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question here (e.g. Infosys leave policy)..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none bg-white shadow-sm"
          />
          <button
            type="submit"
            disabled={sending || !inputMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}