import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react';

const features = [
  {
    title: '🤖 Baraka AI',
    desc: 'Your built-in genius assistant — ready to help you study smarter.',
  },
  {
    title: '📘 Multiple Choice Quizzes',
    desc: 'Test yourself with fun, challenging and randomized questions.',
  },
  {
    title: '🧠 Revision Notes',
    desc: 'Well-structured, bite-sized notes to help you understand fast.',
  },
  {
    title: '🏆 Achievements',
    desc: 'Unlock cool badges as you level up your brain power.',
  },
  {
    title: '📊 Smart Dashboard',
    desc: 'See your growth, scores, and streaks at a glance.',
  },
  {
    title: '📶 Offline Mode',
    desc: 'Learn anywhere — no internet, no problem.',
  },
  {
    title: '🌍 OTA Updates',
    desc: 'Get latest content and features without reinstalling the app.',
  },
  {
    title: '🎯 Progress Tracking',
    desc: "Track every quiz, note, and win. You're in control.",
  },
];

export default function WelcomePage() {

    const [firstTime, setFirstTime]=useLocalStorage("first-time")
    const OpenApp=()=>{
        setFirstTime(false)
        window.location.href = '/'

    }
  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Karibu kwa <span className="text-pink-500">Quizzy</span> 🎉
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            The ultimate Grade 9 companion — smart, stylish, and made just for you.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm shadow-md shadow-black/50 rounded-lg p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2">{feat.title}</h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            className="px-8 py-3 shadow-black/40 bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
            onClick={OpenApp}
          >
            Let's Go 🚀
          </button>
        </div>
      </div>
    </div>
  );
}