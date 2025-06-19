import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import ConfirmStudyMode from "../../components/ConfirmStudyMode";
import MeasurementNotes from "./MeasurementNotes";
import MeasurementQuiz from "./MeasurementQuiz";
import { useEffect } from "react";

  const Measurement = () => {
  const [page, setPage] = useLocalStorage("choose-page", 'choosePage');
  useEffect(()=>{
    setPage("choosePage")
  },[])
  return (
    <div className=" text-white p-3">
      {/* Display the Study Mode Modal */}
      {page === "choosePage" && <ConfirmStudyMode />}

      {/* Display the Notes Page */}
      {page === "notes" && <MeasurementNotes />}

      {/* Display the Quiz page */}
      {page === "MCQs" && <MeasurementQuiz />}
    </div>
  );
};

export default Measurement;
