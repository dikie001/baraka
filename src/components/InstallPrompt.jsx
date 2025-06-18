import { useEffect, useState } from "react";
import { MdInstallMobile } from "react-icons/md";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const alreadyHandled = localStorage.getItem("installPromptHandled");

    const handleBeforeInstallPrompt = (e) => {
      if (alreadyHandled) return; // Don't show again if handled

      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("✅ Installed!");
      } else {
        console.log("❌ Dismissed");
      }

      // Save to localStorage so we don't show it again
      localStorage.setItem("installPromptHandled", "true");

      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-slate-950 to-purple-950 text-white p-5 rounded-xl shadow-lg border border-purple-500">
      <p className="mb-3 text-sm">🚀 Install this app for offline access</p>
      <button
        onClick={handleInstallClick}
        className="flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:scale-105 transition-transform"
      ><MdInstallMobile size={20} className="text-cyan-300 animate-bounce"/>
       Install App
      </button>
    </div>
  );
};

export default InstallPrompt;
