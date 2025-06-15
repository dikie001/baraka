import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import ConfirmStudyMode from "../../components/ConfirmStudyMode";
import GeometryNotes from "./GeometryNotes";
import GeometryQuiz from "./GeometryQuiz";

const Geometry = () => {
  const [page, setPage] = useLocalStorage("choose-page", "choosePage");
  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 text-white p-3">
      {/* Display the Study Mode Modal */}
      {page === "choosePage" && <ConfirmStudyMode />}

      {/* Display the Notes Page */}
      {page === "notes" && <GeometryNotes />}

      {/* Display the Quiz page */}
      {page === "MCQs" && <GeometryQuiz />}
    </div>
  );
};

export default Geometry;
