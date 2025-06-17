import { Calculator } from "lucide-react";
import { Star } from "lucide-react";
import { Trophy } from "lucide-react";
import { BookOpen } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("");
  return (
    <div>
      {/* Bottom Navigation - Only visible on mobile/tablet */}
      <div className="fixed  z-60 bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gradient-to-r from-purple-950 to-slate-900  backdrop-blur-xl border-t border-purple-500/20 lg:hidden">
        <div className="flex justify-around py-3">
          {[
            { icon: BookOpen, label: "Learn", id: "home", to: "/" },
            {
              icon: Calculator,
              label: "Exams",
              id: "exams",
              to: "/exams-page",
            },
            {
              icon: Trophy,
              label: "Achievements",
              id: "achievements",
              to: "/achievements",
            },
            { icon: Star, label: "Profile", id: "profile", to: "/profile" },
          ].map((item, index) => (
            <Link
              to={item.to}
              key={index}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col active:ring-2 ring-purple-600 items-center space-y-1 p-0.5 rounded-lg transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300"
                  : "text-slate-400 hover:text-purple-300"
              }`}
            >
              <item.icon className="w-5 h-5" />

              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
