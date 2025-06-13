import React from "react";
import { BookOpen, Star } from "lucide-react";
import numberSystems from "./Numbers.json";
import BottomNav from "../../components/MobileNav";

const Numbers = () => {
  const { topic, grade, revision_content } = numberSystems;
  const { description, subtopics } = revision_content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <BottomNav />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl px-6 py-3 mb-4">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="text-purple-200 font-medium">Grade {grade}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            {topic}
          </h1>
          <p className="text-purple-200 text-lg lg:text-xl max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Subtopics */}
        <div className="space-y-6">
          {subtopics.map((sub, index) => (
            <div
              key={index}
              className="group bg-slate-800/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 lg:p-8 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mt-1">
                  <Star className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
                    {sub.title}
                  </h2>
                  <div className="space-y-3">
                    {sub.notes.map((note, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-3 text-purple-100 group-hover:text-white transition-colors duration-200"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="leading-relaxed">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-purple-300">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Keep learning, you're doing great!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
