import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useLocalStorage } from "@uidotdev/usehooks";

import useAppReady from "./hooks/useAppReady";
import { AppLoading } from "./components/AppLoading";

// Lazy-loaded pages/components

const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const InstallPrompt = lazy(() => import("./components/InstallPrompt"));
const BarakaAI = lazy(() => import("./ai/BarakaAi"));
const DailyChallenge = lazy(() => import("./dailyChallenge/DailyChallenge"));
const ExamsPage = lazy(() => import("./exams/ExamsPage"));
const QuickPractice = lazy(() => import("./quickPractice/QuickPractice"));

const BarakaMathApp = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const Quizes = lazy(() => import("./pages/Quizes"));
const Settings = lazy(() => import("./pages/Settings"));
const ContactPage = lazy(() => import("./pages/Contact"));
const Achievements = lazy(() => import("./pages/Achievements"));
const ReportBug = lazy(() => import("./pages/ReportBug"));
const RequestFeature = lazy(() => import("./pages/RequestFeature"));

const Algebra = lazy(() => import("./topics/algebra/Algebra"));
const Numbers = lazy(() => import("./topics/numbers/Numbers"));
const NumbersQuiz = lazy(() => import("./topics/numbers/NumbersQuiz"));
const Geometry = lazy(() => import("./topics/geometry/Geometry"));
const Probability = lazy(() => import("./topics/probability/Probability"));
const Data = lazy(() => import("./topics/data/Data"));
const Measurement = lazy(() => import("./topics/measurement/Measurement"));

// Reusable suspense fallback
const SuspenseFallback = () => (
  <div className="flex-col font-medium animate-pulse text-gray-300 flex justify-center h-screen items-center">
    <Loader size={40} className="animate-spin mb-3 text-pink-400" />
    Loading...
  </div>
);

const App = () => {
  const [page, setPage] = useLocalStorage("choose-page", "choosePage");
  const [firstTime, setFirstTime] = useState(null);
  const isAppReady = useAppReady();

  useEffect(() => {
    setPage("choosePage");

    // Check if this is the first time the user has opened the app
    const stored = localStorage.getItem("first-time");
    if (stored === null) {
      localStorage.setItem("first-time", "true");
      setFirstTime(true);
    } else {
      setFirstTime(false);
    }
  }, []);

  // Show splash loading until useAppReady() returns true
  if (!isAppReady) return <AppLoading />;

  // First-time welcome screen
  if (firstTime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900">
        <Suspense fallback={<SuspenseFallback />}>
          <WelcomePage />
        </Suspense>
      </div>
    );
  }

  // Main app
  return (
    <div className="scroll-smooth min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900">
      <Router>
        <Toaster />
        <InstallPrompt />
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            {/* Pages */}
            <Route path="/" element={<BarakaMathApp />} />
            <Route path="/auth-page" element={<AuthPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quizes" element={<Quizes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/achievements" element={<Achievements />} />

            {/* Math Topics */}
            <Route path="/numbers" element={<Numbers />} />
            <Route path="/numbers-quiz" element={<NumbersQuiz />} />
            <Route path="/algebra" element={<Algebra />} />
            <Route path="/geometry" element={<Geometry />} />
            <Route path="/probability" element={<Probability />} />
            <Route path="/data" element={<Data />} />
            <Route path="/measurement" element={<Measurement />} />

            {/* Features */}
            <Route path="/baraka-ai" element={<BarakaAI />} />
            <Route path="/daily-challenge" element={<DailyChallenge />} />
            <Route path="/quick-practice" element={<QuickPractice />} />
            <Route path="/exams-page" element={<ExamsPage />} />
            <Route path="/report-bug" element={<ReportBug />} />
            <Route path="/request-feature" element={<RequestFeature />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
