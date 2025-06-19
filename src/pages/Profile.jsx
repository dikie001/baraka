import {
  BookOpen,
  Calendar,
  ChevronUp,
  Clock,
  Crown,
  Flame,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import BottomNav from "../components/MobileNav";
import { useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { lazy, Suspense } from "react";

const ProfilePage = () => {
  const [globalPercentage, setGlobalPercentage] = useState();
  const [loading, setLoading]=useState(false)
  const [overalProgress, setOveralProgress] = useLocalStorage(
    "global-percentage",
    null
  );

  // Save Global Progress
  useEffect(() => {
    setOveralProgress(globalPercentage);
  }, []);

  const [generalPoints, setGeneralPoints] = useState();
  // Get Global Points
  const quickQuizPoints = Number(
    localStorage.getItem("quick-practice-quiz-points")
  );
  const numbersPoints = Number(localStorage.getItem("numbers-quiz-points"));
  const algebraPoints = Number(localStorage.getItem("algebra-quiz-points"));
  const geometryPoints = Number(localStorage.getItem("geometry-quiz-points"));
  const probabilityPoints = Number(
    localStorage.getItem("probability-quiz-points")
  );
  const measurementsPoints = Number(
    localStorage.getItem("measurements-quiz-points")
  );
  const dataPoints = Number(localStorage.getItem("data-quiz-points"));
  const [totalQAnswered, setTotalQAnswered] = useState();

  // Calculate Total Global Points
  const totalPoints =
    quickQuizPoints +
    numbersPoints +
    algebraPoints +
    geometryPoints +
    probabilityPoints +
    measurementsPoints +
    dataPoints;

  //  Calculate Average quiz Score
  const AverageScore = (totalPoints / 7).toFixed(0);
  const AV = Number(AverageScore);

  // Numbers Quiz LocalStorage
  const numbersProgress = localStorage.getItem("current-number");
  const numbersTotalQuiz = localStorage.getItem("numbers-quiz-length");
  const NTQ = Number(numbersTotalQuiz);
  const NP = Number(numbersProgress);

  // Algebra Quiz LocalStorage
  const algebraProgress = localStorage.getItem("current-number-algebra");
  const algebraTotalQuiz = localStorage.getItem("algebra-quiz-length");
  const AP = Number(algebraProgress);
  const ATQ = Number(algebraTotalQuiz);

  // Geometry Quiz LocalStorage
  const geometryProgress = localStorage.getItem("current-number-geometry");
  const geometryTotalQuiz = localStorage.getItem("geometry-quiz-length");
  const GP = geometryProgress ? Number(geometryProgress) : 0;
  const GTQ = geometryTotalQuiz ? Number(geometryTotalQuiz) : 0;

  // Measurement QUiz LocalStorage
  const measurementProgress = localStorage.getItem(
    "current-number-measurement"
  );
  const measurementTotalQuiz = localStorage.getItem("measurement-quiz-length");
  const MP = Number(measurementProgress);
  const MTQ = Number(measurementTotalQuiz);

  // Probability Quiz LocalStorage
  const probabilityProgress = localStorage.getItem(
    "probability-current-number"
  );
  const probabilityTotalQuiz = localStorage.getItem("probability-quiz-length");
  const PP = Number(probabilityProgress);
  const PTQ = Number(probabilityTotalQuiz);

  // Data Quiz LocalStorage
  const dataProgress = localStorage.getItem("data-current-number");
  const dataTotalQuiz = localStorage.getItem("data-quiz-length");
  const DP = Number(dataProgress);
  const DTQ = Number(dataTotalQuiz);

  // Quick Quiz LocalStorage
  const quickQuizTotal = localStorage.getItem("quick-quiz-length");
  const quickQuizProgress = localStorage.getItem(
    "quick-practice-current-number"
  );
  const QQT = Number(quickQuizTotal);
  const QP = Number(quickQuizProgress);

  // Calculate overall Progress
  const calculateOverallProgress = () => {
    const overalProgress = NP + AP + GP + MP + PP + DP + QP;
    setTotalQAnswered(overalProgress);
    const totalQuiz = NTQ + ATQ + GTQ + MTQ + PTQ + DTQ + QQT;
    const gp = ((overalProgress / totalQuiz) * 100).toFixed(2);
    const globalProgress = Number(gp);
    setGlobalPercentage(globalProgress);

  };

  useEffect(() => {
    calculateOverallProgress();
  }, []);

  const subjectData = [
    {
      name: "Algebra",
      progress: (ATQ && ((AP / ATQ) * 100).toFixed(0)) || 0,
      color: "from-pink-500 to-purple-500",
    },
    {
      name: "Geometry",
      progress: (GTQ && ((GP / GTQ) * 100).toFixed(0)) || 0,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Data & Statistics",
      progress: DTQ ? ((DP / DTQ) * 100).toFixed(0) : 0,
      color: "from-pink-400 to-purple-600",
    },
    {
      name: "Measurement",
      progress: MTQ && (((MP / MTQ) * 100).toFixed(0) || 0),
      color: "from-purple-600 to-pink-400",
    },
    {
      name: "Numbers",
      progress: NP || (NTQ && ((NP / NTQ) * 100).toFixed(0)) || 0,
      color: "from-pink-600 to-purple-400",
    },
    {
      name: "Probability",
      progress: PTQ ? ((PP / PTQ) * 100).toFixed(0) : 0,
      color: "from-purple-400 to-pink-600",
    },
  ];



  return (
    <div className=" p-4 relative overflow-hidden scroll-smooth will-change-transform">
      <BottomNav />
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div> */}

      <div className="max-w-7xl mx-auto space-y-4 scroll-smooth relative z-10">
        {/* HEADER PROFILE CARD */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-900/30 py-6 border border-purple-500/30">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Avatar with animated glow */}
            <div className="relative">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 ">
                <img
                  loading="lazy"
                  src="./icon.png"
                  alt="baraka"
                  className="absolute rounded-full inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 shadow-xl shadow-pink-500/50 animate-bounce">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                Bozes Baraka
              </h1>
              <p className="text-slate-300  text-lg">
                Grade 9 Mathematics Explorer
              </p>

              {/* <div className="  flex flex-col space-y-4">
                <div className="flex gap-3">
                  <span className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-400/30 ">
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Problem Solver
                  </span>
                  <span className="px-2 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-200 rounded-full text-sm font-medium backdrop-blur-sm border border-pink-400/30 ">
                    <Zap className="w-4 h-4 inline mr-2" />
                    Quick Learner
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-blue-200 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-105">
                    <Flame className="w-4 h-4 inline mr-2" />
                    Consistent
                  </span>
                </div>
              </div> */}
            </div>

            {/* Level Display */}
            <div className="text-center relative">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                {globalPercentage <= 5
                  ? "Level 1"
                  : globalPercentage <= 10
                  ? "Level 2"
                  : globalPercentage <= 15
                  ? "Level 3"
                  : globalPercentage <= 20
                  ? "Level 4"
                  : globalPercentage <= 25
                  ? "Level 5"
                  : globalPercentage <= 30
                  ? "Level 6"
                  : globalPercentage <= 35
                  ? "Level 7"
                  : globalPercentage <= 40
                  ? "Level 8"
                  : globalPercentage <= 45
                  ? "Level 9"
                  : globalPercentage <= 50
                  ? "Level 10"
                  : globalPercentage <= 55
                  ? "Level 11"
                  : globalPercentage <= 60
                  ? "Level 12"
                  : globalPercentage <= 65
                  ? "Level 13"
                  : globalPercentage <= 70
                  ? "Level 14"
                  : globalPercentage <= 75
                  ? "Level 15"
                  : globalPercentage <= 80
                  ? "Level 16"
                  : globalPercentage <= 85
                  ? "Level 17"
                  : globalPercentage <= 90
                  ? "Level 18"
                  : globalPercentage <= 95
                  ? "Level 19"
                  : "Master"}
              </div>
              <div className="text-slate-400 text-sm">
                {globalPercentage <= 5
                  ? "Newbie"
                  : globalPercentage <= 10
                  ? "Concept Builder "
                  : globalPercentage <= 15
                  ? "Reasoning Learner"
                  : globalPercentage <= 20
                  ? "Algebra Initiate"
                  : globalPercentage <= 25
                  ? "Problem Solver"
                  : globalPercentage <= 30
                  ? "Proficient Evaluator"
                  : globalPercentage <= 35
                  ? "Problem Solver"
                  : globalPercentage <= 40
                  ? "Logical Thinker"
                  : globalPercentage <= 45
                  ? "Structured Analyst"
                  : globalPercentage <= 50
                  ? "Data Interpreter"
                  : globalPercentage <= 55
                  ? "Symbolic Navigator"
                  : globalPercentage <= 60
                  ? "Equation Analyst"
                  : globalPercentage <= 65
                  ? "Abstract Reasoner"
                  : globalPercentage <= 70
                  ? "Numerical Commander"
                  : globalPercentage <= 75
                  ? "Master of Abstractions"
                  : globalPercentage <= 80
                  ? "Theorem Architect"
                  : globalPercentage <= 85
                  ? "Quantitative Thinker"
                  : globalPercentage <= 90
                  ? "Advanced Mathematician"
                  : globalPercentage <= 95
                  ? "Ultimate Scholar"
                  : "Master Architect!!!"}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50"></div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* LEFT COLUMN - Stats & Achievements */}
          <div className="xl:col-span-2 space-y-5">
            {/* QUICK STATS GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {/* Study Streak Card */}
              {/* <di
                className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 group cursor-pointer"
                // onMouseEnter={() => setHoveredCard("streak")}
                // onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">
                    Study Streak
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  15 days
                </div>
                <div className="text-xs text-pink-400 font-medium flex items-center">
                  <ChevronUp className="w-3 h-3 mr-1" />
                  +3 from last week
                </div>
              </di> */}

              {/* Quizzes Completed Card */}
              <div
                className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 group cursor-pointer"
                // onMouseEnter={() => setHoveredCard("quizzes")}
                // onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-pink-400/30 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-5 h-5 text-pink-300" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">
                    Quizes Answered
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {totalQAnswered}
                </div>
                <div className="text-xs text-purple-400 font-medium">
                  {AV === 0 ? AV : AV + 2}% accuracy
                </div>
              </div>

              {/* Study Time Card */}
              {/* <div
                className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 group cursor-pointer"
                // onMouseEnter={() => setHoveredCard("time")}
                // onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">
                    Study Time
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">42h</div>
                <div className="text-xs text-pink-400 font-medium">
                  This month
                </div>
              </div> */}

              {/* Total Points Card */}
              <div
                className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 group cursor-pointer"
                // onMouseEnter={() => setHoveredCard("points")}
                // onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-pink-400/30 group-hover:scale-110 ">
                    <Star className="w-5 h-5 text-pink-300" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">
                    Total Points
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {totalPoints} <span className="text-xl">points</span>
                </div>
                {/* <div className="text-xs text-purple-400 font-medium">
                  Top 10%
                </div> */}
              </div>
            </div>

            {/* Commented Block */}
            <div>
              {/* RECENT ACHIEVEMENTS SECTION */}
              {/* <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-400/30">
                  <Award className="w-7 h-7 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Recent Achievements
                </h2>
              </div>

              <div className="space-y-5"> */}

              {/* Achievement Item 1 */}
              {/* <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-purple-400/20 hover:border-purple-300/40 backdrop-blur-sm group">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/60 transition-all duration-300 group-hover:scale-110">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-lg">
                      Algebra Master
                    </div>
                    <div className="text-slate-300">
                      Completed all algebra topics
                    </div>
                  </div>
                  <div className="text-purple-400 font-bold">+50 XP</div>
                </div> */}

              {/* Achievement Item 2 */}
              {/* <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 border border-pink-400/20 hover:border-pink-300/40 backdrop-blur-sm group">
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg shadow-pink-500/50 group-hover:shadow-pink-400/60 transition-all duration-300 group-hover:scale-110">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-lg">
                      Speed Demon
                    </div>
                    <div className="text-slate-300">
                      10 quick quizzes in a row
                    </div>
                  </div>
                  <div className="text-pink-400 font-bold">+30 XP</div>
                </div> */}

              {/* Achievement Item 3 */}
              {/* <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-purple-400/20 hover:border-purple-300/40 backdrop-blur-sm group">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/60 transition-all duration-300 group-hover:scale-110">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-lg">
                      Problem Solver
                    </div>
                    <div className="text-slate-300">
                      Solved 50 challenging problems
                    </div>
                  </div>
                  <div className="text-purple-400 font-bold">+40 XP</div>
                </div>
              </div>
            </div> */}
            </div>

            {/* LEARNING ANALYTICS SECTION */}
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-400/30">
                  <TrendingUp className="w-7 h-7 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Learning Analytics
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Average Quiz Score */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    {AverageScore}%
                  </div>
                  <div className="text-sm font-medium text-slate-200 mb-2">
                    Average Quiz Score
                  </div>

                  {/* <div className="text-xs text-purple-400 flex items-center justify-center">
                    <ChevronUp className="w-3 h-3 mr-1" />
                    +5% from last month
                  </div> */}
                </div>

                {/* Speed Improvement */}
                {/* <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-pink-400/30 hover:border-pink-300/50 transition-all duration-300 hover:scale-105 group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    2.3x
                  </div>
                  <div className="text-sm font-medium text-slate-200 mb-2">
                    Speed Improvement
                  </div>
                  <div className="text-xs text-pink-400">
                    Faster than when you started
                  </div>
                </div> */}

                {/* Study Sessions */}
                {/* <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    47
                  </div>
                  <div className="text-sm font-medium text-slate-200 mb-2">
                    Study Sessions
                  </div>
                  <div className="text-xs text-purple-400">This month</div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Commented block */}
          <div>
            {/* RIGHT COLUMN - Goals & Subject Progress */}
            {/* Commented Block */}
            <div>
              {/* WEEKLY GOALS SECTION */}
              {/* <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-pink-400/30">
                  <TrendingUp className="w-7 h-7 text-pink-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">Weekly Goals</h2>
              </div>

              <div className="space-y-6"> */}
              {/* Goal 1: Complete 5 quizzes */}
              {/* <div className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-200">
                      Complete 5 Random Quizzes
                    </span>
                    <span className="text-sm font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                      4/5
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/70"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div> */}

              {/* Goal 2: Study 10 hours */}
              {/* <div className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-200">
                      Study 10 Hours
                    </span>
                    <span className="text-sm font-bold text-pink-400 bg-pink-500/20 px-3 py-1 rounded-full">
                      7.5/10h
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-pink-500/50 group-hover:shadow-pink-400/70"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div> */}

              {/* Goal 3: Master new topic */}
              {/* <div className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-200">
                      Master New Topic
                    </span>
                    <span className="text-sm font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                      In Progress
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/70"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
              </div> */}

              {/* Motivational Message */}
              {/* <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300">
                <div className="text-center">
                  <div className="text-white font-medium mb-2 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                    Keep it up! You're doing great this week!
                  </div>
                  <div className="text-sm text-pink-300">
                    2 more days to complete your goals
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>

          <div>
            {/* SUBJECT PROGRESS OVERVIEW SECTION */}
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-400/30">
                  <BookOpen className="w-7 h-7 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Topic Overview
                </h2>
              </div>

              <div className="space-y-5">
                {subjectData.map((subject, index) => (
                  <div key={index} className="group">
                    {/* Subject Header */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-slate-200">
                        {subject.name}
                      </span>
                      <span className="text-sm font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                        {subject.progress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden ">
                      <div
                        className={`bg-gradient-to-r ${subject.color} h-3 group-hover:h-4 rounded-full transition-all duration-700 shadow-lg `}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Progress Summary */}
              <div className="mt-8 mb-12 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 group">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    {globalPercentage}%
                  </div>
                  <div className="text-white font-medium mb-2">
                    Overall Progress
                  </div>
                  <div className="text-sm text-pink-300 flex items-center justify-center">
                    <Star className="w-4 h-4 mr-2" />
                    {globalPercentage <= 20
                      ? "Practice makes perfect"
                      : globalPercentage <= 40
                      ? "Maths is easy, just be persistent"
                      : globalPercentage <= 60
                      ? "Keep up the spirit, i like it."
                      : globalPercentage <= 80
                      ? "You are qoing places"
                      : "Excellent work across all Topics!"}
                  </div>
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
