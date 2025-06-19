import { BookOpen, Crown, Star, Target, TrendingUp } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import BottomNav from "../components/MobileNav";

const ProfilePage = () => {
  const [globalPercentage, setGlobalPercentage] = useState(0);
  const [totalQAnswered, setTotalQAnswered] = useState(0);

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

  // Memoized subject data
  const subjectData = useMemo(() => {
    const calculateProgress = (current, total) =>
      total > 0 ? Math.round((current / total) * 100) : 0;

    const gradients = [
      "from-pink-500 to-purple-500",
      "from-purple-500 to-pink-500",
      "from-pink-400 to-purple-600",
      "from-purple-600 to-pink-400",
      "from-pink-600 to-purple-400",
      "from-purple-400 to-pink-600",
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

  return (
    <div className="p-4 relative overflow-hidden">
      <BottomNav />

      <div className="max-w-7xl mx-auto space-y-4 relative">
        {/* Header Profile Card */}
        <div className="bg-black/5 rounded-2xl shadow-lg shadow-black/50 border border-purple-500/30 py-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src="./icon.png"
                  alt="baraka"
                  className="absolute rounded-full inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 shadow-lg">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="text-center lg:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                Bozes Baraka
              </h1>
              <p className="text-slate-300 text-lg">
                Grade 9 Mathematics Explorer
              </p>
            </div>

            <div className="text-center relative">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {levelInfo.level}
              </div>
              <div className="text-slate-400 text-sm">{levelInfo.title}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left Column - Stats */}
          <div className="xl:col-span-2 space-y-5">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 rounded-2xl shadow-lg border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                    <Target className="w-5 h-5 text-pink-300" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">
                    Quizzes Answered
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {totalQAnswered}
                </div>
                <div className="text-xs text-purple-400 font-medium">
                  {averageScore === 0 ? averageScore : averageScore + 2}%
                  accuracy
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl shadow-lg border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                    <Star className="w-5 h-5 text-pink-300" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">
                    Total Points
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {totalPoints} <span className="text-xl">points</span>
                </div>
              </div>
            </div>

            {/* Learning Analytics */}
            <div className="bg-white/5 rounded-2xl shadow-lg border border-purple-500/30 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                  <TrendingUp className="w-7 h-7 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Learning Analytics
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-black/5  rounded-xl border border-purple-400/30">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                    {averageScore}%
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    Average Quiz Score
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Subject Progress */}
          <div className="bg-white/5 rounded-2xl shadow-lg border border-purple-500/30 p-8 mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                <BookOpen className="w-7 h-7 text-purple-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Topic Overview</h2>
            </div>

            <div className="space-y-5">
              {subjectData.map((subject, index) => (
                <div key={subject.name}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-200">
                      {subject.name}
                    </span>
                    <span className="text-sm font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                      {subject.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-white/5  rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-300 shadow-sm`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Progress Summary */}
            <div className="mt-8 p-6 bg-black/15 rounded-xl border border-purple-600">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  {globalPercentage}%
                </div>
                <div className="text-white font-medium mb-2">
                  Overall Progress
                </div>
                <div className="text-sm text-pink-300 flex items-center justify-center">
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
export const Profile = React.memo(ProfilePage);
