import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const CalculateDate = () => {
  const [time, setTime] = useState("");

  setInterval(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    setTime(currentTime);
  }, 1000);

  const monthNumber = (new Date().getMonth()+1);
  const monthDay = (new Date().getDate())

  let month;
  // Allocating months
  switch (monthNumber) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
    default:
      month = "B.B";
  }

  return (
    <div className="flex  justify-between">
      <div className="absolute  bg-gradient-to-r from-purple-700  to-pink-500 rounded-md p-1 px-3 top-1.5 right-3  text-medium  font-semibold">
        <p>{time}</p>
      </div>
      <div className="absolute left-4  bg-gradient-to-r from-purple-700  to-pink-500 rounded-md p-1 px-3 top-1.5  text-medium  font-semibold">
        <p>{month} {monthDay}</p>
      </div>
    </div>
  );
};

export default CalculateDate;
