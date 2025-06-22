import { Loader } from "lucide-react";
import React from "react";

export const AppLoading = () => {
  return (
    <div className="flex-col font-medium animate-pulse text-gray-300 flex justify-center h-screen items-center">
      <Loader size={40} className="animate-spin mb-3 text-pink-400" />
      Loading...
    </div>
  );
};
