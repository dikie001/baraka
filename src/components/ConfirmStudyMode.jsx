import { useState } from "react";
import { ListChecks, ChevronLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

const ConfirmStudyMode = () => {
  const navigate = useNavigate()
  const [page, setPage] = useLocalStorage("choose-page", "choosePage");


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-md bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900 border border-purple-300/20 rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={()=>navigate('/')}
            className="flex items-center gap-2 px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/30 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-700 to-pink-700"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
            Choose Your Study Mode
          </h2>
          <p className="text-purple-300 text-sm">
            Select how you'd like to learn today
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setPage("notes")}
            className="bg-gradient-to-r from-purple-700 to-pink-700  p-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-white/20 rounded-full">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white">Notes</h3>
                <p className="text-purple-100 text-xs">Study with notes</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPage("MCQs")}
            className="bg-gradient-to-r from-pink-700 to-purple-700 p-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-white/20 rounded-full">
                <ListChecks className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white">MCQs</h3>
                <p className="text-pink-100 text-xs">Test knowledge</p>
              </div>
            </div>
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default ConfirmStudyMode;
