"use client";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Typing animation

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true); // Show typing animation

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      setMessages([...messages, userMessage, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 transition-all duration-300 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold text-gray-700">💬 ProlanceHub Chat</h2>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={22} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 max-w-[80%] text-sm rounded-lg shadow-md ${
                  msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {/* Typing Animation */}
            {loading && (
              <div className="p-2 text-sm text-gray-600 bg-gray-200 w-fit rounded-lg shadow-md">
                <span className="dot-flashing"></span> <span className="dot-flashing"></span> <span className="dot-flashing"></span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="mt-2 flex items-center bg-gray-100 p-2 rounded-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about freelancing..."
              className="w-full p-2 bg-transparent border-none focus:outline-none text-gray-700"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full hover:scale-105 transition-transform"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
