import React from "react";
import revisionData from "./Notes.json";
import { ChevronLeft } from "lucide-react";
import BottomNav from "../../components/MobileNav";
import { useLocalStorage } from "@uidotdev/usehooks";


const NumbersNotes = () => {
  const { topic, grade, revision_content } = revisionData;
  const [mode, setMode] = useLocalStorage("choose-page", "choosePage");

  return (
    <div
      className={`min-h-screen  bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 text-white `}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <button
          onClick={() => setMode("choosePage")}
          className="flex absolute top-3 left-3"
        >
          <ChevronLeft /> Back
        </button>
        <BottomNav />
        <div className="text-center mb-4 mt-4 space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
            📘 {topic}
          </h1>
          <p className="text-slate-300 text-xl font-medium">
            Grade {grade} Revision Guide
          </p>
          <p className="text-slate-400 italic text-lg max-w-2xl mx-auto leading-relaxed">
            {revision_content.description}
          </p>
        </div>

        {/* Content Section */}
        <div className="   space-y-5  mb-15">
          {revision_content.subtopics.map((subtopic, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800/80 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-3">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                {subtopic.title}
              </h2>

              <div className="space-y-4">
                {subtopic.definition && (
                  <div className="bg-purple-900/30 rounded-lg p-4 border border-pink-400">
                    <p className="text-slate-200">
                      <span className="text-pink-400 font-semibold">
                        🧠 Definition:
                      </span>{" "}
                      {subtopic.definition}
                    </p>
                  </div>
                )}

                {subtopic.symbol && (
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-400">
                    <p className="text-cyan-300 font-mono">
                      <span className="text-purple-400 font-semibold">
                        🔣 Symbol:
                      </span>{" "}
                      {subtopic.symbol}
                    </p>
                  </div>
                )}

                {subtopic.example && (
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-green-400">
                    <div className="space-y-2">
                      <p className="text-green-400 font-semibold">
                        📝 Example:
                      </p>
                      <div className="ml-4 space-y-1">
                        <p className="text-slate-300">
                          Q: {subtopic.example.question}
                        </p>
                        <p className="text-green-300 font-medium">
                          A: {subtopic.example.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {subtopic.whyItMatters && (
                  <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-400">
                    <p className="text-slate-200">
                      <span className="text-blue-400 font-semibold">
                        💡 Why It Matters:
                      </span>{" "}
                      {subtopic.whyItMatters}
                    </p>
                  </div>
                )}

                {subtopic.quickTips && subtopic.quickTips.length > 0 && (
                  <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-400">
                    <div className="space-y-2">
                      <p className="text-amber-400 font-semibold">
                        ⚡ Quick Tips:
                      </p>
                      <ul className="ml-4 space-y-1 text-slate-300">
                        {subtopic.quickTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      )
    </div>
  );
};

export default NumbersNotes;
