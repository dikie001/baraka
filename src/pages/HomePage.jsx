import { useLocalStorage } from "@uidotdev/usehooks";
import {
  BarChart2Icon,
  Calculator,
  Dices,
  FunctionSquare,
  Play,
  Scale,
  Triangle,
  Trophy
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarakaAICard from "../components/BarakaAiCard";
import CalculateDate from "../components/CalculateDate";
import DesktopNav from "../components/DesktopNav";
import Menu from "../components/Menu";
import BottomNav from "../components/MobileNav";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [overalPoints, setOveralPoints] = useState("");

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

  // Get Quiz points for all quizes
  const algebraPoints = localStorage.getItem("algebra-quiz-points");
  const dataPoints = localStorage.getItem("data-quiz-points");
  const geometryPoints = localStorage.getItem("geometry-quiz-points");
  const measurementsPoints = localStorage.getItem("measurements-quiz-points");
  const numbersPoints = localStorage.getItem("numbers-quiz-points");
  const probabilityPoints = localStorage.getItem("probability-quiz-points");
  const quickQuizPoints = localStorage.getItem("quick-practice-quiz-points");
  // Convert Quiz Points 
  const point1 = Number(algebraPoints);
  const point2 = Number(dataPoints);
  const point3 = Number(geometryPoints);
  const point4 = Number(measurementsPoints);
  const point5 = Number(numbersPoints);
  const point6 = Number(probabilityPoints);
  const point7 = Number(quickQuizPoints);

  // Set Page
  const [page, setPage] = useLocalStorage("choose-page", null);
  const navigate = useNavigate();

  // Run on first render
  useEffect(() => {
    setPage("choosePage");
    CalculatePoints();
  }, []);

  // Calculate Points
  const CalculatePoints = () => {
    const points = point1 + point2 + point3 + point4 + point5 + point6 + point7;
    setOveralPoints(points);
  };

  const topics = [
    {
      name: "Numbers",
      icon: <Calculator />,
      progress: NP || (NTQ && ((NP / NTQ) * 100).toFixed(0)) || 0,
      to: "/numbers",
      about: "Build math foundation ",
    },
    {
      name: "Algebra",
      icon: <FunctionSquare />,
      progress: (ATQ && ((AP / ATQ) * 100).toFixed(0)) || 0,
      to: "/algebra",
      about: "Explore algebraic rules",
    },
    {
      name: "Geometry",
      icon: <Triangle />,
      progress: (GTQ && ((GP / GTQ) * 100).toFixed(0)) || 0,
      to: "/geometry",
      about: "Learn spartial reasoning",
    },
    {
      name: "Measurement",
      icon: <Scale />,
      progress: MTQ && (((MP / MTQ) * 100).toFixed(0) || 0),
      to: "/measurement",
      about: "Estimate and measure",
    },
    {
      name: "Data & Statistics",
      icon: <BarChart2Icon />,
      progress: DTQ ? ((DP / DTQ) * 100).toFixed(0) : 0,
      to: "/data",
      about: "Interprete data",
    },
    {
      name: "Probability",
      icon: <Dices />,
      progress: PTQ ? ((PP / PTQ) * 100).toFixed(0) : 0,
      to: "/probability",
      about: "Predict with reasoning",
    },
  ];

  const achievements = [
    { name: "Quick Solver", icon: "⚡", earned: true },
    { name: "Perfect Score", icon: "🎯", earned: true },
    { name: "Math Wizard", icon: "🧙‍♂️", earned: false },
    { name: "Champion", icon: "👑", earned: false },
  ];

  return (
    <div className=" text-white overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none"> */}
      {/* <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl animate-pulse delay-500"></div> */}
      {/* Additional background elements for larger screens */}
      {/* <div className="hidden lg:block absolute top-20 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="hidden lg:block absolute bottom-20 left-20 w-40 h-40 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-300"></div>
      </div> */}
      <BottomNav />
      <DesktopNav />
      <CalculateDate />
      <Menu />
      <div className="relative z-10 w-full max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-xl border  border-purple-500/20 shadow-2xl min-h-screen lg:rounded-3xl lg:my-8 lg:min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-950 to-slate-900  backdrop-blur-xl border-b border-purple-500/20 lg:rounded-t-3xl">
          <div className="flex mt-1 ml-10 items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hi Baraka! 👋
              </h1>
              <p className="text-purple-200 text-sm lg:text-base mt-1">
                Ready to learn math?
              </p>
            </div>

            <div className="flex  items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 lg:p-3 rounded-full">
                <Trophy className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="text-xl lg:text-2xl font-bold">
                {overalPoints}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-20 lg:pb-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
            {/* Left Column - Daily Challenge and Quick Practice */}
            <div className="lg:col-span-5 space-y-6">
              {/* Baraka Ai Card */}
              <BarakaAICard />

              {/* Quick Practice Button */}
              <div
                onClick={() => navigate("/quick-practice")}
                className="bg-gradient-to-r from-purple-700 to-pink-800 ring ring-purple-700 rounded-2xl p-4 sm:p-6 hover:ring-2 transition-all duration-300 cursor-pointer transform hover:scale-104 lg:hover:scale-102"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Play className="w-6 h-6 lg:w-8 lg:h-8" />
                  <span className="text-lg lg:text-xl font-semibold">
                    Random Quiz
                  </span>
                </div>
                <p className="text-center text-purple-100 text-sm lg:text-base mt-2">
                  Start a random quiz now!
                </p>
              </div>
            </div>

            {/* Right Column - Topics and Achievements */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              {/* Topics Grid */}
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Learn Topics
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
                  {topics.map((topic, index) => (
                    <div
                      onClick={() => navigate(topic.to)}
                      key={index}
                      className="bg-black/20 backdrop-blur-xl border border-purple-800 rounded-xl p-3 lg:p-4"
                    >
                      <div className="text-2xl lg:text-3xl mb-2">
                        {topic.icon}
                      </div>

                      {/* Score Display  */}
                      {/* <p className="absolute p-1 top-2 right-2 text-gray-200  rounded-lg ring ring-purple-700/70">
                        Score: <span className="font-semibold text-b">{topic.score}%</span>
                      </p> */}

                      <h4 className="font-semibold text-purple-200 mb-1 text-sm lg:text-base">
                        {topic.name}
                      </h4>
                      <p className="text-xs lg:text-sm text-purple-300 mb-3">
                        {topic.about}
                      </p>

                      <div className="bg-slate-600/50 rounded-full h-2 lg:h-3 mb-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 lg:h-3 rounded-full transition-all duration-500"
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs lg:text-sm text-purple-300">
                        {topic.progress}% complete
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                {/* <div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Achievements
                </h3>
                <div className="grid grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3 lg:gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`bg-slate-700/30 backdrop-blur-sm border rounded-xl p-3 lg:p-4 text-center transition-all duration-300 ${
                        achievement.earned
                          ? "border-purple-500/40 hover:scale-110 lg:hover:scale-105"
                          : "border-slate-600/20 opacity-50"
                      }`}
                    >
                      <div className="text-2xl lg:text-3xl mb-1">
                        {achievement.icon}
                      </div>
                      <p className="text-xs lg:text-sm text-purple-200 font-medium">
                        {achievement.name}
                      </p>
                      {achievement.earned && (
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
