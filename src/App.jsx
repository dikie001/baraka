import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useLocalStorage } from "@uidotdev/usehooks";

import useAppReady from "./hooks/useAppReady";
import { AppLoading } from "./components/AppLoading";

// Lazy-loaded pages/components
const lazyLoad = (path) => lazy(() => import(path));

const WelcomePage = lazyLoad("./pages/WelcomePage");
const InstallPrompt = lazyLoad("./components/InstallPrompt");
const BarakaAI = lazyLoad("./ai/BarakaAi");
const DailyChallenge = lazyLoad("./dailyChallenge/DailyChallenge");
const ExamsPage = lazyLoad("./exams/ExamsPage");
const QuickPractice = lazyLoad("./quickPractice/QuickPractice");

const BarakaMathApp = lazyLoad("./pages/HomePage");
const AuthPage = lazyLoad("./pages/Auth");
const Profile = lazyLoad("./pages/Profile");
const Quizes = lazyLoad("./pages/Quizes");
const Settings = lazyLoad("./pages/Settings");
const ContactPage = lazyLoad("./pages/Contact");
const Achievements = lazyLoad("./pages/Achievements");
const ReportBug = lazyLoad("./pages/ReportBug");
const RequestFeature = lazyLoad("./pages/RequestFeature");

const Algebra = lazyLoad("./topics/algebra/Algebra");
const Numbers = lazyLoad("./topics/numbers/Numbers");
const NumbersQuiz = lazyLoad("./topics/numbers/NumbersQuiz");
const Geometry = lazyLoad("./topics/geometry/Geometry");
const Probability = lazyLoad("./topics/probability/Probability");
const Data = lazyLoad("./topics/data/Data");
const Measurement = lazyLoad("./topics/measurement/Measurement");

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
