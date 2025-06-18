import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import BarakaAI from './ai/BarakaAi'
import InstallPrompt from './components/InstallPrompt'
import DailyChallenge from './dailyChallenge/DailyChallenge'
import ExamsPage from './exams/ExamsPage'
import Achievements from './pages/Achievements'
import AuthPage from './pages/Auth'
import ContactPage from './pages/Contact'
import BarakaMathApp from './pages/HomePage'
import Profile from './pages/Profile'
import Quizes from './pages/Quizes'
import ReportBug from './pages/ReportBug'
import RequestFeature from './pages/RequestFeature'
import Settings from './pages/Settings'
import QuickPractice from './quickPractice/QuickPractice'
import Algebra from './topics/algebra/Algebra'
import Data from './topics/data/Data'
import Geometry from './topics/geometry/Geometry'
import { Measurement } from './topics/measurement/Measurement'
import Numbers from './topics/numbers/Numbers'
import NumbersQuiz from './topics/numbers/NumbersQuiz'
import { Probability } from './topics/probability/Probability'

const App = () => {
  
  const [page,setPage]=useLocalStorage("choose-page","choosePage")
  useEffect(()=>{
        setPage("choosePage")
  },[])
  return (
    <Router>
      <Toaster/>
      <InstallPrompt/>
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
    </Router>
  );
}
export default App;