import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { useEffect } from "react";
import ConfirmStudyMode from "../../components/ConfirmStudyMode";
import DataNotes from "./DataNotes"
import DataQuiz from "./DataQuiz";

const Data = () => {
  const [page, setPage] = useLocalStorage("choose-page", "choosePage");
  useEffect(() => {
    setPage("choosePage");
  }, []);
  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 text-white p-3">
      {/* Display the Study Mode Modal */}
      {page === "choosePage" && <ConfirmStudyMode />}

      {/* Display the Notes Page */}
      {page === "notes" && <DataNotes />}

      {/* Display the Quiz page */}
      {page === "MCQs" && <DataQuiz />}
    </div>
  );
};

export default Data;
