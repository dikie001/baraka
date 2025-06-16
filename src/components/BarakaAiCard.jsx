import { BookOpen, Brain, Sparkles } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function BarakaAICard() {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate("/baraka-ai")}>
      {/* Baraka AI Assistant Card */}
      <div className="bg-gradient-to-br from-purple-600/25 to-pink-600/25 backdrop-blur-lg border border-purple-400/40 rounded-2xl p-3 sm:p-6 hover:scale-105 lg:hover:scale-102 transition-all duration-300 cursor-pointer w-full shadow-xl shadow-purple-900/20">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 bg-clip-text text-transparent">
                  Baraka AI
                </h3>
                <p className="text-xs text-purple-400 font-medium">
                  Study Assistant
                </p>
              </div>
            </div>

            <p className="text-sm text-purple-200 mb-1 leading-relaxed">
              Get instant help with explanations and study planning
            </p>
            {/* Commented Block */}
            <div>
              {/* <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-purple-500/20 rounded-lg p-1.5">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                </div>
                <span className="text-xs text-purple-300">Smart Tutoring</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-pink-500/20 rounded-lg p-1.5">
                  <BookOpen className="w-3 h-3 text-pink-400" />
                </div>
                <span className="text-xs text-purple-300">Study Plans</span>
              </div>
            </div> */}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">
                Ready to help
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/baraka-ai")}
          className="bg-black/40 text-purple-400 text-sm font-medium shadow-lg shadow-black/30 py-2 px-3 rounded-md ring ring-purple-600 absolute top-2 right-2 "
        >
          Chat with my Ai{" "}
        </button>
      </div>
    </div>
  );
}
