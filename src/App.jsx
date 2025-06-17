import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import DailyChallenge from './dailyChallenge/DailyChallenge'
import AuthPage from './pages/Auth'
import BarakaMathApp from './pages/HomePage'
import Profile from './pages/Profile'
import QuickPractice from './quickPractice/QuickPractice'
import Algebra from './topics/algebra/Algebra'
import Data from './topics/data/Data'
import Geometry from './topics/geometry/Geometry'
import Numbers from './topics/numbers/Numbers'
import NumbersQuiz from './topics/numbers/NumbersQuiz'
import { Measurement } from './topics/measurement/Measurement'
import { Probability } from './topics/probability/Probability'
import BarakaAI from './ai/BarakaAi'
import ExamsPage from './exams/ExamsPage'
import Quizes from './pages/Quizes'
import ReportBug from './pages/ReportBug'
import Settings from './pages/Settings'
import RequestFeature from './pages/RequestFeature'
import HelpSupport from './pages/HelpSupport'
import Achievements from './pages/Achievements'

const App = () => {
  
  const [page,setPage]=useLocalStorage("choose-page","choosePage")
  useEffect(()=>{
        setPage("choosePage")
  },[])
  return (
    <Router>
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
        <Route path="/help-support" element={<HelpSupport />} />
      </Routes>
    </Router>
  );
}
export default App;