import { useLocalStorage } from "@uidotdev/usehooks";
import { BookOpen, ListChecks, Star } from "lucide-react";
import React from "react";
import BottomNav from "../../components/MobileNav";
import numberSystems from "./Notes.json";

import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Numbers = () => {
  const { topic, grade, revision_content } = numberSystems;
  const { description, subtopics } = revision_content;
  const [page, setPage] = useLocalStorage("choose-page", "choosePage");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <BottomNav />

      {/* Choose btn notes and questions modal */}
      {page === "choosePage" && (
        <div className="flex  inset-0 m-auto h-50 absolute  flex-col sm:flex-row gap-4  p-4 bg-black/40 text-white rounded-xl shadow-lg max-w-md w-[85%] mx-auto">
          <button
            className="flex active:text-blue-600 hover:text-blue-500 items-center"
            onClick={() => navigate("/")}
          >
            <ChevronLeft /> Back
          </button>

          <p className="text-center mt- sm:text-left font-medium">
            Choose the Mode of Study
          </p>

          <div className="flex gap-2  justify-between w-full  ">
            <button
              onClick={() => setPage("notes")}
              className="px-4 flex items-center justify-center gap-2 py-2 bg-gradient-to-tr from-purple-700 to-pink-700 hover:bg-green-700 rounded-lg text-medium"
            >
              <BookOpen /> Notes
            </button>
            <button
              onClick={() => navigate('/numbers-quiz')}
              className="px-4 py-2 flex gap-2 bg-gradient-to-br from-purple-700 to-pink-700 hover:bg-red-700 rounded-lg text-medium"
            >
              <ListChecks /> MCQs
            </button>
          </div>
        </div>
      )}

      {/* Notes Page */}
      {page === "notes" && (
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 lg:py-12">
          {/* Header */}
          <button
            onClick={() => setPage("choosePage")}
            className="flex  items-center active:text-blue-600 hover:text-blue-500"
          >
            <ChevronLeft size={30} /> Back
          </button>
          <div className="text-center mb-4 lg:mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl px-6 py-3 mb-4">
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
          <div className="mb-15 mt-3 text-center">
            <div className="inline-flex items-center space-x-2 text-purple-300">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <span className="text-sm">
                Keep learning Baraka, you're doing great!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Numbers;
