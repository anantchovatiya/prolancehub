"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageContent = (content) => {
    // Split content into sections based on "Next Steps:" if present
    const [mainContent, nextSteps] = content.split(/Next Steps:/i);
    
    return (
      <div className="space-y-2">
        {mainContent.split('\n').map((line, i) => {
          // Skip empty lines
          if (!line.trim()) return null;
          
          // Format bullet points (handle both • and * as bullet points)
          if (line.trim().match(/^[•*]/)) {
            const content = line.replace(/^[•*]\s*/, '').trim();
            if (!content) return null; // Skip empty bullet points
            
            return (
              <div key={i} className="flex items-start space-x-2 ml-2 mb-2">
                <span className="text-gray-600 text-lg leading-none mt-1">•</span>
                <span className="flex-1 text-sm leading-relaxed">{content}</span>
              </div>
            );
          }
          
          // Regular text
          return <p key={i} className="text-sm leading-relaxed">{line}</p>;
        })}
        
        {/* Next Steps section if present */}
        {nextSteps && (
          <div className="mt-4 pt-2 border-t border-gray-200">
            <p className="font-medium text-sm text-gray-700 mb-2">Next Steps:</p>
            {nextSteps.split('\n').map((step, i) => {
              if (!step.trim()) return null;
              const content = step.replace(/^[•*]\s*/, '').trim();
              if (!content) return null;
              
              return (
                <div key={`step-${i}`} className="flex items-start space-x-2 ml-2 mb-2">
                  <span className="text-gray-600 text-lg leading-none mt-1">•</span>
                  <span className="text-sm leading-relaxed">{content}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      
      // Format the bot's response for better display
      const formattedResponse = {
        role: "bot",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([...messages, userMessage, formattedResponse]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages([
        ...messages,
        userMessage,
        {
          role: "bot",
          content: "I apologize, but I'm having trouble processing your request. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-50"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 animate-fadeIn z-50">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-t-xl">
            <div>
              <h2 className="text-lg font-bold">💬 Freelancing Assistant</h2>
              <p className="text-xs text-gray-300">Ask me anything about freelancing!</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm p-4">
                <p className="mb-2">👋 Hello! I'm your freelancing assistant.</p>
                <p>I can help you with:</p>
                <ul className="mt-2 space-y-1 text-left list-disc list-inside">
                  <li>Project planning and management</li>
                  <li>Client communication strategies</li>
                  <li>Pricing and financial advice</li>
                  <li>Skill development guidance</li>
                  <li>Platform-specific tips</li>
                  <li>Technical skills and tools</li>
                </ul>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-gray-700 text-white"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  <div className={`${msg.role === "user" ? "text-white" : "text-gray-800"}`}>
                    {msg.role === "user" ? (
                      <p className="text-sm">{msg.content}</p>
                    ) : (
                      formatMessageContent(msg.content)
                    )}
                  </div>
                  {msg.timestamp && (
                    <div className={`text-[10px] mt-2 ${
                      msg.role === "user" ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {msg.timestamp}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex items-center space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about freelancing..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                rows="2"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`p-2 rounded-lg ${
                  loading || !input.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-800 text-white"
                } transition-colors`}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
