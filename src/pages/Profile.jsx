import {
  BookOpen,
  Crown,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Sparkles,
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import BottomNav from "../components/MobileNav";

const ProfilePage = () => {
  const [globalPercentage, setGlobalPercentage] = useState(0);
  const [totalQAnswered, setTotalQAnswered] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  // Memoized localStorage data extraction
  const quizData = useMemo(() => {
    const getStorageNumber = (key) => Number(localStorage.getItem(key)) || 0;

    return {
      points: {
        quickQuiz: getStorageNumber("quick-practice-quiz-points"),
        numbers: getStorageNumber("numbers-quiz-points"),
        algebra: getStorageNumber("algebra-quiz-points"),
        geometry: getStorageNumber("geometry-quiz-points"),
        probability: getStorageNumber("probability-quiz-points"),
        measurements: getStorageNumber("measurements-quiz-points"),
        data: getStorageNumber("data-quiz-points"),
      },
      progress: {
        numbers: getStorageNumber("current-number"),
        algebra: getStorageNumber("current-number-algebra"),
        geometry: getStorageNumber("current-number-geometry"),
        measurement: getStorageNumber("current-number-measurement"),
        probability: getStorageNumber("probability-current-number"),
        data: getStorageNumber("data-current-number"),
        quickQuiz: getStorageNumber("quick-practice-current-number"),
      },
      totals: {
        numbers: getStorageNumber("numbers-quiz-length"),
        algebra: getStorageNumber("algebra-quiz-length"),
        geometry: getStorageNumber("geometry-quiz-length"),
        measurement: getStorageNumber("measurement-quiz-length"),
        probability: getStorageNumber("probability-quiz-length"),
        data: getStorageNumber("data-quiz-length"),
        quickQuiz: getStorageNumber("quick-quiz-length"),
      },
    };
  }, []);

  // Calculate derived values
  const totalPoints = useMemo(() => {
    return Object.values(quizData.points).reduce(
      (sum, points) => sum + points,
      0
    );
  }, [quizData.points]);

  const averageScore = useMemo(() => {
    const validScores = Object.values(quizData.points).filter(
      (score) => score > 0
    );
    if (validScores.length === 0) return 0;
    return Math.round(
      validScores.reduce((sum, score) => sum + score, 0) / validScores.length
    );
  }, [quizData.points]);

  // Calculate progress and level
  useEffect(() => {
    const totalProgress = Object.values(quizData.progress).reduce(
      (sum, progress) => sum + progress,
      0
    );
    const totalQuizzes = Object.values(quizData.totals).reduce(
      (sum, total) => sum + total,
      0
    );

    setTotalQAnswered(totalProgress);

    if (totalQuizzes > 0) {
      const percentage = Math.round((totalProgress / totalQuizzes) * 100);
      setGlobalPercentage(percentage);

      // Trigger sparkle animation for high progress
      if (percentage >= 75) {
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 3000);
      }
    }
  }, [quizData]);

  // Memoized level calculation
  const levelInfo = useMemo(() => {
    const levels = [
      { threshold: 5, level: "Level 1", title: "Newbie" },
      { threshold: 10, level: "Level 2", title: "Concept Builder" },
      { threshold: 15, level: "Level 3", title: "Reasoning Learner" },
      { threshold: 20, level: "Level 4", title: "Algebra Initiate" },
      { threshold: 25, level: "Level 5", title: "Problem Solver" },
      { threshold: 30, level: "Level 6", title: "Proficient Evaluator" },
      { threshold: 35, level: "Level 7", title: "Problem Solver" },
      { threshold: 40, level: "Level 8", title: "Logical Thinker" },
      { threshold: 45, level: "Level 9", title: "Structured Analyst" },
      { threshold: 50, level: "Level 10", title: "Data Interpreter" },
      { threshold: 55, level: "Level 11", title: "Symbolic Navigator" },
      { threshold: 60, level: "Level 12", title: "Equation Analyst" },
      { threshold: 65, level: "Level 13", title: "Abstract Reasoner" },
      { threshold: 70, level: "Level 14", title: "Numerical Commander" },
      { threshold: 75, level: "Level 15", title: "Master of Abstractions" },
      { threshold: 80, level: "Level 16", title: "Theorem Architect" },
      { threshold: 85, level: "Level 17", title: "Quantitative Thinker" },
      { threshold: 90, level: "Level 18", title: "Advanced Mathematician" },
      { threshold: 95, level: "Level 19", title: "Ultimate Scholar" },
      { threshold: 100, level: "Master", title: "Master Architect!!!" },
    ];

    return (
      levels.find((level) => globalPercentage <= level.threshold) ||
      levels[levels.length - 1]
    );
  }, [globalPercentage]);

  // Memoized subject data with achievement theme colors
  const subjectData = useMemo(() => {
    const calculateProgress = (current, total) =>
      total > 0 ? Math.round((current / total) * 100) : 0;

    const gradients = [
      "from-blue-400 to-cyan-400",
      "from-green-400 to-emerald-400",
      "from-purple-400 to-violet-400",
      "from-orange-400 to-red-400",
      "from-pink-400 to-rose-400",
      "from-yellow-400 to-amber-400",
    ];

    return [
      {
        name: "Algebra",
        progress: calculateProgress(
          quizData.progress.algebra,
          quizData.totals.algebra
        ),
        color: gradients[0],
      },
      {
        name: "Geometry",
        progress: calculateProgress(
          quizData.progress.geometry,
          quizData.totals.geometry
        ),
        color: gradients[1],
      },
      {
        name: "Data & Statistics",
        progress: calculateProgress(
          quizData.progress.data,
          quizData.totals.data
        ),
        color: gradients[2],
      },
      {
        name: "Measurement",
        progress: calculateProgress(
          quizData.progress.measurement,
          quizData.totals.measurement
        ),
        color: gradients[3],
      },
      {
        name: "Numbers",
        progress: calculateProgress(
          quizData.progress.numbers,
          quizData.totals.numbers
        ),
        color: gradients[4],
      },
      {
        name: "Probability",
        progress: calculateProgress(
          quizData.progress.probability,
          quizData.totals.probability
        ),
        color: gradients[5],
      },
    ];
  }, [quizData]);

  // Memoized motivational message
  const motivationalMessage = useMemo(() => {
    if (globalPercentage <= 20) return "Practice makes perfect";
    if (globalPercentage <= 40) return "Maths is easy, just be persistent";
    if (globalPercentage <= 60) return "Keep up the spirit, I like it.";
    if (globalPercentage <= 80) return "You are going places";
    return "Excellent work across all Topics!";
  }, [globalPercentage]);

  // Cool feature: Animated progress ring component
  const ProgressRing = ({ progress, size = 120 }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {progress}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-800 p-4 relative overflow-hidden">
      <BottomNav />

      {/* Sparkle animation for high achievers */}
      {showSparkles && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute w-6 h-6 text-yellow-400 animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6 relative pt-8 mb-20">
        {/* Header Profile Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative group">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl">
                <img
                  src="./icon.png"
                  alt="baraka"
                  className="absolute rounded-2xl inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-2 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="text-center lg:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Bozes Baraka
              </h1>
              <p className="text-purple-100 text-lg">
                Grade 9 Mathematics Explorer
              </p>
            </div>

            <div className="text-center relative">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                {levelInfo.level}
              </div>
              <div className="text-purple-200 text-sm">{levelInfo.title}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="xl:col-span-2 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-purple-100 text-sm font-medium">
                    Quizzes Answered
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {totalQAnswered}
                </div>
                <div className="text-xs text-purple-200 font-medium">
                  {averageScore === 0 ? averageScore : averageScore + 2}%
                  accuracy
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-purple-100 text-sm font-medium">
                    Total Points
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {totalPoints} <span className="text-xl">points</span>
                </div>
              </div>
            </div>

            {/* Learning Analytics */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Learning Analytics
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <ProgressRing progress={averageScore} />
                  <div className="text-purple-100 text-lg font-medium mt-4">
                    Average Quiz Score
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-xl p-4">
                    <div className="text-white text-lg font-semibold mb-1">
                      Performance Streak
                    </div>
                    <div className="text-purple-200 text-sm">
                      {totalPoints > 500
                        ? "🔥 On Fire!"
                        : totalPoints > 200
                        ? "💪 Building momentum"
                        : "🌱 Just getting started"}
                    </div>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-xl p-4">
                    <div className="text-white text-lg font-semibold mb-1">
                      Next Milestone
                    </div>
                    <div className="text-purple-200 text-sm">
                      {globalPercentage < 100
                        ? `${100 - globalPercentage}% to completion`
                        : "All topics mastered! 🎉"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Subject Progress */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Topic Overview
              </h2>
            </div>

            <div className="space-y-5">
              {subjectData.map((subject, index) => (
                <div key={subject.name} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-white">
                      {subject.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {subject.progress === 100 && (
                        <Trophy className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className="text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">
                        {subject.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
                    <div
                      className={`bg-gradient-to-r ${subject.color} h-3 rounded-full transition-all duration-700 shadow-lg`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Progress Summary */}
            <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-center">
                <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {globalPercentage}%
                </div>
                <div className="text-white font-medium mb-2">
                  Overall Progress
                </div>
                <div className="text-sm text-purple-200 flex items-center justify-center">
                  <Star className="w-4 h-4 mr-2" />
                  {motivationalMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
export const Profile = React.memo(ProfilePage, (prevProps, nextProps) => {
  // Prevent re-rendering if props haven't changed
  return prevProps === nextProps;
});
