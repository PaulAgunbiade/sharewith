import PropTypes from 'prop-types';
import { daysOfTheWeek } from '../customCalendarHelper';

import styles from './CalendarDateRow.module.scss';

CalendarDateRow.propTypes = {
  currWeekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default function CalendarDateRow({ currWeekDates }) {
  const DateContainers = () =>
    currWeekDates.map((date, i) => {
      let additionalStyling = '';
      if (i === 0) {
        additionalStyling = styles.firstDateContainer;
      } else if (i === currWeekDates.length - 1) {
        additionalStyling = styles.lastDateContainer;
      }

      return (
        <div
          key={date}
          className={`${styles.dateContainer} ${additionalStyling}`}
        >
          <p className={styles.dateText}>{daysOfTheWeek[i]}</p>
          <p className={styles.dateText}>{date.getDate()}</p>
        </div>
      );
    });

  return (
    <div className={styles.dateRowContainer}>
      <div className={styles.spacer} />
      <DateContainers />
    </div>
  );
}
