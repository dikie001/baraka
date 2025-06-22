// hooks/useAppReady.js
import { useState, useEffect } from "react";

const useAppReady = () => {
  const [isReady, setIsReady] = useState(false);


    const cached = localStorage.getItem("quizzyReady");
    if (cached === "true") {
      setIsReady(true);
      return;
    }

    // Wait for the service worker to be ready
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        localStorage.setItem("quizzyReady", "true");
        setIsReady(true);
      });
    } else {
      setIsReady(true); // fallback
    }


  return isReady;
};

export default useAppReady;
