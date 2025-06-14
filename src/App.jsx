import React from 'react'
import BarakaMathApp from './pages/HomePage'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import AuthPage from './pages/Auth'
import Numbers from './topics/numbers/Numbers'
import DailyChallenge from './dailyChallenge/DailyChallenge'
import QuickPractice from './quickPractice/QuickPractice'
import Practice from './practice/Practice'
import Profile from './pages/Profile'
import AchievementsPage from './pages/Achievement'
import Algebra from './topics/algebra/Algebra'
import Data from './topics/data/Data'
import Measurement from './topics/measurement/Measurement'
import Probability from './topics/probability/Probability'
import Geometry from './topics/geometry/Geometry'

export const App = () => {
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
        <Route path="/measurement" element={<Measurement />} />
        <Route path="/probability" element={<Probability />} />
        <Route path="/geometry" element={<Geometry />} />
        <Route path="/data-handling" element={<Data />} />

        <Route path="/data" element={<Data />} />
      </Routes>
    </Router>
  );
}
