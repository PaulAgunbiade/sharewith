import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
  getCurrWeekDates,
  getNextWeekDates,
  getPrevWeekDates,
  getWeekData,
} from "./customCalendarHelper";

import CalendarHeader from "./calendarHeader/CalendarHeader";

import styles from "./CustomCalendar.module.scss";
import CalendarDateRow from "./calendarDateRow/CalendarDateRow";
import CalendarBody from "./calendarBody/CalendarBody";

CustomCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      startTime: PropTypes.instanceOf(Date).isRequired,
      endTime: PropTypes.instanceOf(Date).isRequired,
      repeat: PropTypes.shape({
        weekFreq: PropTypes.number.isRequired,
        daysOfWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
        endDate: PropTypes.instanceOf(Date),
      }),
      subtitle: PropTypes.string,
      className: PropTypes.string,
    })
  ).isRequired,
};

export default function CustomCalendar({events}) {
  const [currWeekDates, setCurrWeekDates] = useState(getCurrWeekDates());
  const [currWeekData, setCurrWeekData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = getWeekData(currWeekDates, events);
      setCurrWeekData(data);
    };
    fetchData();
  }, [currWeekDates, events]);

  const nextWeekClick = () => {
    const dates = getNextWeekDates(currWeekDates);
    setCurrWeekDates(dates);
  };

  const prevWeekClick = () => {
    const dates = getPrevWeekDates(currWeekDates);
    setCurrWeekDates(dates);
  };

  return (
    <div className={styles.calendarContainer}>
      <CalendarHeader
        currWeekDates={currWeekDates}
        onForwardClick={nextWeekClick}
        onBackClick={prevWeekClick}
      />
      {currWeekData.length > 0 && (
        <div className={styles.dateBodyContainer}>
          <CalendarDateRow currWeekDates={currWeekDates} />
          <CalendarBody currWeekData={currWeekData} />
        </div>
      )}
    </div>
  );
}
