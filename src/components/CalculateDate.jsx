import React, { useState, useEffect } from "react";
import { ChevronRight, X } from "lucide-react";

const CalculateDate = () => {
  const [time, setTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString();
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const monthNumber = new Date().getMonth() + 1;
  const monthDay = new Date().getDate();

  let month;
  // Allocating months
  switch (monthNumber) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
    default:
      month = "B.B";
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="absolute z-50 min-h-screen bg-gray-100">
      {/* Toggle Button - Fixed on right side */}
      <button
        onClick={toggleModal}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-purple-800 to-pink-800  text-white py-4 rounded-l-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 z-50 border border-purple-400/30 "
        aria-label="Toggle subpage"
      >
        <ChevronRight
          className={`w-6 h-6 transition-all duration-300 ${
            !isModalOpen ? "rotate-180 text-purple-200" : "text-white"
          }`}
        />
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed mb-15  inset-0 bg-black/40 bg-opacity-60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="bg-gradient-to-br from-purple-950 to-slate-900 rounded-2xl shadow-2xl border border-purple-500/20 max-w-lg w-full p-8 transform transition-all duration-500 scale-100 backdrop-blur-md relative overflow-hidden">
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

            {/* Close button */}
            <button
              onClick={toggleModal}
              className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
                Date & Time
              </h2>

              {/* Date and Time Display */}
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-purple-600/30 to-slate-600/30 backdrop-blur-sm rounded-xl p-6 text-white text-center border border-white/10 hover:border-white/20 transition-all duration-300">
                  <p className="text-sm font-medium mb-2 text-purple-200 uppercase tracking-wide">
                    Current Time
                  </p>
                  <p className="text-4xl font-bold text-white tracking-wider font-mono">
                    {time}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-slate-600/30 to-purple-600/30 backdrop-blur-sm rounded-xl p-6 text-white text-center border border-white/10 hover:border-white/20 transition-all duration-300">
                  <p className="text-sm font-medium mb-2 text-slate-200 uppercase tracking-wide">
                    Today's Date
                  </p>
                  <p className="text-4xl font-bold text-white tracking-wider">
                    {month} {monthDay}
                  </p>
                </div>

                {/* Additional content */}
                <div className="mt-5 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <h3 className="font-semibold text-white text-lg">
                      Empty Space
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                 Hello there, this is an empty space
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default CalculateDate;
