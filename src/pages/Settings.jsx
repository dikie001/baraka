import React from "react";
import { Settings, Plus } from "lucide-react";

export default function SettingsPage() {
  const handleRequestFeature = () => {
    window.location.href = "/request-feature";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-800 p-4">
      <div className="max-w-2xl mx-auto pt-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <Settings className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Settings
          </h1>

          <p className="text-purple-100 text-xl mb-10 leading-relaxed">
            What features would you like to see in the settings section?
          </p>

          <button
            onClick={handleRequestFeature}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 mx-auto shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transform"
          >
            <Plus className="w-5 h-5" />
            Request Feature
          </button>
        </div>
      </div>
    </div>
  );
}
