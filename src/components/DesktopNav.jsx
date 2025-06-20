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
      <div className="hidden  m-auto  z-54 lg:block    ">
        <div className="flex   justify-center space-y-4">
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
            <button
              key={index}
              onClick={() => setActiveTab(item.id)}
              className={`group flex flex-col px-10 py-1 items-center  rounded-xl transition-all duration-300 relative ${
                activeTab === item.id
                  ? "text-pink-400"
                  : "text-slate-400 hover:text-purple-300 hover:bg-slate-700/30"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <Link to={item.to} className="text-xs font-medium">{item.label}</Link>
              {/* Tooltip
              <div className="absolute  left-full ml-3 px-2 py-1 bg-slate-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                <Link to={item.to}>{item.label}</Link>
              </div> */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
