import React from "react";

const CalculateDate = () => {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;
  const monthNumber = Number(`${today.getMonth() +1}`);
  const day = Number(`${today.getDate()}`)
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
      month = "Dec"
    default:
        month="B.B";
  }

  return (
    <div className="absolute bg-black/30 rounded-md p-1 top-1 right-3  text-medium  font-semibold">
      <p>
        {month} {day} {time} 
      </p>
    </div>
  );
};

export default CalculateDate;
