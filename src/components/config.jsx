export function getCurrentDateTime() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentDay = daysOfWeek[currentDayIndex];
  
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = monthsOfYear[currentMonthIndex];
  
    const currentHour = currentDate.getHours();
    const amOrPm = currentHour >= 12 ? 'PM' : 'AM';
    const currentHour12Format = currentHour % 12 === 0 ? 12 : currentHour % 12;
    const currentMinute = String(currentDate.getMinutes()).padStart(2, '0');
    const currentTime = `${currentHour12Format}:${currentMinute} ${amOrPm}`;
  
    const currentDateNum = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
  
    return {
      day: currentDay,
      time: currentTime,
      date: currentDateNum,
      month: currentMonth,
      year: currentYear
    };
}
  

export const getDayNameFromDate = (date) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = new Date(date).getDay();
  return weekdays[dayIndex];
};

  
export const { day, time, date, month, year } = getCurrentDateTime();

export const apikey = "566453ba75ffddff59027dd34360d9fa";