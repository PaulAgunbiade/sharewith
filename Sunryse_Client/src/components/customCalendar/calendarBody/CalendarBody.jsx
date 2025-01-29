import PropTypes from "prop-types";
import {calendarHoursArray} from "../customCalendarHelper";

import DayColumns from "./dayColumns/DayColumns";

import styles from "./CalendarBody.module.scss";

CalendarBody.propTypes = {
  currWeekData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          startTime: PropTypes.instanceOf(Date).isRequired,
          endTime: PropTypes.instanceOf(Date).isRequired,
          subtitle: PropTypes.string.isRequired,
          classNames: PropTypes.object,
        })
      ),
    })
  ).isRequired,
};

export default function CalendarBody({currWeekData}) {
  const TimeColumn = () => (
    <div className={styles.timeColumnContainer}>
      {calendarHoursArray.map((hourString) => (
        <div key={hourString} className={styles.timeContainer}>
          <p className={styles.time}>{hourString}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.bodyContainer}>
      <TimeColumn />
      <DayColumns currWeekData={currWeekData} />
    </div>
  );
}
