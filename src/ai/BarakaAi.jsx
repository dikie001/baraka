import { Brain, Send, Settings, Sparkles } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import useFeedbackSound from "../hooks/useFeedbackSound";

export default function BarakaAI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const { playSend, playReceive, playError } = useFeedbackSound();
  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const chatEl = chatRef.current;
    if (!chatEl) return;

    const handleScroll = () => {
      setShowNav(chatEl.scrollTop > 30);
    };
    chatEl.addEventListener("scroll", handleScroll);
    return () => chatEl.removeEventListener("scroll", handleScroll);
  }, []);

  const formatResponse = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\n\n/g, "\n")
      .trim();
  };

  const callGeminiAPI = async (userMessage) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${VITE_API_KEY}`,
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
                    text: `You are Baraka AI, a personal study assistant for a grade 9 student named Baraka. Provide clear, helpful responses without using asterisks (*) for formatting. Write naturally like a knowledgeable tutor. Keep responses concise but informative. Focus on educational content, study tips, and academic support.You were created, trained and designed by Dickens Omondi. User message: ${userMessage}`,
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
      const rawResponse =
        data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't generate a response.";
      return formatResponse(rawResponse);
    } catch (err) {
      playError();
      console.error("Gemini API Error:", err);
      throw new Error(
        err.message.includes("API Error")
          ? "Invalid API key or quota exceeded"
          : "Network error. Please try again."
      );
    }
  };

  const handleSend = async () => {
    setShowHeader(false);
    setShowWelcome(false);
    if (!message.trim()) return;
    playSend();
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
      playReceive();
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
    <div className="h-screen text-white flex flex-col ">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a78bfa, #f472b6);
        }
      `}</style>

      {/* Navbar when user starts chatting */}
      {!showHeader && (
        <div className= "fixed  top-0 left-1/2 transform -translate-x-1/2 bg-white/10 max-w-4xl rounded-xl  mx-2 w-full border-b border-white/20 px-6 backdrop-blur-xl ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div
                className={` inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl mb-3 mt-2 shadow-lg`}
              >
                <Brain className={`w-5 h-5`} />
              </div>
              <div>
                <h1 className=" text-2xl xl:text-3xl  font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
                  Baraka AI
                </h1>
              </div>
            </div>
            <div className="z-55">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className=" mr-5 p-3  bg-white/10  rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                <Settings onClick={()=>console.log('first')} className="w-5 h-5 " />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto flex flex-col h-full w-full">
        {/* Header */}
        <header className="p-6 text-center relative flex-shrink-0">
          {showHeader && (
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}

          {showHeader && (
            <div
              className={` inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-3 shadow-lg`}
            >
              <Brain className={`w-8 h-8`} />
            </div>
          )}
          <h1
            className={`${
              !showHeader && "hidden"
            } text-3xl  font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2`}
          >
            Baraka AI
          </h1>
          <p className={`${!showHeader && "hidden"} text-purple-200`}>
            Your Personal Study Assistant
          </p>

          {showSettings && (
            <div className="absolute top-20 right-6 bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl z-20 min-w-80">
              <h3 className="font-semibold mb-3 text-lg">Settings</h3>
              <p className="text-white/70 mb-4">Customize your AI experience</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sound Effects</span>
                  <div className="w-10 h-6 bg-purple-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dark Mode</span>
                  <div className="w-10 h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Welcome Card */}
        {showWelcome && (
          <div className="mx-2 mb-2 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-semibold">Welcome back, Baraka!</h2>
            </div>
            <p className="text-purple-100 leading-relaxed">
              Ready to dive into your studies? I'm here to help with
              explanations, practice questions, study plans, and anything else
              you need to excel academically.
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className=" mx-2  mt-5 bg-red-500/20 border border-red-500/30 rounded-2xl p-2 shadow-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Main Chat Container */}
        <div className="flex-1 mt-5  mx-2 mb-2 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-3 border-b border-white/20 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">AI Assistant Active</h3>
            </div>
          </div>

          {/* Messages Container */}
          <div
            ref={chatRef}
            className="flex-1 p-6 overflow-y-auto custom-scrollbar"
          >
            {messages.length === 0 && !isTyping && (
              <div className="text-center text-purple-200 mt-20">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl mb-2">
                  Start a conversation with Baraka AI!
                </p>
                <p className="opacity-75">Ask me anything about your studies</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-4 mb-6 ${
                  msg.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-pink-700 to-purple-700"
                      : "bg-gradient-to-r from-purple-700 to-pink-700"
                  }`}
                >
                  {msg.type === "user" ? (
                    <span className="font-bold">B</span>
                  ) : (
                    <Brain className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-4 rounded-2xl shadow-lg ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 rounded-tr-md"
                      : "bg-white/15 rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-md p-4 shadow-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/20 flex-shrink-0">
            <div className="flex gap-4 items-end">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about your studies..."
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
