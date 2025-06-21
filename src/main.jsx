import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { registerSW } from "virtual:pwa-register";

// Register service worker with logs
registerSW({
  onNeedRefresh() {
    console.log("🌀 Service Worker: New content available, refresh needed!");
  },
  onOfflineReady() {
    console.log("✅ Service Worker: App is ready to work offline!");
  },
  onRegistered(r) {
    console.log("🔧 Service Worker registered:", r);
  },
  onRegisterError(error) {
    console.error("❌ Service Worker registration error:", error);
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// import { registerSW } from "virtual:pwa-register";
// registerSW();

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
