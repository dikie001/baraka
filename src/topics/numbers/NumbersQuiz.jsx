import React, { useState, useEffect } from "react";
import questionsData from "./Quiz.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BottomNav from "../../components/MobileNav";
import ConfirmStudyMode from "../../components/ConfirmStudyMode";

// Custom localStorage hook
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      setValue(newValue);
    }
  };

  return [value, setStoredValue];
};

const NumbersQuizPage = () => {
  // Load saved progress
  const [currentNumber, setCurrentNumber] = useLocalStorage(
    "current-number",
    0
  );
  const [percentageScore, setPercentageScore] = useLocalStorage(
    "numbers-percentage-score",
    0
  );
  const [savedScore, setSavedScore] = useLocalStorage("quiz-score", 0);
  const [savedAnswered, setSavedAnswered] = useLocalStorage(
    "quiz-answered",
    []
  );
  const [mode, setMode] = useLocalStorage("choose-page", null);

  // Initialize state with saved progress
  const [current, setCurrent] = useState(currentNumber || 0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(savedScore || 0);
  const [answered, setAnswered] = useState(new Set(savedAnswered || []));

  const question = questionsData.questions[current];
  const totalQuestions = questionsData.questions.length;

  const handleOptionClick = (key) => {
    setSelected(key);
    setShowAnswer(true);

    if (!answered.has(current) && key === question.answer) {
      const newScore = score + 1;
      setScore(newScore);
      setSavedScore(newScore);
    }

    const newAnswered = new Set([...answered, current]);
    setAnswered(newAnswered);
    setSavedAnswered([...newAnswered]);
  };

  const nextQuestion = () => {
    const nextIndex = (current + 1) % questionsData.questions.length;
    setCurrent(nextIndex);
    setCurrentNumber(nextIndex);
    setSelected(null);
    setShowAnswer(false);
  };

  const prevQuestion = () => {
    const prevIndex =
      (current - 1 + questionsData.questions.length) %
      questionsData.questions.length;
    setCurrent(prevIndex);
    setCurrentNumber(prevIndex);
    setSelected(null);
    setShowAnswer(false);
  };

  // Update percentage score when score changes
  useEffect(() => {
    const newPercentageScore = Math.floor((score / totalQuestions) * 100);
    setPercentageScore(newPercentageScore);
  }, [score, totalQuestions, setPercentageScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-slate-900 text-white p-4">
      <BottomNav />
      {mode === "choosePage" && <ConfirmStudyMode />}
      <button onClick={()=>setMode("choosePage")} className="absolute flex  top-2 left-3"><ChevronLeft size={22}/>Back</button>
      {/* Header with progress */}
      <div className="max-w-4xl mx-auto mb-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Numbers Quiz
          </h1>
          <div className="text-purple-300 font-medium">
            Score: {percentageScore}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700/50 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        <div className="text-sm text-slate-400 text-center">
          Question {current + 1} of {totalQuestions}
        </div>
      </div>

      {/* Main quiz card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-500/30 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

          <div className="flex items-start justify-between">
            <p className="absolute top-3 text-gray-400 text-sm font-semibold">
              {question.subtopic}
            </p>
            <h2 className="text-2xl font-bold text-purple-100 leading-relaxed flex-1">
              {question.question}
            </h2>
            <div className="ml-4 px-3 py-1 bg-purple-900/50 rounded-full text-sm font-medium text-purple-300 border border-purple-500/30">
              #{question.id}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {Object.entries(question.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                className={`group block w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 border ${
                  selected === key
                    ? key === question.answer
                      ? "bg-green-500/20 border-green-400 shadow-lg shadow-green-500/20 transform scale-[1.02]"
                      : "bg-red-500/20 border-red-400 shadow-lg shadow-red-500/20 transform scale-[1.02]"
                    : "bg-slate-700/50 hover:bg-purple-600/20 hover:border-purple-400/50 border-slate-600/50 hover:transform hover:scale-[1.01]"
                }`}
                disabled={showAnswer}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center mr-4 text-sm font-bold text-purple-300 group-hover:bg-purple-500/40 transition-colors">
                    {key.toUpperCase()}
                  </span>
                  <span className="text-slate-100 font-medium">{value}</span>
                </div>
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/40 backdrop-blur-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-400 mr-3"></div>
                <span className="text-purple-200 font-medium">
                  Correct answer:{" "}
                </span>
                <span className="ml-2 px-3 py-1 bg-pink-500/30 rounded-full text-pink-300 font-bold border border-pink-400/30">
                  {question.answer.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mb-12 gap-4">
            <button
              onClick={prevQuestion}
              className="flex items-center px-6 py-3 bg-gradient-to-bl from-purple-600 to-pink-700 hover:ring-2 ring-purple-500 rounded-xl transition-all duration-200 font-medium text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500/50"
            >
              <ChevronLeft /> Previous
            </button>
            <button
              onClick={nextQuestion}
              className="flex px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-medium transform hover:scale-105"
            >
              Next <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumbersQuizPage;
