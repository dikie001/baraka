import React, { useMemo } from "react";
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

// Memoized icon components to prevent re-renders
const MemoizedIcons = {
  Star: React.memo(() => <Star className="w-6 h-6" />),
  Calculator: React.memo(() => <Calculator className="w-6 h-6" />),
  BarChart3: React.memo(() => <BarChart3 className="w-6 h-6" />),
  Target: React.memo(() => <Target className="w-6 h-6" />),
  Trophy: React.memo(() => <Trophy className="w-6 h-6" />),
  Zap: React.memo(() => <Zap className="w-6 h-6" />),
  Award: React.memo(() => <Award className="w-6 h-6" />),
  CheckCircle: React.memo(() => <CheckCircle className="w-6 h-6" />),
};

// Constants to avoid recreation on each render
const TOPIC_COLORS = {
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

const TOPICS = [
  "Numbers",
  "Probability",
  "Measurement",
  "Data & Statistics",
  "Geometry",
  "Algebra",
];

// Helper function to safely get localStorage value as number
const getStorageNumber = (key, fallback = 0) => {
  const value = localStorage.getItem(key);
  return value ? Number(value) : fallback;
};

// Helper function to calculate percentage safely
const calculatePercentage = (current, total) => {
  return total > 0 ? Math.round((current / total) * 100) : 0;
};

// Memoized achievement card component
const AchievementCard = React.memo(({ achievement, topicColor }) => (
  <div
    className={`backdrop-blur-xl border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
      achievement.unlocked
        ? "bg-white/5 border-white/30 hover:bg-white/20"
        : "bg-black/20 border-white/10 opacity-75 hover:opacity-90"
    }`}
  >
    <div className="flex items-start space-x-4">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          achievement.unlocked
            ? `bg-gradient-to-r ${topicColor} text-white shadow-lg`
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
                achievement.unlocked ? "text-purple-200" : "text-gray-400"
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
                className={`bg-gradient-to-r ${topicColor} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
));

// Memoized topic summary card
const TopicSummaryCard = React.memo(({ topic, percentage }) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-xl p-3">
    <div className="text-white font-medium text-sm">{topic}</div>
    <div className="text-purple-200 text-xs mt-1">{percentage}% Complete</div>
  </div>
));

export default function AchievementsPage() {
  // Memoize all localStorage operations and calculations
  const gameData = useMemo(() => {
    // Get scores
    const globalPercentage = getStorageNumber("global-percentage");
    const geometryPoints = getStorageNumber("geometry-quiz-points");
    const algebraPoints = getStorageNumber("algebra-quiz-points");
    const measurementsPoints = getStorageNumber("measurement-quiz-points");

    // Get progress data
    const numbersData = {
      progress: getStorageNumber("current-number"),
      total: getStorageNumber("numbers-quiz-length"),
    };

    const algebraData = {
      progress: getStorageNumber("current-number-algebra"),
      total: getStorageNumber("algebra-quiz-length"),
    };

    const geometryData = {
      progress: getStorageNumber("current-number-geometry"),
      total: getStorageNumber("geometry-quiz-length"),
    };

    const measurementData = {
      progress: getStorageNumber("current-number-measurement"),
      total: getStorageNumber("measurement-quiz-length"),
    };

    const probabilityData = {
      progress: getStorageNumber("probability-current-number"),
      total: getStorageNumber("probability-quiz-length"),
    };

    const dataData = {
      progress: getStorageNumber("data-current-number"),
      total: getStorageNumber("data-quiz-length"),
    };

    // Calculate percentages
    const percentages = {
      numbers: calculatePercentage(numbersData.progress, numbersData.total),
      algebra: calculatePercentage(algebraData.progress, algebraData.total),
      geometry: calculatePercentage(geometryData.progress, geometryData.total),
      measurement: calculatePercentage(
        measurementData.progress,
        measurementData.total
      ),
      probability: calculatePercentage(
        probabilityData.progress,
        probabilityData.total
      ),
      data: calculatePercentage(dataData.progress, dataData.total),
    };

    return {
      globalPercentage,
      geometryPoints,
      algebraPoints,
      measurementsPoints,
      percentages,
      rawData: {
        numbers: numbersData,
        algebra: algebraData,
        geometry: geometryData,
        measurement: measurementData,
        probability: probabilityData,
        data: dataData,
      },
    };
  }, []); // Empty dependency array since localStorage is synchronous

  // Memoize achievements array
  const achievements = useMemo(() => {
    const {
      percentages,
      geometryPoints,
      algebraPoints,
      measurementsPoints,
      globalPercentage,
      rawData,
    } = gameData;

    return [
      {
        id: 1,
        title: "Math Explorer",
        description: "Start your first topical quiz",
        icon: <MemoizedIcons.Star />,
        unlocked: rawData.numbers.progress > 0,
        progress: percentages.numbers,
      },
      {
        id: 2,
        title: "Numbers Navigator",
        description: "Complete 50% of the Numbers topic quiz",
        icon: <MemoizedIcons.Calculator />,
        unlocked: percentages.numbers >= 50,
        progress: Math.min(100, Math.round((percentages.numbers / 50) * 100)),
      },
      {
        id: 3,
        title: "Data Detective",
        description: "Complete 75% of Data & Statistics quiz",
        icon: <MemoizedIcons.BarChart3 />,
        unlocked: percentages.data >= 75,
        progress: Math.min(100, Math.round((percentages.data / 75) * 100)),
      },
      {
        id: 4,
        title: "Probability Pro",
        description: "Finish the entire Probability topic quiz",
        icon: <MemoizedIcons.Target />,
        unlocked: percentages.probability === 100,
        progress: percentages.probability,
      },
      {
        id: 5,
        title: "Geometry Genius",
        description: "Score above 85% on Geometry topic",
        icon: <MemoizedIcons.Trophy />,
        unlocked: geometryPoints > 85,
        progress: Math.min(100, Math.round((percentages.geometry / 85) * 100)),
      },
      {
        id: 6,
        title: "Algebra Ace",
        description: "score above 70% on algebra",
        icon: <MemoizedIcons.Zap />,
        unlocked: algebraPoints > 70,
        progress: Math.min(100, Math.round((percentages.algebra / 70) * 100)),
      },
      {
        id: 7,
        title: "Measurement Master",
        description: "Perfect score on Measurement topic",
        icon: <MemoizedIcons.Award />,
        unlocked: measurementsPoints === 100,
        progress: percentages.measurement,
      },
      {
        id: 8,
        title: "Triple Threat",
        description: "Complete 3 different topic quizzes",
        icon: <MemoizedIcons.CheckCircle />,
        unlocked: false, // This logic wasn't implemented in original
        progress: 0,
      },
      {
        id: 9,
        title: "Math Champion",
        description: "Complete all 6 topical quizzes",
        icon: <MemoizedIcons.Trophy />,
        unlocked:
          rawData.numbers.total === rawData.numbers.progress &&
          rawData.algebra.progress === rawData.algebra.total &&
          rawData.geometry.progress === rawData.geometry.total &&
          rawData.measurement.progress === rawData.measurement.total &&
          rawData.probability.progress === rawData.probability.total &&
          rawData.data.progress === rawData.data.total,
        progress: globalPercentage || 0,
      },
    ];
  }, [gameData]);

  // Memoize topic percentages array for display
  const topicPercentages = useMemo(
    () => [
      gameData.percentages.numbers,
      gameData.percentages.probability,
      gameData.percentages.measurement,
      gameData.percentages.data,
      gameData.percentages.geometry,
      gameData.percentages.algebra,
    ],
    [gameData.percentages]
  );

  return (
    <div className=" p-4">
      <div className="max-w-4xl mx-auto mb-20 pt-8">
        <BottomNav />

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Math Achievements
          </h1>
          <p className="text-purple-100">
            Track your progress across all math topics
          </p>

          {/* Progress Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {TOPICS.map((topic, index) => (
              <TopicSummaryCard
                key={topic}
                topic={topic}
                percentage={topicPercentages[index]}
              />
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              topicColor={TOPIC_COLORS[achievement.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
