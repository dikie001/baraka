import { useLocalStorage } from "@uidotdev/usehooks";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const BarakaAI = lazy(() => import("./ai/BarakaAi"));
const InstallPrompt = lazy(() => import("./components/InstallPrompt"));
const DailyChallenge = lazy(() => import("./dailyChallenge/DailyChallenge"));
const ExamsPage = lazy(() => import("./exams/ExamsPage"));
const Achievements = lazy(() => import("./pages/Achievements"));
const AuthPage = lazy(() => import("./pages/Auth"));
const ContactPage = lazy(() => import("./pages/Contact"));
const BarakaMathApp = lazy(() => import("./pages/HomePage"));
const Profile = lazy(() => import("./pages/Profile"));
const Quizes = lazy(() => import("./pages/Quizes"));
const ReportBug = lazy(() => import("./pages/ReportBug"));
const RequestFeature = lazy(() => import("./pages/RequestFeature"));
const Settings = lazy(() => import("./pages/Settings"));
const QuickPractice = lazy(() => import("./quickPractice/QuickPractice"));
const Algebra = lazy(() => import("./topics/algebra/Algebra"));
const Data = lazy(() => import("./topics/data/Data"));
const Geometry = lazy(() => import("./topics/geometry/Geometry"));
const Measurement = lazy(() => import("./topics/measurement/Measurement"));
const Numbers = lazy(() => import("./topics/numbers/Numbers"));
const NumbersQuiz = lazy(() => import("./topics/numbers/NumbersQuiz"));
const Probability = lazy(() => import("./topics/probability/Probability"));
const App = () => {
  const [page, setPage] = useLocalStorage("choose-page", "choosePage");
  useEffect(() => {
    setPage("choosePage");
  }, []);
  return (
    <div className="scroll-smooth min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900">
      <Router>
        <Toaster />
        <InstallPrompt />
        <Suspense
          fallback={
            <div className="text-lg animate-spin flex justify-center items-center">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<BarakaMathApp />} />
            <Route path="/auth-page" element={<AuthPage />} />
            <Route path="/numbers" element={<Numbers />} />
            <Route path="/daily-challenge" element={<DailyChallenge />} />
            <Route path="/quick-practice" element={<QuickPractice />} />
            <Route path="/exams-page" element={<ExamsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/algebra" element={<Algebra />} />
            <Route path="/probability" element={<Probability />} />
            <Route path="/geometry" element={<Geometry />} />
            <Route path="/numbers-quiz" element={<NumbersQuiz />} />
            <Route path="/data" element={<Data />} />
            <Route path="/measurement" element={<Measurement />} />
            <Route path="/baraka-ai" element={<BarakaAI />} />
            <Route path="/quizes" element={<Quizes />} />
            <Route path="/report-bug" element={<ReportBug />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/request-feature" element={<RequestFeature />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};
export default App;
