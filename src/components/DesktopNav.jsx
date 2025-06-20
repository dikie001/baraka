import { Calculator, Menu, X } from "lucide-react";
import { Star } from "lucide-react";
import { Trophy } from "lucide-react";
import { BookOpen } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: BookOpen, label: "Learn", id: "home", to: "/" },
    { icon: Calculator, label: "Practice", id: "practice", to: "/practice" },
    {
      icon: Trophy,
      label: "Achievements",
      id: "achievements",
      to: "/achievements",
    },
    { icon: Star, label: "Profile", id: "profile", to: "/profile" },
  ];

  return (
    <div>
      {/* Desktop Navigation - Only visible on large screens */}
      <div className="hidden lg:block fixed left-6 xl:left-8 2xl:left-10 top-1/2 transform -translate-y-1/2 z-50">
        {/* Collapsed State - Menu Button */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="group bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 hover:from-purple-500 hover:via-purple-600 hover:to-pink-500 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-4 xl:p-5 2xl:p-6 shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/40"
          >
            <Menu className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-white drop-shadow-sm" />

            {/* Tooltip for collapsed state */}
            <div className="absolute left-full ml-4 xl:ml-5 2xl:ml-6 px-3 xl:px-4 py-2 xl:py-3 bg-gradient-to-r from-slate-800 to-purple-900 border border-purple-500/30 text-white text-sm xl:text-base 2xl:text-lg rounded-lg xl:rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl shadow-purple-500/20 transform translate-x-2 group-hover:translate-x-0">
              <span className="font-medium">Navigation Menu</span>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 border-l border-t border-purple-500/30 rotate-45" />
            </div>

            {/* Pulsing indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-75" />
          </button>
        )}

        {/* Expanded State - Full Menu */}
        {isExpanded && (
          <div className="bg-gradient-to-b from-slate-800/95 via-slate-900/95 to-purple-900/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl xl:rounded-3xl p-4 xl:p-5 2xl:p-6 shadow-2xl shadow-purple-500/20 animate-in slide-in-from-left-5 duration-300">
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4 xl:mb-5 2xl:mb-6 pb-3 xl:pb-4 border-b border-purple-500/20">
              <h3 className="text-purple-200 font-semibold text-sm xl:text-base 2xl:text-lg">
                Navigation
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-purple-300 transition-colors duration-200 p-1 hover:bg-slate-700/30 rounded-lg"
              >
                <X className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col space-y-2 xl:space-y-3 2xl:space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsExpanded(false); // Close menu after navigation
                  }}
                  className={`group flex items-center space-x-3 xl:space-x-4 2xl:space-x-5 p-3 xl:p-4 2xl:p-5 rounded-xl xl:rounded-2xl transition-all duration-300 relative ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-purple-600/40 via-purple-500/30 to-pink-600/40 text-purple-200 shadow-lg shadow-purple-500/20 transform scale-[1.02]"
                      : "text-slate-400 hover:text-purple-300 hover:bg-gradient-to-r hover:from-slate-700/40 hover:to-purple-800/20 hover:shadow-md hover:shadow-purple-500/10 hover:transform hover:scale-[1.01]"
                  }`}
                >
                  {/* Active indicator */}
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 xl:h-8 2xl:h-10 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-400/50" />
                  )}

                  <item.icon
                    className={`transition-all duration-300 flex-shrink-0 ${
                      activeTab === item.id
                        ? "w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-purple-200 drop-shadow-sm"
                        : "w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 group-hover:text-purple-300 group-hover:scale-110"
                    }`}
                  />

                  <span
                    className={`font-medium transition-all duration-300 text-sm xl:text-base 2xl:text-lg ${
                      activeTab === item.id
                        ? "text-purple-200 font-semibold"
                        : "group-hover:text-purple-300"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Arrow indicator for active item */}
                  {activeTab === item.id && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Footer decoration */}
            <div className="mt-4 xl:mt-5 2xl:mt-6 pt-3 xl:pt-4 border-t border-purple-500/20 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 animate-pulse" />
                <div
                  className="w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
