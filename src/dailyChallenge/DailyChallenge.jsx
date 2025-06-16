import React, { useEffect, useState } from "react";
import {
  Brain,
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import questionsData from "./DailyChallenge.json";

const DailyChallenge = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const shuffled = [...questionsData.question_bank].sort(
      () => 0.5 - Math.random()
    );
    const dailyQuestions = shuffled.slice(0, 10);
    setQuestions(dailyQuestions);
  }, []);

  useEffect(() => {
    if (!completed) {
      const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [completed]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (showResults[questionIndex]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));

    setShowResults((prev) => ({
      ...prev,
      [questionIndex]: true,
    }));

    const question = questions[questionIndex];
    const isCorrect = question.correct === optionIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    // Auto advance after 1.5 seconds
    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setCurrentQuestion(questionIndex + 1);
      } else {
        setCompleted(true);
        if (score >= questions.length * 0.8) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }
    }, 1500);
  };

  const resetChallenge = () => {
    setSelectedAnswers({});
    setShowResults({});
    setScore(0);
    setCompleted(false);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setStreak(0);
    const shuffled = [...questionsData.question_bank].sort(
      () => 0.5 - Math.random()
    );
    const dailyQuestions = shuffled.slice(0, 10);
    setQuestions(dailyQuestions);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90)
      return {
        text: "Outstanding! 🏆",
        color: "text-yellow-300",
        bg: "from-yellow-500/20 to-orange-500/20",
      };
    if (percentage >= 80)
      return {
        text: "Excellent! 🌟",
        color: "text-green-300",
        bg: "from-green-500/20 to-emerald-500/20",
      };
    if (percentage >= 70)
      return {
        text: "Great Job! 👏",
        color: "text-blue-300",
        bg: "from-blue-500/20 to-cyan-500/20",
      };
    if (percentage >= 50)
      return {
        text: "Good Effort! 💪",
        color: "text-purple-300",
        bg: "from-purple-500/20 to-pink-500/20",
      };
    return {
      text: "Keep Practicing! 📚",
      color: "text-pink-300",
      bg: "from-pink-500/20 to-red-500/20",
    };
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="text-yellow-400" size={16} />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto p-6">
        {/* Header Stats */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
              <Brain className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Daily Challenge
              </h1>
              <p className="text-purple-200">Sharpen your mind every day</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-300" size={18} />
                <span className="text-white font-mono">
                  {formatTime(timeElapsed)}
                </span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <div className="flex items-center gap-2">
                <Target className="text-green-300" size={18} />
                <span className="text-white">
                  {score}/{questions.length}
                </span>
              </div>
            </div>
            {streak > 0 && (
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-orange-400/30">
                <div className="flex items-center gap-2">
                  <Trophy className="text-orange-300" size={18} />
                  <span className="text-orange-200">{streak} streak!</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {completed ? (
          /* Results Screen */
          <div className="max-w-2xl mx-auto">
            <div
              className={`bg-gradient-to-r ${
                getScoreMessage().bg
              } backdrop-blur-sm rounded-3xl p-6 border border-white/20 text-center mb-8`}
            >
              <div className="mb-6">
                <Trophy className="mx-auto text-yellow-300 mb-4" size={64} />
                <h2
                  className={`text-4xl font-bold ${
                    getScoreMessage().color
                  } mb-2`}
                >
                  {getScoreMessage().text}
                </h2>
                <p className="text-white text-xl">
                  You scored {score} out of {questions.length}
                </p>
                <p className="text-purple-200 mt-2">
                  Time: {formatTime(timeElapsed)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-300">
                    {score}
                  </div>
                  <div className="text-sm text-purple-200">Correct</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-300">
                    {questions.length - score}
                  </div>
                  <div className="text-sm text-purple-200">Incorrect</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-300">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <div className="text-sm text-purple-200">Accuracy</div>
                </div>
              </div>

              <button
                onClick={resetChallenge}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={20} />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          /* Question Interface */
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-200">Progress</span>
                <span className="text-purple-200">
                  {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm border border-white/20">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            {questions[currentQuestion] && (
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:bg-white/15">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {currentQuestion + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {questions[currentQuestion].question}
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, oIndex) => {
                    const isSelected =
                      selectedAnswers[currentQuestion] === oIndex;
                    const isCorrect =
                      questions[currentQuestion].correct === oIndex;
                    const showResult = showResults[currentQuestion];

                    let buttonClass =
                      "p-6 rounded-2xl border transition-all duration-300 text-left flex items-center justify-between group transform hover:scale-[1.02] ";

                    if (!showResult) {
                      buttonClass +=
                        "border-purple-300/30 bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white cursor-pointer hover:border-purple-400/50 hover:shadow-lg";
                    } else if (isSelected && isCorrect) {
                      buttonClass +=
                        "border-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-100 shadow-lg shadow-green-500/20";
                    } else if (isSelected && !isCorrect) {
                      buttonClass +=
                        "border-red-400 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-100 shadow-lg shadow-red-500/20";
                    } else if (isCorrect) {
                      buttonClass +=
                        "border-green-400 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-200";
                    } else {
                      buttonClass +=
                        "border-purple-300/20 bg-white/5 text-purple-200";
                    }

                    return (
                      <button
                        key={oIndex}
                        className={buttonClass}
                        onClick={() =>
                          handleAnswerSelect(currentQuestion, oIndex)
                        }
                        disabled={showResult}
                      >
                        <span className="text-lg">{option}</span>
                        <div className="flex items-center gap-2">
                          {!showResult && (
                            <ArrowRight
                              className="text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity"
                              size={20}
                            />
                          )}
                          {showResult && (
                            <span>
                              {isCorrect ? (
                                <CheckCircle
                                  className="text-green-400"
                                  size={24}
                                />
                              ) : isSelected ? (
                                <XCircle className="text-red-400" size={24} />
                              ) : null}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
