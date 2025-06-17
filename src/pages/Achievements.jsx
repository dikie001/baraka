import React from "react";
import {
  Trophy,
  Star,
  Target,
  Zap,
  BookOpen,
  Award,
  CheckCircle,
  Clock,
  BarChart3,
  Calculator,
} from "lucide-react";
import BottomNav from "../components/MobileNav";

export default function AchievementsPage() {
  // Achievements focused on long topical quizzes across different math areas
  const achievements = [
    {
      id: 1,
      title: "Math Explorer",
      description: "Start your first topical quiz",
      icon: <Star className="w-6 h-6" />,
      unlocked: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Numbers Navigator",
      description: "Complete 50% of the Numbers topic quiz",
      icon: <Calculator className="w-6 h-6" />,
      unlocked: true,
      progress: 100,
    },
    {
      id: 3,
      title: "Data Detective",
      description: "Complete 75% of Data & Statistics quiz",
      icon: <BarChart3 className="w-6 h-6" />,
      unlocked: false,
      progress: 45,
    },
    {
      id: 4,
      title: "Probability Pro",
      description: "Finish the entire Probability topic quiz",
      icon: <Target className="w-6 h-6" />,
      unlocked: false,
      progress: 80,
    },
    {
      id: 5,
      title: "Geometry Genius",
      description: "Score above 85% on Geometry topic",
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      progress: 30,
    },
    {
      id: 6,
      title: "Algebra Ace",
      description: "Complete Algebra quiz without hints",
      icon: <Zap className="w-6 h-6" />,
      unlocked: false,
      progress: 15,
    },
    {
      id: 7,
      title: "Measurement Master",
      description: "Perfect score on Measurement topic",
      icon: <Award className="w-6 h-6" />,
      unlocked: false,
      progress: 60,
    },
    {
      id: 8,
      title: "Triple Threat",
      description: "Complete 3 different topic quizzes",
      icon: <CheckCircle className="w-6 h-6" />,
      unlocked: false,
      progress: 66,
    },
    {
      id: 9,
      title: "Marathon Runner",
      description: "Spend 2+ hours on a single topic quiz",
      icon: <Clock className="w-6 h-6" />,
      unlocked: false,
      progress: 85,
    },
    {
      id: 10,
      title: "Math Champion",
      description: "Complete all 6 topical quizzes",
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      progress: 33,
    },
  ];

  const topicColors = {
    1: "from-blue-400 to-cyan-400",
    2: "from-green-400 to-emerald-400",
    3: "from-purple-400 to-violet-400",
    4: "from-orange-400 to-red-400",
    5: "from-pink-400 to-rose-400",
    6: "from-yellow-400 to-amber-400",
    7: "from-indigo-400 to-blue-400",
    8: "from-teal-400 to-cyan-400",
    9: "from-rose-400 to-pink-400",
    10: "from-amber-400 to-orange-400",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-800 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <BottomNav/>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold  mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Math Achievements
          </h1>
          <p className="text-purple-100">
            Track your progress across all math topics
          </p>

          {/* Progress Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              "Numbers",
              "Probability",
              "Measurement",
              "Data & Statistics",
              "Geometry",
              "Algebra",
            ].map((topic, index) => (
              <div
                key={topic}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-3"
              >
                <div className="text-white font-medium text-sm">{topic}</div>
                <div className="text-purple-200 text-xs mt-1">
                  {index === 0
                    ? "100%"
                    : index === 1
                    ? "80%"
                    : index === 2
                    ? "60%"
                    : index === 3
                    ? "45%"
                    : index === 4
                    ? "30%"
                    : "15%"}{" "}
                  Complete
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`backdrop-blur-xl border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
                achievement.unlocked
                  ? "bg-white/15 border-white/30 hover:bg-white/20"
                  : "bg-white/5 border-white/10 opacity-75 hover:opacity-90"
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    achievement.unlocked
                      ? `bg-gradient-to-r ${
                          topicColors[achievement.id]
                        } text-white shadow-lg`
                      : "bg-gray-600/50 text-gray-400"
                  }`}
                >
                  {achievement.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-lg ${
                          achievement.unlocked ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {achievement.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          achievement.unlocked
                            ? "text-purple-200"
                            : "text-gray-400"
                        }`}
                      >
                        {achievement.description}
                      </p>
                    </div>

                    {/* Status */}
                    {achievement.unlocked && (
                      <div className="text-green-400 font-medium text-sm ml-2 flex-shrink-0">
                        ✓ Unlocked
                      </div>
                    )}
                  </div>

                  {/* Progress Bar for locked achievements */}
                  {!achievement.unlocked && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-xs">Progress</span>
                        <span className="text-white text-xs font-medium">
                          {achievement.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${
                            topicColors[achievement.id]
                          } h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Progress */}
        <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Overall Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">2</div>
              <div className="text-purple-200 text-sm">
                Achievements Unlocked
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">8</div>
              <div className="text-purple-200 text-sm">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">45%</div>
              <div className="text-purple-200 text-sm">
                Average Topic Progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
