import { Phone } from "lucide-react";
import {
  Lightbulb,
  X,
  Bug,
  Menu,
  Home,
  BookOpen,
  Trophy,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuComponent = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuLinks = [
    {
      id: 1,
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      to: "/",
    },
    {
      id: 2,
      icon: <BookOpen className="w-5 h-5" />,
      label: "My Quizes",
      to: "/quizes",
    },
    {
      id: 3,
      icon: <Trophy className="w-5 h-5" />,
      label: "Achievements",
      to: "/achievements",
    },
    {
      id: 4,
      icon: <User className="w-5 h-5" />,
      label: "Profile",
      to: "/profile",
    },
    {
      id: 5,
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      to: "/settings",
    },

    {
      id: 6,
      icon: <Lightbulb className="w-5 h-5" />,
      label: "Request Feature",
      to: "/request-feature",
    },
    {
      id: 7,
      icon: <Bug className="w-5 h-5" />,
      label: "Report Bug",
      to: "/report-bug",
    },
    {
      id: 8,
      icon: <Phone className="w-5 h-5" />,
      label: "Contact Developer",
      to: "/contact",
    },
  ];



  return (
    <>
      {/* Toggle Button */}
      <button
        className="absolute z-55 left-2 top-7 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white "
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Menu Overlay */}
      {openMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-md"
          onClick={() => setOpenMenu(false)}
        >
          <div
            className="fixed  left-0 top-0 h-full w-80 bg-gradient-to-b from-purple-900/95 to-black/35 backdrop-blur-xl border-r border-white/10 p-6 transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Section */}
            <div className="flex flex-col items-center mt-16 mb-6">
              <img
                src="/icon.png"
                alt="Baraka's Learning App"
                className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl ring-2 ring-purple-400/50 mb-3"
              />
              <h2 className="text-white font-bold text-lg">Welcome, Baraka!</h2>
              <p className="text-gray-400 text-sm">Keep learning and growing</p>
            </div>

            {/* Menu Links */}
            <nav className="space-y-1 gap-2 grid grid-cols-2 ">
              {menuLinks.map((item) => (
             
                  <Link
                    key={item.id}
                    to={item.to}
                    className="flex items-center gap-2 p-3 h-20 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-700 hover:border-purple-400/30 text-white transition-all duration-200 group w-full text-left"
                  >
                    <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="mt-2  mb-13">
              <div className="text-center text-gray-300 text-xs">
                <p>Version 1.0.0</p>
                <p className="mt-1">Powered by dikie.dev</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuComponent;
