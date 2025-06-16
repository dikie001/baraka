import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Brain, 
  Sparkles, 
  Zap, 
  MessageCircle, 
  Rocket,
  Star,
  Activity,
  Gem,
  Shield,
  ChevronRight
} from "lucide-react";

export default function BarakaAICard() {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Generate floating particles
  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 15; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2
      });
    }
    setParticles(particleArray);
  }, []);

  // Update time for dynamic elements
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Create ripple effect on hover
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  const handleNavigation = () => {
    // Replace with your actual navigation logic
    console.log("Navigating to /baraka-ai");
    // navigate("/baraka-ai");
  };

  return (
    <div 
      className="relative group cursor-pointer w-full max-w-md mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigation}
      onMouseMove={createRipple}
    >
      {/* Animated Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
      
      {/* Secondary Glow Layer */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500"></div>

      {/* Main Card Container */}
      <div className="relative bg-black/70 backdrop-blur-2xl border border-purple-400/50 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 group-hover:shadow-purple-500/40 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-purple-300/70">
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-ping"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            ></div>
          ))}
        </div>

        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-4 h-4 bg-purple-400/30 rounded-full animate-ping"></div>
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500"></div>

        {/* Main Content */}
        <div className="relative p-6 sm:p-8">
          
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {/* AI Avatar with Pulse Animation */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-3 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/70 transition-all duration-300 group-hover:scale-110">
                    <Brain className="w-7 h-7 text-white drop-shadow-lg" />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-black shadow-lg animate-bounce">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm">
                    Baraka AI
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 animate-pulse" />
                      <span className="text-xs text-purple-300 font-medium">Elite Assistant</span>
                    </div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                      <Activity className="w-3 h-3 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-purple-100 mb-6 leading-relaxed font-medium text-base group-hover:text-white transition-colors duration-300">
                Get instant help with <span className="text-pink-400 font-semibold">explanations</span>, 
                <span className="text-purple-400 font-semibold"> study planning</span>, and 
                <span className="text-cyan-400 font-semibold"> personalized learning</span>
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-xl px-3 py-2 border border-purple-400/40 group-hover:border-purple-300/60 transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-1">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-purple-200 font-medium">Smart Tutoring</span>
                </div>

                <div className="flex items-center gap-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-sm rounded-xl px-3 py-2 border border-pink-400/40 group-hover:border-pink-300/60 transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg p-1">
                    <BookOpen className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-purple-200 font-medium">Study Plans</span>
                </div>

                <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-sm rounded-xl px-3 py-2 border border-cyan-400/40 group-hover:border-cyan-300/60 transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg p-1">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-purple-200 font-medium">Instant Help</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      99.9%
                    </div>
                    <div className="text-xs text-purple-300">Accuracy</div>
                  </div>
                  <div className="w-px h-8 bg-purple-400/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-xs text-purple-300">Available</div>
                  </div>
                  <div className="w-px h-8 bg-purple-400/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    
                    </div>
                    <div className="text-xs text-purple-300">Response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top-right Action Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation();
              }}
              className="relative bg-black/60 backdrop-blur-sm text-purple-300 text-sm font-semibold py-2 px-4 rounded-xl border border-purple-500/50 hover:border-purple-400/70 shadow-lg shadow-purple-900/30 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:bg-black/70 group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 group-hover/btn:via-purple-500/20 transition-all duration-300"></div>
              <div className="relative flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Chat Now</span>
                <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* Main CTA Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation();
            }}
            className={`w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:via-pink-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-purple-900/50 hover:shadow-purple-500/60 transition-all duration-500 hover:scale-[1.02] group/cta border border-purple-400/50 hover:border-purple-300/70 ${isHovered ? 'animate-pulse' : ''}`}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-white/10 to-purple-500/0 transform -skew-x-12 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-1000"></div>
            
            {/* Button content */}
            <div className="relative flex items-center justify-center gap-3">
              <Rocket className="w-5 h-5 group-hover/cta:animate-bounce" />
              <span className="text-lg">Start Chatting with Baraka AI</span>
              <Zap className="w-5 h-5 group-hover/cta:animate-pulse" />
            </div>
          </button>

          {/* Bottom Status Bar */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm text-green-400 font-medium">
                Ready to help you excel
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Gem className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-300">Powered by Advanced AI</span>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:subtract]"></div>
      </div>
    </div>
  );
}