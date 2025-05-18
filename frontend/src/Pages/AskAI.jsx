import React, { useState, useRef, useEffect } from 'react';
import { askAI } from '../services/api';
import Navbar from '../navbar';
import Footer from '../footer';
import ReactMarkdown from 'react-markdown';

const AskAI = () => {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom when chat updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, loading]);

  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setChat(prev => [...prev, { role: 'user', text: question }]);
    try {
      const res = await askAI(question);
      setChat(prev => [...prev, { role: 'ai', text: res.data.answer }]);
    } catch (err) {
      setChat(prev => [...prev, { role: 'ai', text: 'Sorry, something went wrong.' }]);
    }
    setQuestion('');
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-2">
        <div className="w-full max-w-4xl bg-white rounded shadow p-6 flex flex-col" style={{ minHeight: 600 }}>
          <h2 className="text-2xl font-bold mb-4 text-center">Ask AI Anything</h2>
          <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-50 mb-4" style={{ maxHeight: 450 }}>
            {chat.length === 0 && (
              <div className="text-gray-400 text-center">Start the conversation by asking a question!</div>
            )}
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg shadow
                    ${msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-green-100 text-gray-800 rounded-bl-none'
                    }`}
                >
                  {msg.role === 'ai'
                    ? <ReactMarkdown>{msg.text}</ReactMarkdown>
                    : <span>{msg.text}</span>
                  }
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%] px-4 py-2 rounded-lg bg-green-100 text-gray-800 shadow">
                  AI is typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded p-2"
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AskAI;