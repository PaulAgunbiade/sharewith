import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";

import StartEndTimes from "./startEndTimes/StartEndTimes";
import {DAYS_OF_WEEK} from "../businessHoursHelper";

import styles from "./WeeklyHours.module.scss";

WeeklyHours.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      on: PropTypes.bool,
      times: PropTypes.arrayOf(
        PropTypes.shape({
          start: PropTypes.string,
          end: PropTypes.string,
          error: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
  setSchedule: PropTypes.func.isRequired,
};

export default function WeeklyHours({schedule, setSchedule}) {
  const updateScheduleTimes = (dayOfWeek, blockIndex, startOrEnd, time) => {
    const newSchedule = [...schedule];
    newSchedule[dayOfWeek].times[blockIndex][startOrEnd] = time;
    const times = newSchedule[dayOfWeek].times;
    setOverlapErrors(times);
    setSchedule(newSchedule);
  };

  const setOverlapErrors = (times) => {
    let prevBlock = null;
    times.forEach((block) => {
      if (block.start <= prevBlock?.end) {
        block.error = true;
      } else if (block.start >= block.end) {
        block.error = true;
      } else {
        block.error = false;
      }
      prevBlock = block;
    });
  };

  const updateDayOnOff = (dayOfWeek, onValue) => {
    const newSchedule = [...schedule];
    newSchedule[dayOfWeek].on = onValue;
    setSchedule(newSchedule);
  };

  const addTimeBlock = (dayIndex) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].times.push({start: "00:00", end: "00:00"});
    setSchedule(newSchedule);
  };

  const removeTimeBlock = (dayIndex, blockIndex) => {
    const newSchedule = [...schedule];
    if (newSchedule[dayIndex].times.length <= 1) {
      newSchedule[dayIndex].on = false;
    } else {
      newSchedule[dayIndex].times.splice(blockIndex, 1);
    }
    setSchedule(newSchedule);
  };

  const TimeSection = ({dayIndex}) =>
    schedule[dayIndex].on ? (
      schedule[dayIndex].times.map((block, blockIndex) => (
        <div
          className={styles.timeSection}
          key={`Day ${dayIndex} ${blockIndex} block`}
        >
          <div className={styles.startEndContainer}>
            {block.error && <p className={styles.errorText}>Times overlap</p>}

            <StartEndTimes
              dayOfWeek={dayIndex}
              blockIndex={blockIndex}
              updateSchedule={updateScheduleTimes}
              startValue={block.start}
              endValue={block.end}
            />
          </div>
          <DeleteIcon
            className={styles.icon}
            onClick={() => removeTimeBlock(dayIndex, blockIndex)}
          />
        </div>
      ))
    ) : (
      <p className={styles.unavailableText}>Unavailable</p>
    );

  const Day = ({dayIndex, dayLabel}) => (
    <>
      <div className={styles.day}>
        <div className={styles.labelSection}>
          <CustomCheckbox
            checked={schedule[dayIndex].on}
            onChange={(event) => updateDayOnOff(dayIndex, event.target.checked)}
          />
          <p className={styles.dayOfWeekText}>{dayLabel}</p>
        </div>
        <div className={styles.sectionContainer}>
          <TimeSection dayIndex={dayIndex} />
        </div>
        <AddIcon
          className={styles.icon}
          onClick={() => schedule[dayIndex].on && addTimeBlock(dayIndex)}
        />
      </div>
      {dayIndex !== 6 && <hr className={styles.line} />}
    </>
  );

  return (
    <div className={styles.container}>
      {DAYS_OF_WEEK.map((day, i) => (
        <Day key={day} dayIndex={i} dayLabel={day} />
      ))}
    </div>
  );
}
