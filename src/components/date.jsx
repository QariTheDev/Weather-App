import React, { useState, useEffect } from "react";
import { day, time, date, month, year } from "./config";

export default function DateComponent() {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    
    const updateTime = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const amOrPm = currentHour >= 12 ? 'PM' : 'AM';
      const currentHour12Format = currentHour % 12 === 0 ? 12 : currentHour % 12;
      const currentMinute = String(currentDate.getMinutes()).padStart(2, '0');
      const newTime = `${currentHour12Format}:${currentMinute} ${amOrPm}`;

      setCurrentTime(newTime); 
    };

    // Call the updateTime function immediately to set the initial time
    updateTime();

    // Set up the interval to update the time every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      updateTime();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="datebox">
        <p>{month} {date}, {year}</p>
        <h1>{day} {currentTime}</h1>
      </div>
    </>
  );
}
