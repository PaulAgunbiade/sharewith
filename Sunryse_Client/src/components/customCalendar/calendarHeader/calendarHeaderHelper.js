export function getWeekRangeText(currWeekDates) {
  const startOfWeek = currWeekDates[0];
  const endOfWeek = currWeekDates[6];

  const options = { month: 'short', day: 'numeric' };
  const startOfWeekText = startOfWeek.toLocaleDateString('en-US', options);
  const endOfWeekText = endOfWeek.toLocaleDateString('en-US', options);

  const weekRangeText = `${startOfWeekText} - ${endOfWeekText}`;
  return weekRangeText;
}

export function getCurrYearText() {
  const today = new Date();
  const year = today.getFullYear();
  return year;
}
