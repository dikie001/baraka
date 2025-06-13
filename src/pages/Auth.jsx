import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Star,
  Calculator,
  Trophy,
  BookOpen,
  Sparkles,
  Delete,
} from "lucide-react";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const pinInputRefs = useRef([]);
  const usernameRef = useRef(null);

  // Handle PIN input
  const handlePinInput = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newPin = pin.split("");
    newPin[index] = value;
    const updatedPin = newPin.join("").slice(0, 4);
    setPin(updatedPin);
    setPinError(false);

    // Auto-focus next input
    if (value && index < 3) {
      pinInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle PIN backspace
  const handlePinKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle number pad input
  const handleNumberPad = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setPinError(false);
    }
  };

  // Handle backspace from number pad
  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setPinError(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!username.trim()) {
      usernameRef.current?.focus();
      return;
    }
    if (pin.length !== 4) {
      setPinError(true);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Here you would typically handle authentication
    console.log("Login attempt:", { username, pin });
  };

  // Auto-submit when PIN is complete
  useEffect(() => {
    if (pin.length === 4 && username.trim()) {
      handleSubmit();
    }
  }, [pin, username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-pink-600/10 rounded-full blur-xl animate-pulse delay-700"></div>

        {/* Floating math symbols */}
        <div className="absolute top-20 left-20 text-purple-400/20 text-4xl animate-bounce delay-300">
          ➕
        </div>
        <div className="absolute top-40 right-32 text-pink-400/20 text-3xl animate-bounce delay-700">
          ✖️
        </div>
        <div className="absolute bottom-32 left-16 text-purple-400/20 text-5xl animate-bounce delay-500">
          ➗
        </div>
        <div className="absolute bottom-20 right-20 text-pink-400/20 text-4xl animate-bounce delay-900">
          ➖
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="p-6 lg:p-8 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border-b border-purple-500/20 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 lg:p-5 rounded-2xl">
                <Calculator className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome Back!
            </h1>
            <p className="text-purple-200 text-sm lg:text-base">
              Enter your details to continue learning
            </p>

            {/* Fun stats */}
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-1 text-purple-300">
                <Star className="w-4 h-4" />
                <span className="text-xs lg:text-sm">12K Students</span>
              </div>
              <div className="flex items-center space-x-1 text-pink-300">
                <Trophy className="w-4 h-4" />
                <span className="text-xs lg:text-sm">1M+ Problems Solved</span>
              </div>
            </div>
          </div>

          {/* Auth Form */}
          <div className="p-6 lg:p-8">
            <div className="space-y-6 lg:space-y-8">
              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-sm lg:text-base font-medium text-purple-200 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Username</span>
                </label>
                <div
                  className={`relative transition-all duration-300 ${
                    focusedInput === "username" ? "transform scale-[1.02]" : ""
                  }`}
                >
                  <input
                    ref={usernameRef}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedInput("username")}
                    onBlur={() => setFocusedInput("")}
                    className="w-full bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-xl px-4 py-3 lg:py-4 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  {focusedInput === "username" && (
                    <div className="absolute -right-2 -top-2">
                      <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* PIN Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm lg:text-base font-medium text-purple-200 flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>4-Digit PIN</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    {showPin ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* PIN Input Fields */}
                <div className="flex justify-center space-x-3 lg:space-x-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`relative transition-all duration-300 ${
                        focusedInput === `pin-${index}`
                          ? "transform scale-110"
                          : ""
                      } ${pinError ? "animate-shake" : ""}`}
                    >
                      <input
                        ref={(el) => (pinInputRefs.current[index] = el)}
                        type={showPin ? "text" : "password"}
                        value={pin[index] || ""}
                        onChange={(e) => handlePinInput(e.target.value, index)}
                        onKeyDown={(e) => handlePinKeyDown(e, index)}
                        onFocus={() => setFocusedInput(`pin-${index}`)}
                        onBlur={() => setFocusedInput("")}
                        className={`w-12 h-12 lg:w-14 lg:h-14 bg-slate-700/30 backdrop-blur-sm border rounded-xl text-center text-xl lg:text-2xl font-bold text-white focus:outline-none transition-all duration-300 ${
                          pinError
                            ? "border-red-500/60 bg-red-500/10"
                            : pin[index]
                            ? "border-purple-500/60 bg-purple-500/10"
                            : "border-purple-500/20"
                        } ${
                          focusedInput === `pin-${index}`
                            ? "ring-2 ring-purple-500/40 border-purple-500/80"
                            : ""
                        }`}
                        maxLength={1}
                      />
                      {pin[index] && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>

                {pinError && (
                  <p className="text-red-400 text-sm text-center animate-fade-in">
                    Please enter a complete 4-digit PIN
                  </p>
                )}
              </div>

              {/* Virtual Number Pad */}
              <div className="lg:hidden">
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleNumberPad(num.toString())}
                      className="bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-xl h-12 text-lg font-semibold text-white hover:bg-slate-700/50 hover:border-purple-500/40 transition-all duration-200 active:scale-95"
                    >
                      {num}
                    </button>
                  ))}
                  <div></div>
                  <button
                    type="button"
                    onClick={() => handleNumberPad("0")}
                    className="bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-xl h-12 text-lg font-semibold text-white hover:bg-slate-700/50 hover:border-purple-500/40 transition-all duration-200 active:scale-95"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={handleBackspace}
                    className="bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-xl h-12 flex items-center justify-center text-white hover:bg-slate-700/50 hover:border-purple-500/40 transition-all duration-200 active:scale-95"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !username.trim() || pin.length !== 4}
                className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 lg:py-4 font-semibold text-lg lg:text-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isLoading || !username.trim() || pin.length !== 4
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-purple-500 hover:to-pink-500 transform hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Start Learning</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 lg:mt-8 text-center">
              <p className="text-purple-300/70 text-sm">
                Ready to solve amazing math problems? 🚀
              </p>
              <div className="flex justify-center space-x-2 mt-2">
                {[BookOpen, Calculator, Trophy].map((Icon, index) => (
                  <Icon
                    key={index}
                    className="w-4 h-4 text-purple-400/50 animate-pulse"
                    style={{ animationDelay: `${index * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `,
        }}
      />
    </div>
  );
}
