import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import CalendarDateRow from "../calendarDateRow/CalendarDateRow";
import CalendarBody from "../calendarBody/CalendarBody";
import CalendarHeader from "../calendarHeader/CalendarHeader";
import AvailabilityModal from "./availabilityModal/AvailabilityModal";

import {
  getCurrWeekDates,
  getNextWeekDates,
  getPrevWeekDates,
  getWeekData,
} from "../customCalendarHelper";

import styles from "./AvailabilityCalendar.module.scss";

AvailabilityCalendar.propTypes = {
  availability: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startTime: PropTypes.instanceOf(Date).isRequired,
      endTime: PropTypes.instanceOf(Date).isRequired,
      repeat: PropTypes.shape({
        weekFreq: PropTypes.number.isRequired,
        daysOfWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
        endDate: PropTypes.instanceOf(Date),
      }),
      services: PropTypes.arrayOf(PropTypes.string).isRequired,
      locations: PropTypes.arrayOf(PropTypes.string).isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
  clinicData: PropTypes.shape({
    services: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string,
      })
    ).isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  editAvailability: PropTypes.func.isRequired,
};

export default function AvailabilityCalendar({
  availability,
  clinicData,
  editAvailability,
}) {
  const [currWeekDates, setCurrWeekDates] = useState(getCurrWeekDates());
  const [currWeekData, setCurrWeekData] = useState([]);
  const [openAddAvailability, setOpenAddAvailability] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = getWeekData(currWeekDates, availability);
      setCurrWeekData(data);
    };
    fetchData();
  }, [currWeekDates, availability]);

  const nextWeekClick = () => {
    const dates = getNextWeekDates(currWeekDates);
    setCurrWeekDates(dates);
  };

  const prevWeekClick = () => {
    const dates = getPrevWeekDates(currWeekDates);
    setCurrWeekDates(dates);
  };

  const openNewEventModal = () => {
    setOpenAddAvailability(true);
  };

  return (
    <div className={styles.calendarContainer}>
      <CalendarHeader
        currWeekDates={currWeekDates}
        onForwardClick={nextWeekClick}
        onBackClick={prevWeekClick}
        openNewEventModal={openNewEventModal}
        newEventButton={true}
        newEventButtonText={"Add Availability"}
      />
      {currWeekData.length > 0 && (
        <div className={styles.dateBodyContainer}>
          <CalendarDateRow currWeekDates={currWeekDates} />
          <CalendarBody currWeekData={currWeekData} />
        </div>
      )}
      {openAddAvailability && (
        <AvailabilityModal
          clinicData={clinicData}
          closeModal={() => setOpenAddAvailability(false)}
        />
      )}
    </div>
  );
}
