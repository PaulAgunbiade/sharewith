import PropTypes from 'prop-types';

import { calendarHoursArray } from '../../customCalendarHelper';

import CalendarEvent from '../calendarEvent/CalendarEvent';

import styles from './DayColumns.module.scss';

DayColumns.propTypes = {
  currWeekData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      events: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          startTime: PropTypes.instanceOf(Date).isRequired,
          endTime: PropTypes.instanceOf(Date).isRequired,
          subtitle: PropTypes.string,
          classNames: PropTypes.object,
        }),
      ),
    }),
  ),
};

export default function DayColumns({ currWeekData }) {
  const Column = ({ dayData, dayIndex }) => (
    <div className={styles.columnContainer}>
      <EmptySlots dayIndex={dayIndex} />
      <DailyEvents dayData={dayData} />
    </div>
  );

  const EmptySlots = ({ dayIndex }) =>
    calendarHoursArray.map((hourString) => (
      <div
        key={hourString}
        className={`${styles.hourBlock} ${
          dayIndex === 0 ? styles.firstColumnHourBlock : ''
        }`}
      />
    ));

  const DailyEvents = ({ dayData }) =>
    dayData.events.map((event) => (
      <CalendarEvent key={event.startTime} eventData={event} />
    ));

  return (
    <div className={styles.dayColumnsContainer}>
      {currWeekData.map((dayData, index) => (
        <Column key={dayData.date} dayData={dayData} dayIndex={index} />
      ))}
    </div>
  );
}
