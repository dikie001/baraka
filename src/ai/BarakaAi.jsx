import { Brain, Send, Settings, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BarakaAI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const bottomRef = useRef(null)

  // Set UseRef
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behaviour: "smooth"})
  },[])

  const callGeminiAPI = async (userMessage) => {
    if (!API_KEY) {
      setError("Server error");
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Baraka AI, a personal study assistant created specifically for a student in grade 9 named Baraka. You help with academic subjects, study planning, explanations, and learning support and life hacks. Keep responses helpful, encouraging, and focused on education. Keep it sharp, fun, and focused. No fluff.You were created, designed and trained by Dickens Omondi . User message: ${userMessage}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return (
        data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't generate a response."
      );
    } catch (err) {
      console.error("Gemini API Error:", err);
      throw new Error(
        err.message.includes("API Error")
          ? "Invalid API key or quota exceeded"
          : "Network error. Please try again."
      );
    }
  };

  const handleSend = async () => {
    setShowWelcome(false);
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage("");
    setError("");

    const newUserMessage = {
      type: "user",
      content: userMessage,
      id: Date.now(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsTyping(true);

    try {
      const aiResponse = await callGeminiAPI(userMessage);
      const newAiMessage = {
        type: "ai",
        content: aiResponse,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 text-white overflow-hidden">
      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #a855f7);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f472b6, #c084fc);
        }
      `}</style>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full ">
        {/* Compact Header */}
        <header className="p-4 text-center relative flex-shrink-0">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-2">
            <Brain className="w-6 h-6" />
            {/* <img src="/icon.png"/> */}
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Baraka AI
          </h1>
          <p className="text-purple-200 text-sm">
            Your Personal Study Assistant
          </p>

          {/* Settings Panel */}
          {showSettings && (
            <div className="absolute shadow-lg top-16 right-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 z-20 min-w-64">
              <h3 className="font-semibold mb-2">Baraka AI </h3>
              <p className="text-white-400">
                This panel will be populated soon!
              </p>
            </div>
          )}
        </header>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col px-4 pb-4 min-h-0">
          {/* Welcome Card */}
          {showWelcome && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-4 border border-white/20 flex-shrink-0">
              <div className="flex items-center gap-3 mb-1">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h2 className="text-lg font-semibold">Welcome back, Baraka!</h2>
              </div>
              <p className="text-purple-100 text-sm leading-relaxed">
                Ready to dive into your studies? I'm here to help with
                explanations, practice questions, study plans, and anything else
                you need to excel academically.
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-3 mb-4 flex-shrink-0">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Chat Messages Area */}
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 flex flex-col min-h-0">
            {/* Chat Header */}
            <div className="p-3 border-b border-white/10 flex-shrink-0">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                AI Assistant Active
              </h3>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
              {messages.length === 0 && !isTyping && (
                <div className="text-center text-purple-200 mt-10">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">
                    Start a conversation with Baraka AI!
                  </p>
                  <p className="text-sm opacity-75 mt-1">
                    Ask me anything about your studies
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 mb-4 ${
                    msg.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-pink-500 to-purple-500"
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
                  >
                    {msg.type === "user" ? (
                      <span className="text-xs font-bold">B</span>
                    ) : (
                      <Brain className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 rounded-tr-none"
                        : "bg-white/10 rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-none p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    ref={bottomRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything about your studies..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-3 transition-all duration-300 transform hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
