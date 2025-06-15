import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import ConfirmStudyMode from '../../components/ConfirmStudyMode'
import NumbersNotes from './NumbersNotes'
import NumbersQuiz from './NumbersQuiz'
import { useEffect } from 'react'

const Numbers = () => {
  const [page, setPage]=useLocalStorage("choose-page", "choosePage")
  useEffect(()=>{
    setPage("choosePage")
    console.log("page set!")
  },[])
  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 text-white p-3">
      {page === "choosePage" && <ConfirmStudyMode />}
      {page === "notes" && <NumbersNotes />}
      {page === "MCQs" && <NumbersQuiz />}
    </div>
  );
}

export default Numbers