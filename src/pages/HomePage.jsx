import { useLocalStorage } from "@uidotdev/usehooks";
import {
  BarChart2Icon,
  Calculator,
  Dices,
  FunctionSquare,
  Play,
  Scale,
  Triangle,
  Trophy,
} from "lucide-react";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BarakaAICard from "../components/BarakaAiCard";
import CalculateDate from "../components/CalculateDate";
import DesktopNav from "../components/DesktopNav";
import Menu from "../components/Menu";
import BottomNav from "../components/MobileNav";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [overalPoints, setOveralPoints] = useState(0);

  // Set Page
  const [page, setPage] = useLocalStorage("choose-page", null);
  const navigate = useNavigate();

  // Memoize localStorage reads to avoid repeated access
  const localStorageData = useMemo(() => {
    // Numbers Quiz LocalStorage
    const numbersProgress = localStorage.getItem("current-number");
    const numbersTotalQuiz = localStorage.getItem("numbers-quiz-length");
    const NTQ = Number(numbersTotalQuiz) || 0;
    const NP = Number(numbersProgress) || 0;

    // Algebra Quiz LocalStorage
    const algebraProgress = localStorage.getItem("current-number-algebra");
    const algebraTotalQuiz = localStorage.getItem("algebra-quiz-length");
    const AP = Number(algebraProgress) || 0;
    const ATQ = Number(algebraTotalQuiz) || 0;

    // Geometry Quiz LocalStorage
    const geometryProgress = localStorage.getItem("current-number-geometry");
    const geometryTotalQuiz = localStorage.getItem("geometry-quiz-length");
    const GP = Number(geometryProgress) || 0;
    const GTQ = Number(geometryTotalQuiz) || 0;

    // Measurement Quiz LocalStorage
    const measurementProgress = localStorage.getItem(
      "current-number-measurement"
    );
    const measurementTotalQuiz = localStorage.getItem(
      "measurement-quiz-length"
    );
    const MP = Number(measurementProgress) || 0;
    const MTQ = Number(measurementTotalQuiz) || 0;

    // Probability Quiz LocalStorage
    const probabilityProgress = localStorage.getItem(
      "probability-current-number"
    );
    const probabilityTotalQuiz = localStorage.getItem(
      "probability-quiz-length"
    );
    const PP = Number(probabilityProgress) || 0;
    const PTQ = Number(probabilityTotalQuiz) || 0;

    // Data Quiz LocalStorage
    const dataProgress = localStorage.getItem("data-current-number");
    const dataTotalQuiz = localStorage.getItem("data-quiz-length");
    const DP = Number(dataProgress) || 0;
    const DTQ = Number(dataTotalQuiz) || 0;

    // Quick Quiz LocalStorage
    const quickQuizTotal = localStorage.getItem("quick-quiz-length");
    const quickQuizProgress = localStorage.getItem(
      "quick-practice-current-number"
    );
    const QQT = Number(quickQuizTotal) || 0;
    const QP = Number(quickQuizProgress) || 0;

    // Get Quiz points for all quizes
    const algebraPoints =
      Number(localStorage.getItem("algebra-quiz-points")) || 0;
    const dataPoints = Number(localStorage.getItem("data-quiz-points")) || 0;
    const geometryPoints =
      Number(localStorage.getItem("geometry-quiz-points")) || 0;
    const measurementsPoints =
      Number(localStorage.getItem("measurements-quiz-points")) || 0;
    const numbersPoints =
      Number(localStorage.getItem("numbers-quiz-points")) || 0;
    const probabilityPoints =
      Number(localStorage.getItem("probability-quiz-points")) || 0;
    const quickQuizPoints =
      Number(localStorage.getItem("quick-practice-quiz-points")) || 0;

    return {
      NP,
      NTQ,
      AP,
      ATQ,
      GP,
      GTQ,
      MP,
      MTQ,
      PP,
      PTQ,
      DP,
      DTQ,
      QQT,
      QP,
      algebraPoints,
      dataPoints,
      geometryPoints,
      measurementsPoints,
      numbersPoints,
      probabilityPoints,
      quickQuizPoints,
    };
  }, []); // Empty dependency array - only calculate once on mount

  // Memoize topics array to prevent recreation on every render
  const topics = useMemo(() => {
    const { NP, NTQ, AP, ATQ, GP, GTQ, MP, MTQ, PP, PTQ, DP, DTQ } =
      localStorageData;

    return [
      {
        name: "Numbers",
        icon: <Calculator />,
        progress: NTQ ? Math.round((NP / NTQ) * 100) : 0,
        to: "/numbers",
        about: "Build math foundation ",
      },
      {
        name: "Algebra",
        icon: <FunctionSquare />,
        progress: ATQ ? Math.round((AP / ATQ) * 100) : 0,
        to: "/algebra",
        about: "Explore algebraic rules",
      },
      {
        name: "Geometry",
        icon: <Triangle />,
        progress: GTQ ? Math.round((GP / GTQ) * 100) : 0,
        to: "/geometry",
        about: "Learn spartial reasoning",
      },
      {
        name: "Measurement",
        icon: <Scale />,
        progress: MTQ ? Math.round((MP / MTQ) * 100) : 0,
        to: "/measurement",
        about: "Estimate and measure",
      },
      {
        name: "Data & Statistics",
        icon: <BarChart2Icon />,
        progress: DTQ ? Math.round((DP / DTQ) * 100) : 0,
        to: "/data",
        about: "Interprete data",
      },
      {
        name: "Probability",
        icon: <Dices />,
        progress: PTQ ? Math.round((PP / PTQ) * 100) : 0,
        to: "/probability",
        about: "Predict with reasoning",
      },
    ];
  }, [localStorageData]);

  // Memoize achievements array
  const achievements = useMemo(
    () => [
      { name: "Quick Solver", icon: "⚡", earned: true },
      { name: "Perfect Score", icon: "🎯", earned: true },
      { name: "Math Wizard", icon: "🧙‍♂️", earned: false },
      { name: "Champion", icon: "👑", earned: false },
    ],
    []
  );

  // Memoize total points calculation
  const totalPoints = useMemo(() => {
    const {
      algebraPoints,
      dataPoints,
      geometryPoints,
      measurementsPoints,
      numbersPoints,
      probabilityPoints,
      quickQuizPoints,
    } = localStorageData;

    return (
      algebraPoints +
      dataPoints +
      geometryPoints +
      measurementsPoints +
      numbersPoints +
      probabilityPoints +
      quickQuizPoints
    );
  }, [localStorageData]);

  // Optimize navigation handler with useCallback
  const handleQuickPracticeClick = useCallback(() => {
    navigate("/quick-practice");
  }, [navigate]);

  const handleTopicClick = useCallback(
    (to) => {
      navigate(to);
    },
    [navigate]
  );

  // Run on first render
  useEffect(() => {
    setPage("choosePage");
    setOveralPoints(totalPoints);
  }, [setPage, totalPoints]);


 
  return (
    <div className=" text-white overflow-hidden">
      <BottomNav />
      <DesktopNav />
      <CalculateDate />
      <Menu />
      <div className="relative z-10 w-full max-w-3xl mb-12 lg:max-w-4xl xl:max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-xl border  border-purple-500/20 shadow-2xl min-h-screen lg:rounded-3xl lg:my-8 lg:min-h-[calc(100vh-4rem)]">
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
                onClick={handleQuickPracticeClick}
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
                      onClick={() => handleTopicClick(topic.to)}
                      key={index}
                      className="bg-black/20 backdrop-blur-xl border border-purple-800 rounded-xl p-3 lg:p-4"
                    >
                      <div className="text-2xl lg:text-3xl mb-2">
                        {topic.icon}
                      </div>

                     

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

   
              <div>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
