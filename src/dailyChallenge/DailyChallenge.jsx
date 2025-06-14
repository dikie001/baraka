import React from "react";
import BottomNav from "../components/MobileNav";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

const DailyChallenge = () => {
  const [initialTime, setInitialTime] = useLocalStorage("initial-time", "null");
  const [initialDay, setInitialDay] = useLocalStorage("initial-day", "null");
  const [firstDay, setFirstDay] = useLocalStorage("firstDay", "2");
  const [quizOpen, setQuizOpen] = useLocalStorage("quiz-state", null);
  const today = new Date();
  const fullDate = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
  const time = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;

  const Calculate = () => {
    setInitialTime(time);
    const day = today.getDate();
    setInitialDay(day +1);
  };

  useEffect(() => {
    Calculate();
  });

  useEffect(() => {
    if (initialDay > firstDay) {
      setFirstDay(initialDay);
      setQuizOpen(true)
    } else {
      console.log("Same days!");
    }
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      DailyChallenge
      <BottomNav />
      <h2>Date: {fullDate}</h2>
      <h2>Time: {initialTime}</h2>
      <p>Day: {initialDay}</p>
      {quizOpen && (
        <div className="w-sm bg-black/40 flex rounded-md p-3">
          <h3> The quiz is open</h3>
          <button onClick={()=>setQuizOpen(false)} className=" bg-green-500 p-2 active:ring-2">Finish</button>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
