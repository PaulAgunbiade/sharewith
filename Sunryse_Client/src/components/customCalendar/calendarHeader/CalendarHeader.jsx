import PropTypes from 'prop-types';
import { useState } from 'react';
import BackArrow from '@mui/icons-material/ArrowBackIosNew';
import ForwardArrow from '@mui/icons-material/ArrowForwardIos';
import { getWeekRangeText, getCurrYearText } from './calendarHeaderHelper';

import styles from './CalendarHeader.module.scss';
import MultiButton from '../../multiButton/MultiButton';
import StyledButton from '../../styledButton/StyledButton';

CalendarHeader.propTypes = {
  currWeekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onForwardClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  openNewEventModal: PropTypes.func,
  newEventButton: PropTypes.bool,
  newEventButtonText: PropTypes.string,
};

export default function CalendarHeader({
  currWeekDates,
  onForwardClick,
  onBackClick,
  openNewEventModal = () => {},
  newEventButton = false,
  newEventButtonText = 'Create Event',
}) {
  // const [selectedView, setSelectedView] = useState('week');
  // const buttons = [
  //   {
  //     text: 'Month',
  //     onClick: (button) => {
  //       setSelectedView('month');
  //     },
  //     baseClassname: styles.viewButton,
  //     selectedClassname: styles.selectedViewButton,
  //   },
  //   {
  //     text: 'Week',
  //     onClick: (button) => {
  //       setSelectedView('week');
  //     },
  //     baseClassname: styles.viewButton,
  //     selectedClassname: styles.selectedViewButton,
  //   },
  // ];

  const weekRangeText = getWeekRangeText(currWeekDates);
  const currYearText = getCurrYearText();

  const WeekRange = () => (
    <div className={styles.weekRangeContainer}>
      <div className={styles.iconContainer} onClick={() => onBackClick()}>
        <BackArrow className={styles.icon} fontSize="small" />
      </div>
      <p className={styles.weekRangeText}>
        {weekRangeText} {currYearText}
      </p>
      <div className={styles.iconContainer} onClick={() => onForwardClick()}>
        <ForwardArrow className={styles.icon} fontSize="small" />
      </div>
    </div>
  );

  const CreatEventButton = () => (
    <StyledButton
      text={newEventButtonText}
      onClick={() => openNewEventModal()}
    />
  );
  return (
    <div className={styles.headerContainer}>
      <WeekRange />
      {newEventButton && <CreatEventButton />}
      {/* <MultiButton buttons={buttons} initial={buttons[0]} /> */}
    </div>
  );
}
