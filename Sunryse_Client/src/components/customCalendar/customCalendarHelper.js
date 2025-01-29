export function getCurrWeekDates(dateObj = new Date()) {
  const week = [];

  let sunday = new Date(dateObj);
  if (sunday.getDay() !== 0) {
    sunday.setDate(dateObj.getDate() - dateObj.getDay());
  }
  week.push(new Date(sunday));
  for (let i = 1; i < 7; i++) {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);
    week.push(new Date(day));
  }
  return week;
}

export function getWeekData(currWeekDates, eventData) {
  let weekData = [];
  currWeekDates.forEach((date) => {
    const events = eventData.filter(
      (event) => date.getDate() === event.startTime.getDate(),
    );
    const day = {
      date,
      events,
    };
    weekData.push(day);
  });
  return weekData;
}

export function getNextWeekDates(currWeekDates) {
  const firstDayOfCurrWeek = currWeekDates[0];
  let nextSunday = new Date(firstDayOfCurrWeek);
  nextSunday.setDate(
    firstDayOfCurrWeek.getDate() - firstDayOfCurrWeek.getDay() + 7,
  );
  return getCurrWeekDates(nextSunday);
}

export function getPrevWeekDates(currWeekDates) {
  const firstDayOfCurrWeek = currWeekDates[0];
  let prevSunday = new Date(firstDayOfCurrWeek);
  prevSunday.setDate(
    firstDayOfCurrWeek.getDate() - firstDayOfCurrWeek.getDay() - 7,
  );
  return getCurrWeekDates(prevSunday);
}

export const daysOfTheWeek = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

export const calendarHoursArray = [
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
];
export const calendarHoursPerDay = calendarHoursArray.length;

// export function getDatesInMonth(month, year) {
//   const date = new Date(year, month, 1);
//   const dates = [];
//   while (date.getMonth() === month) {
//     dates.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return dates;
// }

// export function getDatesInYear(year) {
//   let yearDates = [];
//   for (let i = 0; i <= 11; i++) {
//     const monthDates = getDatesInMonth(i, year);
//     yearDates.push(monthDates);
//   }
//   return yearDates;
// }
