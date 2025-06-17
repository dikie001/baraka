import React from "react";
import {
  Calculator,
  FunctionSquare,
  Triangle,
  Scale,
  BarChart2,
  Dices,
  ChevronRight,
} from "lucide-react";
import BottomNav from "../components/MobileNav";

export default function Quizes() {
  // Mock progress data - replace with your actual state variables
  const NP = 25,
    NTQ = 50,
    AP = 30,
    ATQ = 40,
    GP = 15,
    GTQ = 35;
  const MP = 20,
    MTQ = 30,
    DP = 40,
    DTQ = 60,
    PP = 10,
    PTQ = 25;

  const topics = [
    {
      name: "Numbers",
      icon: <Calculator />,
      progress: NP || (NTQ && ((NP / NTQ) * 100).toFixed(0)) || 0,
      to: "/numbers",
      about: "Build math foundation",
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
      about: "Learn spatial reasoning",
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
      icon: <BarChart2 />,
      progress: DTQ ? ((DP / DTQ) * 100).toFixed(0) : 0,
      to: "/data",
      about: "Interpret data",
    },
    {
      name: "Probability",
      icon: <Dices />,
      progress: PTQ ? ((PP / PTQ) * 100).toFixed(0) : 0,
      to: "/probability",
      about: "Predict with reasoning",
    },
  ];

  const handleTopicClick = (to) => {
    console.log(`Navigate to ${to}`);
    // Add your navigation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-800 p-4">
      <BottomNav/>
      <div className="max-w-4xl mx-auto pt-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold  mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Math Topics
          </h1>
          <p className="text-purple-100">Choose a topic to start learning</p>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              onClick={() => handleTopicClick(topic.to)}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/15 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white">
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {topic.name}
                    </h3>
                    <p className="text-purple-200 text-sm">{topic.about}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-200 text-sm">Progress</span>
                  <span className="text-white text-sm font-medium">
                    {topic.progress}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
