import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import DailyChallenge from './dailyChallenge/DailyChallenge'
import AchievementsPage from './pages/Achievement'
import AuthPage from './pages/Auth'
import BarakaMathApp from './pages/HomePage'
import Profile from './pages/Profile'
import Practice from './practice/Practice'
import QuickPractice from './quickPractice/QuickPractice'
import Algebra from './topics/algebra/Algebra'
import Data from './topics/data/Data'
import Geometry from './topics/geometry/Geometry'
import Numbers from './topics/numbers/Numbers'
import NumbersQuiz from './topics/numbers/NumbersQuiz'
import { Measurement } from './topics/measurement/Measurement'
import { Probability } from './topics/probability/Probability'
import BarakaAI from './ai/BarakaAi'

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
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/algebra" element={<Algebra />} />
        <Route path="/probability" element={<Probability />} />
        <Route path="/geometry" element={<Geometry />} />
        <Route path="/numbers-quiz" element={<NumbersQuiz />} />
        <Route path="/data" element={<Data />} />
        <Route path="/measurement" element={<Measurement />} />
        <Route path="/baraka-ai" element={<BarakaAI />} />
      </Routes>
    </Router>
  );
}
export default App;