import { Calculator } from "lucide-react";
import { Star } from "lucide-react";
import { Trophy } from "lucide-react";
import { BookOpen } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DesktopNav = () => {
    const [activeTab,setActiveTab]=useState('')
  return (
    <div>
      {/* Desktop Sidebar Navigation - Only visible on large screens */}
      <div className="hidden m-auto top:1/2 left-4 z-54 lg:block fixed bottom-5 transform -translate-y-1/2 bg-slate-800/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4">
        <div className="flex flex-col  justify-center space-y-4">
          {[
            { icon: BookOpen, label: "Learn", id: "home", to: "/" },
            {
              icon: Calculator,
              label: "Practice",
              id: "practice",
              to: "/practice",
            },
            {
              icon: Trophy,
              label: "Achievements",
              id: "achievements",
              to: "/achievements",
            },
            { icon: Star, label: "Profile", id: "profile", to: "/profile" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.id)}
              className={`group flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300 relative ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300"
                  : "text-slate-400 hover:text-purple-300 hover:bg-slate-700/30"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-slate-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                <Link to={item.to}>{item.label}</Link>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
