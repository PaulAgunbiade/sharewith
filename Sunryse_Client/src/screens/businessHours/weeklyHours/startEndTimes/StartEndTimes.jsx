import PropTypes from 'prop-types';
import Dropdown from '../../../../components/dropdown/Dropdown';
import { TIMES } from '../../businessHoursHelper';

import styles from './StartEndTimes.module.scss';

StartEndTimes.propTypes = {
  dayOfWeek: PropTypes.number.isRequired,
  blockIndex: PropTypes.number.isRequired,
  updateSchedule: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
  endValue: PropTypes.string.isRequired,
};

export default function StartEndTimes({
  dayOfWeek,
  blockIndex,
  updateSchedule,
  startValue,
  endValue,
}) {
  const timeOptions = TIMES.map((time) => ({ value: time, label: time }));

  const handleStartChange = (newTime) => {
    updateSchedule(dayOfWeek, blockIndex, 'start', newTime);
  };

  const handleEndChange = (newTime) => {
    updateSchedule(dayOfWeek, blockIndex, 'end', newTime);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdownLeft}>
        <Dropdown
          id={`${dayOfWeek}-${blockIndex}-start`}
          options={timeOptions}
          value={startValue}
          onChange={handleStartChange}
        />
      </div>
      -
      <div className={styles.dropdownRight}>
        <Dropdown
          id={`${dayOfWeek}-${blockIndex}-start`}
          className={styles.dropdownRight}
          options={timeOptions}
          value={endValue}
          onChange={handleEndChange}
        />
      </div>
    </div>
  );
}
