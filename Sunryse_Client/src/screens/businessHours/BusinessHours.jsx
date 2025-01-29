import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import LoadingHOC from '../../components/loading/LoadingHOC';
import WeeklyHours from './weeklyHours/WeeklyHours';
import Dropdown from '../../components/dropdown/Dropdown';
import StyledButton from '../../components/styledButton/StyledButton';
import MeetingImage from '../../assets/MeetingImage.jpeg';

import {
  saveBusinessHours,
  getBusinessHours,
  TIME_ZONES,
  DEFAULT_SCHEDULE,
  DEFAULT_TIME_ZONE,
} from './businessHoursHelper';
import useToast from '../../hooks/useToast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import styles from './BusinessHours.module.scss';
import Placeholder from '../../components/placeholder/Placeholder';

BusinessHours.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

function BusinessHours({ setLoading }) {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [timeZone, setTimeZone] = useState(DEFAULT_TIME_ZONE);

  const axios = useAxiosPrivate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getBusinessHours(axios, toast);
      if (data.schedule.length > 0) setSchedule(data.schedule);
      setTimeZone(data.timeZone);
      setLoading(false);
    };

    fetchData();
  }, []);

  async function save() {
    await saveBusinessHours(axios, toast, timeZone, schedule);
  }

  const timeZoneOptions = TIME_ZONES.map((timeZone) => ({
    value: timeZone,
    label: timeZone,
  }));

  const checkForErrors = () => {
    let errorFound = false;
    schedule.forEach((day) => {
      day.times.forEach((timeBlock) => {
        if (timeBlock.error === true) {
          errorFound = true;
          return;
        }
      });
    });
    return errorFound;
  };

  const TimeZonePicker = () => (
    <Dropdown
      id="time_zone_picker"
      className={styles.dropdown}
      options={timeZoneOptions}
      value={timeZone}
      onChange={setTimeZone}
      indicator={true}
    />
  );

  return (
    // <div id="BusinessHours" className={styles.screen}>
    //   <div className={styles.timeZoneContainer}>
    //     <p className={styles.timeZoneHeader}>Time Zone</p>
    //     <TimeZonePicker />
    //   </div>
    //   <div className={styles.businessHoursContainer}>
    //     <p className={styles.businessHoursHeader}>Business Hours</p>
    //     <WeeklyHours schedule={schedule} setSchedule={setSchedule} />
    //   </div>
    //   <StyledButton
    //     baseClassname={styles.button}
    //     text="Save Business Hours"
    //     onClick={() => save()}
    //     disabled={checkForErrors() ? true : false}
    //   />
    // </div>
    <div id="BusinessHours" className={styles.screen}>
      <Placeholder
        image={MeetingImage}
        title="Welcome to your client directory"
        text="You have no clients registered at the moment."
        button={true}
        buttonText="Add a new client"
        // onClick={() => stripeAccountLinkRedirect()}
      />
    </div>
  );
}

export default LoadingHOC(BusinessHours, 'BusinessHours', false);
