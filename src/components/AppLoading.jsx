import { Loader } from 'lucide-react'
import React from 'react'

export const AppLoading = () => {
  return (

        <div className="h-screen w-full bg-gradient-to-b from-slate-950 to-slate-900 text-white flex flex-col justify-center items-center px-4 text-center">
        <img
          src="/icon.png"
          alt="Quizzy Logo"
          className="w-20 mb-6 drop-shadow-lg animate-bounce"
        />

        <p className="text-2xl font-bold text-pink-400 animate-pulse mb-2">
          Loading Quizzy...
        </p>

        <Loader size={40} className="text-purple-400 animate-spin mb-4" />

        <p className="text-sm text-slate-400">
          Setting things up just for you...
        </p>
        <p className="text-sm text-slate-500">Please wait a few seconds ⏳</p>

        <div className="mt-4 text-xs text-slate-600 max-w-sm">
          <p>If this takes too long, try refreshing the app.</p>
          <p>
            If the issue persists, contact{" "}
            <span className="text-pink-400 underline">dikie.dev</span>.
          </p>
        </div>
      </div>
  )
}
