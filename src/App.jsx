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
      </Routes>
    </Router>
  );
}
