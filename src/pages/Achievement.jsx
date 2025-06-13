import { Trophy, Star, Medal } from "lucide-react";
import BottomNav from "../components/MobileNav";

const achievements = [
  {
    id: 1,
    title: "Math Genius",
    description: "Completed all Grade 9 Math topics",
    icon: <Trophy className="text-yellow-400 w-6 h-6" />,
  },
  {
    id: 2,
    title: "Daily Streak",
    description: "Logged in 7 days in a row",
    icon: <Star className="text-purple-500 w-6 h-6" />,
  },
  {
    id: 3,
    title: "Quick Solver",
    description: "Solved 50 questions under 1 min",
    icon: <Medal className="text-green-500 w-6 h-6" />,
  },
];

const AchievementsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <BottomNav />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://api.dicebear.com/6.x/bottts/svg?seed=Student"
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-2xl font-bold">Hey, Junior Genius 👋</h1>
            <p className="text-sm text-gray-400">Keep slaying those topics!</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">🎉 Your Achievements</h2>
        <div className="grid gap-4">
          {achievements.map((achieve) => (
            <div
              key={achieve.id}
              className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl shadow hover:bg-gray-700 transition"
            >
              {achieve.icon}
              <div>
                <h3 className="text-lg font-medium">{achieve.title}</h3>
                <p className="text-sm text-gray-400">{achieve.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">🔥 Progress</h2>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div className="bg-green-500 h-4 w-[65%] transition-all duration-500"></div>
          </div>
          <p className="text-sm mt-1 text-right text-gray-300">
            65% done with Grade 9 🔥
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
