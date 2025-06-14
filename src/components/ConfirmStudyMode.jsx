import { useLocalStorage } from '@uidotdev/usehooks'
import { ListChecks } from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import { BookOpen } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmStudyMode = () => {
    const navigate = useNavigate()
  const [page, setPage] = useLocalStorage("choose-page", "choosePage");
  return (
    
       
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="relative w-full max-w-lg mx-auto bg-gradient-to-br from-gray-900/95 via-slate-800/95 to-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
    
                {/* Content container */}
                <div className="relative z-10 p-6 sm:p-8">
                  {/* Header with back button */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      className="group flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-lg"
                      onClick={() => navigate("/")}
                    >
                      <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                      <span className="text-sm font-medium">Back</span>
                    </button>
    
                    {/* Decorative close icon */}
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                    </div>
                  </div>
    
                  {/* Title section */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                      Choose Your Study Mode
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Select how you'd like to learn today
                    </p>
                  </div>
    
                  {/* Mode selection buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Notes button */}
                    <button
                      onClick={() => setPage("notes")}
                      className="group relative overflow-hidden bg-gradient-to-tr from-purple-700 to-pink-700 hover:from-purple-500 hover:via-purple-600 hover:to-pink-600 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-white text-lg">
                            Notes
                          </h3>
                          <p className="text-purple-100 text-sm opacity-90">
                            Study with detailed notes
                          </p>
                        </div>
                      </div>
                    </button>
    
                    {/* MCQs button */}
                    <button
                      onClick={() => navigate("/numbers-quiz")}
                      className="group relative overflow-hidden bg-gradient-to-br from-purple-700  to-pink-700 hover:from-pink-500 hover:via-red-500 hover:to-purple-600 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                          <ListChecks className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-white text-lg">MCQs</h3>
                          <p className="text-pink-100 text-sm opacity-90">
                            Test your knowledge
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
    
                  {/* Bottom decorative element */}
                  <div className="flex justify-center mt-6">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
  )
}

export default ConfirmStudyMode