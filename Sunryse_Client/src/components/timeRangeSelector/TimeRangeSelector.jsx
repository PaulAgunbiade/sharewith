import PropTypes from 'prop-types';
import Dropdown from '../dropdown/Dropdown';
import { TIMES } from './timeRangeSelectorHelper';

import styles from './TimeRangeSelector.module.scss';

TimeRangeSelector.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  displayError: PropTypes.bool,
  error: PropTypes.string,
  setError: PropTypes.func,
};

export default function TimeRangeSelector({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  displayError = false,
  error,
  setError = () => {},
}) {
  const timeOptions = TIMES.map((time) => ({ value: time, label: time }));

  const handleStartChange = (newStartTime) => {
    newStartTime > endTime ? setError('Invalid time range') : setError('');
    setStartTime(newStartTime);
  };

  const handleEndChange = (newEndTime) => {
    newEndTime < startTime ? setError('Invalid time range') : setError('');
    setEndTime(newEndTime);
  };

  return (
    <div className={styles.container}>
      {displayError && error && 'Invalid time range'}
      <div className={styles.inputsContainer}>
        <div className={styles.dropdownLeft}>
          <Dropdown
            id="start_time"
            options={timeOptions}
            value={startTime}
            onChange={handleStartChange}
            placeholder="09:00"
          />
        </div>
        -
        <div className={styles.dropdownRight}>
          <Dropdown
            id="end_time"
            options={timeOptions}
            value={endTime}
            onChange={handleEndChange}
            placeholder="17:00"
          />
        </div>
      </div>
    </div>
  );
}
