import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { useEffect } from 'react'
import ConfirmStudyMode from '../../components/ConfirmStudyMode'
import AlgebraNotes from './AlgebraNotes'
import AlgebraQuiz from './AlgebraQuiz'

const Algebra = () => {
    const [page, setPage]=useLocalStorage("choose-page", 'choosePage')
    useEffect(()=>{
        setPage("choosePage")
    },[])
  return (
    <div className=" text-white p-3">
      {/* Display the Study Mode Modal */}
      {page === "choosePage" && <ConfirmStudyMode />}

      {/* Display the Notes Page */}
      {page === "notes" && <AlgebraNotes />}

      {/* Display the Quiz page */}
      {page === "MCQs" && <AlgebraQuiz />}
    </div>
  );
}

export default Algebra