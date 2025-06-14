import React, { useState } from "react";
import {
  Play,
  Trophy,
  Star,
  BookOpen,
  Calculator,
  Target,
  ChevronRight,
} from "lucide-react";
import { FunctionSquare } from "lucide-react";
import { Ruler } from "lucide-react";
import { Triangle } from "lucide-react";
import { Scale } from "lucide-react";
import { PieChart } from "lucide-react";
import { BarChart2Icon } from "lucide-react";
import { Dice1 } from "lucide-react";
import { Dices } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import { useEffect } from "react";
import CalculateDate from "../components/CalculateDate";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const topics = [
    { name: "Numbers", icon: <Calculator />, progress: 85, to: "/numbers" },
    {
      name: "Algebra",
      icon: <FunctionSquare />,
      progress: 72,
      to: "/algebra",
    },
    {
      name: "Geometry",
      icon: <Triangle />,
      progress: 45,
      to: "/geometry",
    },
    {
      name: "Measurement",
      icon: <Scale />,
      progress: 30,
      to: "/measurement",
    },
    {
      name: "Data Handling",
      icon: <BarChart2Icon />,
      progress: 30,
      to: "/data-handling",
    },
    {
      name: "Probability",
      icon: <Dices />,
      progress: 30,
      to: "/probability",
    },
  ];

  const achievements = [
    { name: "Quick Solver", icon: "⚡", earned: true },
    { name: "Perfect Score", icon: "🎯", earned: true },
    { name: "Math Wizard", icon: "🧙‍♂️", earned: false },
    { name: "Champion", icon: "👑", earned: false },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        {/* Additional background elements for larger screens */}
        <div className="hidden lg:block absolute top-20 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="hidden lg:block absolute bottom-20 left-20 w-40 h-40 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-300"></div>
      </div>
      <BottomNav />
      <DesktopNav />
      <CalculateDate />

      <div className="relative z-10 w-full max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 shadow-2xl min-h-screen lg:rounded-3xl lg:my-8 lg:min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border-b border-purple-500/20 lg:rounded-t-3xl">
          <div className="flex mt-6 items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hi Baraka! 👋
              </h1>
              <p className="text-purple-200 text-sm lg:text-base mt-1">
                Ready to learn math?
              </p>
            </div>

            <div className="flex mt-1 items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 lg:p-3 rounded-full">
                <Trophy className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="text-xl lg:text-2xl font-bold">1,250</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-20 lg:pb-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
            {/* Left Column - Daily Challenge and Quick Practice */}
            <div className="lg:col-span-5 space-y-6">
              {/* Daily Challenge Card */}
              <div
                onClick={() => navigate("/daily-challenge")}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 sm:p-6 hover:scale-105 lg:hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-semibold text-purple-200">
                      Daily Challenge
                    </h3>
                    <p className="text-sm lg:text-base text-purple-300 mt-1">
                      Complete 10 problems
                    </p>
                    <div className="flex items-center mt-3 lg:mt-4">
                      <div className="bg-purple-500/30 rounded-full p-2 mr-3">
                        <Target className="w-4 h-4 lg:w-5 lg:h-5 text-purple-300" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-slate-700/50 rounded-full h-2 lg:h-3">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 lg:h-3 rounded-full w-3/4 transition-all duration-500"></div>
                        </div>
                        <p className="text-xs lg:text-sm text-purple-300 mt-1">
                          7/10 completed
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400 ml-4" />
                </div>
              </div>

              {/* Quick Practice Button */}
              <div
                onClick={() => navigate("/quick-practice")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 sm:p-6 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 cursor-pointer transform hover:scale-105 lg:hover:scale-102"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Play className="w-6 h-6 lg:w-8 lg:h-8" />
                  <span className="text-lg lg:text-xl font-semibold">
                    Quick Practice
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
                      className="bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-3 lg:p-4 hover:bg-slate-700/50 hover:scale-105 lg:hover:scale-102 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="text-2xl lg:text-3xl mb-2">
                        {topic.icon}
                      </div>
                      <h4 className="font-semibold text-purple-200 mb-1 text-sm lg:text-base">
                        {topic.name}
                      </h4>
                      <p className="text-xs lg:text-sm text-purple-300 mb-3">
                        {topic.to}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
